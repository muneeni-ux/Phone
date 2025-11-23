import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

function Checkout() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    if (!shippingAddress.trim()) {
      alert('Please enter a shipping address.');
      return;
    }
    alert('Checkout successful!');
  };

  return (
    <div className="max-w-6xl mx-auto mt-16 p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items Summary */}
      <section className="lg:col-span-2 space-y-6">
        <h2 className="text-3xl font-extrabold text-black mb-6 border-b pb-3">
          Checkout 🛒
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-l-xl"
              />
              <div className="flex flex-col justify-between p-4 flex-grow">
                <div>
                  <h3 className="text-xl font-semibold text-black">{item.name}</h3>
                  <p className="text-yellow-600 font-semibold mt-1">
                    Ksh {item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  {/* Quantity */}
                  <div className="flex items-center border rounded-md overflow-hidden select-none">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 text-yellow-700 hover:bg-yellow-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 font-semibold text-black">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 text-yellow-700 hover:bg-yellow-100 transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 transition"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Subtotal Mobile */}
        <div className="block lg:hidden mt-6 border-t pt-4 text-right font-semibold text-black text-xl">
          Subtotal: Ksh {subtotal.toFixed(2)}
        </div>
      </section>

      {/* Right: Shipping & Payment */}
      <aside className="bg-white rounded-xl shadow-md p-6 sticky top-28 h-fit space-y-8 border border-yellow-100">
        <div>
          <h3 className="text-2xl font-bold text-black mb-4 border-b pb-2">
            Shipping Address
          </h3>
          <input
            type="text"
            placeholder="Enter your address"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="w-full p-3 border border-yellow-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <h3 className="text-2xl font-bold text-black mb-4 border-b pb-2">
            Payment Method
          </h3>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-3 border border-yellow-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="mpesa">M-Pesa</option>
          </select>
        </div>

        <div className="border-t pt-6 text-xl font-extrabold text-black flex justify-between">
          <span>Subtotal</span>
          <span>Ksh {subtotal.toFixed(2)}</span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={cartItems.length === 0 || !shippingAddress.trim()}
          className={`w-full py-3 rounded-full text-white text-lg font-semibold transition 
            ${
              cartItems.length === 0 || !shippingAddress.trim()
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-yellow-500 hover:bg-yellow-600'
            }`}
        >
          Complete Purchase
        </button>
      </aside>
    </div>
  );
}

export default Checkout;




// import React, { useState, useEffect } from "react";
// import { useCart } from "../context/CartContext";
// import { Trash2, Plus, Minus, PhoneCall } from "lucide-react";
// import { FaWhatsapp } from "react-icons/fa";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom"

// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// const SELLER_WHATSAPP = "254738380692"; // use international format without '+'
// const SELLER_TEL = "+254738380692"; // use '+' for tel:

// function Checkout() {
//   const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [isPaying, setIsPaying] = useState(false);
//   const navigate = useNavigate();

//   const subtotal = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   useEffect(() => {
//     const saved = localStorage.getItem("pendingPayment");
//     if (saved && cartItems.length === 0) {
//       toast("Restoring your cart after payment attempt…", { icon: "♻️" });
//       const items = JSON.parse(saved);
//       items.forEach((item) => updateQuantity(item.id, item.quantity));
//     }
//   }, []);

//   const handleMpesaPayment = async () => {
//     if (!phoneNumber.match(/^0(7|1)\d{8}$/)) {
//       toast.error("Enter a valid Safaricom number (07xxxxxxxx or 01xxxxxxxx)");
//       return;
//     }

//     setIsPaying(true);
//     toast.loading("Sending M-Pesa prompt…");

//     const formattedPhone = "254" + phoneNumber.slice(1); // convert 07.. to 2547..

//     try {
//       const res = await fetch(`${SERVER_URL}/api/mpesa/pay`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           phone: formattedPhone,
//           amount: subtotal,
//           cartItems,
//         }),
//       });

//       const data = await res.json();
//       toast.dismiss();

//       if (res.ok) {
//         toast.success("Prompt sent! Confirm payment on your phone 📱");

//         // ⚠️ Do NOT clear the cart immediately!
//         // Store payment state in localStorage (optional for later confirmation)
//         localStorage.setItem("pendingPayment", JSON.stringify(cartItems));

//         const { checkoutRequestID } = data;
//         if (checkoutRequestID) {
//           pollTransactionStatus(checkoutRequestID);
//         }

//         // Guide user to confirm with seller
//         toast("After payment, confirm via WhatsApp or Call to finalize.", {
//           icon: "📞",
//         });
//       } else {
//         toast.error(data.message || "Payment failed");
//       }
//     } catch (err) {
//       toast.dismiss();
//       toast.error("Network error, please try again");
//     }

//     setIsPaying(false);
//   };

//   // Example polling logic
//   const pollTransactionStatus = async (checkoutRequestID, maxAttempts = 12) => {
//     let attempts = 0;

//     const interval = setInterval(async () => {
//       attempts++;

