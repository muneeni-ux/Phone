const express = require("express");
const axios = require("axios");
const router = express.Router();
const Transaction = require("../models/Transaction");

const {
  DARAJA_CONSUMER_KEY,
  DARAJA_CONSUMER_SECRET,
  DARAJA_SHORTCODE,
  DARAJA_PASSKEY,
  DARAJA_CALLBACK_URL,
} = process.env;

// Step 1: Get access token
async function getAccessToken() {
  const auth = Buffer.from(`${DARAJA_CONSUMER_KEY}:${DARAJA_CONSUMER_SECRET}`).toString("base64");
  const res = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  return res.data.access_token;
}

// Step 2: STK Push
router.post("/pay", async (req, res) => {
  const { phone, amount, cartItems } = req.body;

  const timestamp = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

  const password = Buffer.from(
    `${DARAJA_SHORTCODE}${DARAJA_PASSKEY}${timestamp}`
  ).toString("base64");

  try {
    const access_token = await getAccessToken();

    const stkRes = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: DARAJA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: DARAJA_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: DARAJA_CALLBACK_URL,
        AccountReference: "Beadwork Checkout",
        TransactionDesc: "Payment for beadwork items",
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const newTransaction = new Transaction({
      phone,
      amount,
      cartItems,
      checkoutRequestID: stkRes.data.CheckoutRequestID,
    });
    await newTransaction.save();

    res.status(200).json({
      message: "STK Push sent",
      checkoutRequestID: stkRes.data.CheckoutRequestID,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Failed to initiate payment" });
  }
});
// Step 3: Callback from Safaricom
router.post("/callback", async (req, res) => {
  console.log("Callback received:", JSON.stringify(req.body, null, 2));
  const callbackData = req.body;

  try {
    const { CheckoutRequestID } = callbackData.Body.stkCallback;
    const resultCode = callbackData.Body.stkCallback.ResultCode;
    const resultDesc = callbackData.Body.stkCallback.ResultDesc;
    const mpesaReceiptNumber = callbackData.Body.stkCallback.CallbackMetadata?.Item?.find(i => i.Name === "MpesaReceiptNumber")?.Value || null;

    let status = "Pending";
    if (resultCode === 0) {
      status = "Success";
    } else {
      status = "Failed";
    }

    await Transaction.findOneAndUpdate(
      { checkoutRequestID: CheckoutRequestID },
      {
        status,
        mpesaReceiptNumber,
        resultDesc,
        updatedAt: new Date(),
      }
    );

    res.status(200).json({ message: "Callback received and transaction updated" });
  } catch (err) {
    console.error("Callback error:", err);
    res.status(500).json({ error: "Failed to handle callback" });
  }
});


// GET: All transactions (admin)
router.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/transactions/:checkoutRequestID", async (req, res) => {
  const txn = await Transaction.findOne({ checkoutRequestID: req.params.checkoutRequestID });
  if (!txn) return res.status(404).json({ message: "Transaction not found" });
  res.json(txn);
});

module.exports = router;
