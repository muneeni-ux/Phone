import React, { useState, useCallback } from "react";
import {
  CheckCircle,
  CreditCard,
  Smartphone,
  DollarSign,
  MapPin,
  X,
  Loader2,
  Info,
} from "lucide-react";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// Payment Options
const paymentOptions = [
  {
    id: "mobile_money",
    name: "M-Pesa / Mobile Money",
    icon: <Smartphone size={20} />,
    details: "Instant payment via local mobile platforms.",
  },
  {
    id: "credit_card",
    name: "Credit / Debit Card",
    icon: <CreditCard size={20} />,
    details: "Coming soon.",
  },
  {
    id: "cash_on_delivery",
    name: "Cash on Delivery (Local)",
    icon: <DollarSign size={20} />,
    details: "Coming soon.",
  },
];

const CheckoutModal = ({ grandTotal, closeModal, cartItems }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    phone: "",
    street: "",
    city: "Nairobi",
    country: "Kenya",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutRequestID, setCheckoutRequestID] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [receiptData, setReceiptData] = useState(null);

  // Modal-level info message
  const [infoMessage, setInfoMessage] = useState(null);
  const [infoType, setInfoType] = useState("info"); // success, error, info

  const showInfo = (msg, type = "info", duration = 3000) => {
    setInfoMessage(msg);
    setInfoType(type);
    setTimeout(() => setInfoMessage(null), duration);
  };

  // Validate Kenyan phone number
  const validatePhone = (phone) => /^(\+254|0)?(7|1)\d{8}$/.test(phone);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const errors = {};
    if (!shippingDetails.name.trim()) errors.name = "Full name is required.";
    if (!shippingDetails.phone.trim())
      errors.phone = "Phone number is required.";
    else if (!validatePhone(shippingDetails.phone))
      errors.phone = "Invalid Kenyan phone number.";
    if (!shippingDetails.street.trim())
      errors.street = "Street/Area is required.";
    if (!selectedPayment) errors.payment = "Please select a payment method.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const formatPrice = (price) => `Ksh ${price.toLocaleString()}`;

  // ---------------- M-PESA Polling ----------------
  const pollTransaction = useCallback(async (id) => {
    const startTime = Date.now(); // record when polling started
    const maxDuration = 60 * 1000; // 1 minute in milliseconds

    const poll = async () => {
      if (Date.now() - startTime > maxDuration) {
        setIsProcessing(false);
        showInfo("Transaction timed out. Please try again.", "error");
        return;
      }

      try {
        const { data } = await axios.get(
          `${SERVER_URL}/api/mpesa/transactions/${id}`
        );
        if (data.status !== "Pending") {
          setTransactionStatus(data.status);
          setReceiptData(data);
          setIsProcessing(false);
        } else {
          setTimeout(poll, 3000); // poll every 3 seconds
        }
      } catch (err) {
        console.error("Polling error:", err);
        setIsProcessing(false);
        showInfo("Failed to check transaction status.", "error");
      }
    };

    poll(); // start polling
  }, []);

  const handleFinalizeOrder = async () => {
    if (!validateForm()) {
      showInfo("Please complete all required fields.", "error");
      return;
    }

    if (selectedPayment === "mobile_money") {
      try {
        setIsProcessing(true);

        const phone = shippingDetails.phone.startsWith("0")
          ? `254${shippingDetails.phone.slice(1)}`
          : shippingDetails.phone.replace("+", "");

        const { data } = await axios.post(`${SERVER_URL}/api/mpesa/pay`, {
          phone,
          amount: grandTotal,
          cartItems,
        });

        setCheckoutRequestID(data.checkoutRequestID);
        showInfo(
          "M-Pesa payment initiated. Enter your PIN on your phone.",
          "info"
        );

        // Start polling
        pollTransaction(data.checkoutRequestID);
      } catch (err) {
        console.error(err.response?.data || err.message);
        showInfo("Failed to initiate M-Pesa payment.", "error");
        setIsProcessing(false);
      }
    } else {
      showInfo("Payment method coming soon!", "info");
    }
  };

  const PaymentOption = ({ option }) => (
    <label
      htmlFor={option.id}
      className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
        selectedPayment === option.id
          ? "border-blue-600 bg-blue-50 shadow-md"
          : "border-gray-200 bg-white hover:border-blue-300"
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="radio"
          id={option.id}
          name="payment"
          value={option.id}
          checked={selectedPayment === option.id}
          onChange={() => {
            setSelectedPayment(option.id);
            setFormErrors((prev) => ({ ...prev, payment: undefined }));
          }}
          className="hidden"
        />
        <div
          className={`p-2 rounded-full ${
            selectedPayment === option.id
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {option.icon}
        </div>
        <div>
          <span className="font-bold text-gray-900">{option.name}</span>
          <p className="text-xs text-gray-500 mt-0.5">{option.details}</p>
        </div>
      </div>
      {selectedPayment === option.id && (
        <CheckCircle size={20} className="text-blue-600 flex-shrink-0" />
      )}
    </label>
  );

  const renderReceipt = () => {
    if (!receiptData) return null;
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-slide-in">
          <div className="p-6 text-center">
            <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">
              Payment {receiptData.status}
            </h2>
            <p className="text-gray-700 mb-4">{receiptData.resultDesc}</p>
            {receiptData.mpesaReceiptNumber && (
              <p className="text-gray-600 mb-1">
                Receipt: {receiptData.mpesaReceiptNumber}
              </p>
            )}
            <p className="text-gray-600 mb-1">
              Amount: {formatPrice(receiptData.amount)}
            </p>
            <p className="text-gray-600 mb-1">Phone: {receiptData.phone}</p>
            <div className="mt-4">
              <button
                onClick={closeModal}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-50 flex items-center justify-center p-4">
      {/* --------- Modal-level Info / Toast --------- */}
      {infoMessage && (
        <div
          className={`absolute top-6 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 text-white
          ${
            infoType === "success"
              ? "bg-green-600"
              : infoType === "error"
              ? "bg-red-600"
              : "bg-blue-600"
          }
          animate-slide-down
        `}
        >
          {infoType === "success" && <CheckCircle size={18} />}
          {infoType === "error" && <X size={18} />}
          {infoType === "info" && <Info size={18} />}
          <span>{infoMessage}</span>
        </div>
      )}

      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl transition-all duration-300 transform scale-100 relative">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10 rounded-t-3xl flex justify-between items-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Finalize Order
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-900 p-2 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
              <MapPin size={20} className="text-blue-600" /> 1. Delivery Details
            </h3>
            <div className="space-y-4">
              {["name", "phone", "street"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field === "name"
                      ? "Full Name *"
                      : field === "phone"
                      ? "Phone Number *"
                      : "Street / Area *"}
                  </label>
                  <input
                    type={field === "phone" ? "tel" : "text"}
                    name={field}
                    value={shippingDetails[field]}
                    onChange={handleShippingChange}
                    placeholder={
                      field === "name"
                        ? "John Doe"
                        : field === "phone"
                        ? "+254 7XX XXX XXX"
                        : "Apartment 4B, XYZ Road"
                    }
                    className={`w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors[field] ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors[field] && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors[field]}
                    </p>
                  )}
                </div>
              ))}
              <div className="flex gap-4">
                <input
                  type="text"
                  name="city"
                  value={shippingDetails.city}
                  disabled
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                />
                <input
                  type="text"
                  name="country"
                  value={shippingDetails.country}
                  disabled
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b pb-2">
              <CreditCard size={20} className="text-blue-600" /> 2. Payment
              Method
            </h3>
            <div className="space-y-4">
              {paymentOptions.map((option) => (
                <PaymentOption key={option.id} option={option} />
              ))}
            </div>
            {formErrors.payment && (
              <p className="text-red-500 text-sm mt-3 font-medium">
                {formErrors.payment}
              </p>
            )}

            <div className="mt-8 pt-4 border-t-2 border-blue-100">
              <div className="flex justify-between text-xl font-extrabold">
                <span>Total to Pay:</span>
                <span className="text-blue-600 text-3xl">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 sticky bottom-0 bg-white rounded-b-3xl">
          <button
            onClick={handleFinalizeOrder}
            disabled={isProcessing}
            className={`w-full block text-center py-3 text-xl font-bold rounded-xl shadow-lg transition duration-300 transform 
              ${
                isProcessing
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30 hover:scale-[1.01]"
              }`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={20} /> Processing
                Payment...
              </span>
            ) : (
              `Place Order and Pay ${
                selectedPayment ? `via ${selectedPayment.split("_")[0]}` : ""
              }`
            )}
          </button>
        </div>
      </div>

      {/* Receipt Panel */}
      {transactionStatus && renderReceipt()}
    </div>
  );
};

export default CheckoutModal;
