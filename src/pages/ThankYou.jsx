// import React from "react";
// import { Phone, MessageCircleHeart } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const ThankYouPage = () => {
//   const navigate = useNavigate();

//   // Simulated cart (replace this with actual cart state or localStorage)
//   const cart = JSON.parse(localStorage.getItem("lastPaidCart")) || [];

//   const whatsappNumber = "254738380692"; // Your WhatsApp number
//   const phoneNumber = "0738380692";      // Your call number

//   const getWhatsAppMessage = () => {
//     let message = "Hello, I just made a payment. Here are my order details:\n\n";

//     let total = 0;
//     cart.forEach((item, index) => {
//       const subtotal = item.price * item.quantity;
//       total += subtotal;
//       message += `${index + 1}. ${item.name} x${item.quantity} - KES ${subtotal}\n`;
//     });

//     message += `\nTotal: KES ${total}\n\nKindly confirm my order.`;

//     return encodeURIComponent(message); // Encode for URL
//   };

//   const handleGoHome = () => {
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col items-center justify-center text-center px-6 py-12">
//       <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full space-y-6">
//         <MessageCircleHeart className="mx-auto text-green-500" size={48} />
//         <h2 className="text-2xl font-semibold text-gray-800">Thank You for Your Purchase!</h2>
//         <p className="text-gray-600">
//           We've received your order. Kindly contact us to confirm your items and shipping details.
//         </p>

//         <div className="flex flex-col space-y-4 mt-6">
//           <a
//             href={`https://wa.me/${whatsappNumber}?text=${getWhatsAppMessage()}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-5 rounded-lg"
//           >
//             Chat on WhatsApp
//           </a>

//           <a
//             href={`tel:${phoneNumber}`}
//             className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-5 rounded-lg flex items-center justify-center space-x-2"
//           >
//             <Phone size={20} />
//             <span>Call Us</span>
//           </a>

//           <button
//             onClick={handleGoHome}
//             className="text-sm text-gray-500 hover:underline mt-4"
//           >
//             Go back to Home
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ThankYouPage;

import React, { useEffect, useState } from "react";
import { Phone, MessageCircleHeart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const whatsappNumber = "254738380692";
  const phoneNumber = "0738380692";

  useEffect(() => {
    const lastCart = JSON.parse(localStorage.getItem("lastPaidCart"));
    if (lastCart) {
      setCart(lastCart);
      localStorage.removeItem("lastPaidCart");
    }
  }, []);

  const getWhatsAppMessage = () => {
    let message = "Hello, I just made a payment. Here are my order details:\n\n";
    let total = 0;
    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;
      message += `${index + 1}. ${item.name} x${item.quantity} - KES ${subtotal}\n`;
    });
    message += `\nTotal: KES ${total}\n\nKindly confirm my order.`;
    return encodeURIComponent(message);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col items-center justify-center text-center px-6 py-12 md:mt-8">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full space-y-6">
        <MessageCircleHeart className="mx-auto text-green-500" size={48} />
        <h2 className="text-2xl font-semibold text-gray-800">Thank You for Your Purchase!</h2>
        <p className="text-gray-600">
          We've received your order. Kindly contact us to confirm your items and shipping details.
        </p>

        {/* Order Summary */}
        {cart.length > 0 && (
          <div className="mt-4 text-left text-sm text-gray-700 border-t pt-4">
            <h3 className="font-semibold mb-2 text-base text-gray-800">Order Summary:</h3>
            <ul className="space-y-1">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name} x{item.quantity}</span>
                  <span>KES {item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 font-semibold flex justify-between border-t pt-2">
              <span>Total:</span>
              <span>KES {getTotal()}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-4 mt-6">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${getWhatsAppMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-5 rounded-lg"
          >
            Chat on WhatsApp
          </a>

          <a
            href={`tel:${phoneNumber}`}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-5 rounded-lg flex items-center justify-center space-x-2"
          >
            <Phone size={20} />
            <span>Call Us</span>
          </a>

          <button
            onClick={handleGoHome}
            className="text-sm text-gray-500 hover:underline mt-4"
          >
            Go back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