//       try {
//         const res = await fetch(
//           `${SERVER_URL}/api/mpesa/transactions/${checkoutRequestID}`
//         );
//         const txn = await res.json();

//         if (txn && (txn.status === "Success" || txn.status === "Failed")) {
//           clearInterval(interval);
//           alert(`Payment ${txn.status}`);
//           if (txn.status === "Success") {
//             localStorage.setItem('lastPaidCart', JSON.stringify(cartItems));
//             clearCart();
//             localStorage.removeItem("pendingPayment");
//             navigate("/thank-you");
//           }
//           return;
//         }

//         if (attempts >= maxAttempts) {
//           clearInterval(interval);
//           alert("Payment timeout. Please check later.");
//         }
//       } catch (err) {
//         console.error("Polling error:", err);
//       }
//     }, 5000);
//   };

//   const handleConfirmPayment = () => {
//     clearCart();
//     localStorage.removeItem("pendingPayment");
//     toast.success("Thank you! Your order has been confirmed.");
//     toast.success("Welcome back soon! 🛍️");
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 mt-16 bg-white shadow-lg rounded-lg">
//       <h2 className="text-3xl font-bold mb-6 text-blue-800 text-center">
//         🛒 Checkout
//       </h2>

//       {cartItems.length === 0 ? (
//         <p className="text-center text-gray-500 mb-10">Your cart is empty.</p>
//       ) : (
//         <>
//           {/* Cart Items */}
//           <div className="space-y-6 mb-10">
//             {cartItems.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex flex-col sm:flex-row items-center justify-between border p-4 rounded-md bg-gray-50"
//               >
//                 <div className="flex items-center space-x-4 w-full">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-20 h-20 object-cover rounded"
//                   />
//                   <div className="flex-1">
//                     <h3 className="text-lg font-semibold text-blue-900">
//                       {item.name}
//                     </h3>
//                     <p className="text-sm text-gray-600">
//                       Ksh {item.price.toFixed(2)}
//                     </p>
//                     <div className="flex items-center mt-2 space-x-2">
//                       <button
//                         onClick={() => updateQuantity(item.id, -1)}
//                         className="p-1 bg-gray-200 rounded hover:bg-gray-300"
//                       >
//                         <Minus size={16} />
//                       </button>
//                       <span className="px-2">{item.quantity}</span>
//                       <button
//                         onClick={() => updateQuantity(item.id, 1)}
//                         className="p-1 bg-gray-200 rounded hover:bg-gray-300"
//                       >
//                         <Plus size={16} />
//                       </button>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 </div>
//               </div>
//             ))}

//             <div className="flex justify-between items-center pt-6 border-t">
//               <p className="text-xl font-bold text-blue-800">
//                 Subtotal: Ksh {subtotal.toFixed(2)}
//               </p>
//             </div>
//           </div>

//           {/* Phone Number Input */}
//           <div className="mb-6">
//             <label className="block text-lg font-medium text-blue-800 mb-2">
//               Enter M-Pesa Number
//             </label>
//             <input
//               type="tel"
//               placeholder="07xxxxxxxx or 01xxxxxxxx"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="w-full p-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* Instructions */}
//           <div className="mb-8 text-gray-600 text-sm bg-blue-50 p-4 rounded-md border border-blue-100">
//             After payment, you may tap the WhatsApp or Call button to finalise
//             delivery details with the seller.
//           </div>

//           {/* Pay Button */}
//           <div className="flex justify-center">
//             <button
//               onClick={handleMpesaPayment}
//               disabled={isPaying}
//               className="bg-blue-700 text-white px-8 py-3 rounded hover:bg-blue-800 disabled:opacity-50"
//             >
//               {isPaying ? "Processing…" : "Complete Purchase via M-Pesa"}
//             </button>
//           </div>
//         </>
//       )}

//       {/* Contact buttons (always visible) */}
//       <div className="mt-10 flex justify-center gap-6">
//         <a
//           href={`https://wa.me/${SELLER_WHATSAPP}?text=${encodeURIComponent(
//             cartItems.length
//               ? `Hi, I just completed my payment of Ksh ${subtotal.toFixed(
//                   2
//                 )} for:\n` +
//                   cartItems
//                     .map((item) => `- ${item.quantity} x ${item.name}`)
//                     .join("\n")
//               : "Hi, I just made a payment and would like to confirm my order."
//           )}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex items-center gap-2 bg-green-500 text-white px-5 py-3 rounded hover:bg-green-600"
//         >
//           <FaWhatsapp size={18} />
//         </a>

//         <a
//           href={`tel:${SELLER_TEL}`}
//           className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700"
//         >
//           <PhoneCall size={18} />
//         </a>
//       </div>
//       <div className="mt-6 flex justify-center">
//         <button
//           onClick={handleConfirmPayment}
//           className="bg-emerald-600 text-white px-6 py-3 rounded hover:bg-emerald-700"
//         >
//           ✅ I’ve Paid — Clear My Cart
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Checkout;
