import React from "react";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";
// import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

function Cart() {
  const phoneNumber = "254724835785"; // Replace with your WhatsApp number
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  // const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // const handleCheckout = () => {
  //   if (cartItems.length === 0) {
  //     alert("Your cart is empty!");
  //   } else {
  //     navigate("/checkout");
  //   }
  // };

  let message = "Hi, I'm interested in the following products:\n\n";
  if (cartItems.length > 0) {
    message += cartItems
      .map(
        (item, index) =>
          `${index + 1}. *${item.name}*\n📦 Qty: ${
            item.quantity
          }\n💰 Price: Ksh ${item.price.toFixed(2)}\n🖼️ Image: ${item.image}\n`
      )
      .join("\n");
    message += `\n\n🧾 *Subtotal:* Ksh ${subtotal.toFixed(
      2
    )}\n\nPlease provide more details.`;
  } else {
    message =
      "Hi, I would like to inquire about some products, but my cart seems empty.";
  }

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-10 mt-14 grid grid-cols-1 lg:grid-cols-3 gap-10 bg-white">
      <Helmet>
        <title>Your Cart | Pak Fashions</title>
        <meta
          name="description"
          content="Review your selected fashion items in the cart. Adjust quantities, remove items, or proceed to checkout or WhatsApp booking with ease."
        />
        <meta
          name="keywords"
          content="fashion cart, shopping cart, pak fashions cart, buy clothes online Kenya, fashion checkout"
        />
        <meta name="author" content="Pak Fashions" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph for Facebook, LinkedIn, etc. */}
        <meta property="og:title" content="Your Cart | Pak Fashions" />
        <meta
          property="og:description"
          content="Explore the items you've added to your Pak Fashions cart. Continue shopping or place your order via WhatsApp."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pakfashions.co.ke/cart" />
        <meta
          property="og:image"
          content="https://pakfashions.co.ke/pak-circle.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Cart | Pak Fashions" />
        <meta
          name="twitter:description"
          content="Review your cart items and place your fashion order from Pak Fashions."
        />
        <meta
          name="twitter:image"
          content="https://pakfashions.co.ke/pak-circle.png"
        />
      </Helmet>

      {/* Cart Items */}
      <section className="lg:col-span-2 space-y-6">
        <h2 className="text-4xl font-extrabold text-black border-b pb-4">
          Your Cart 🛒
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-lg">Your cart is currently empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-lg transition-all p-4 gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-xl border"
              />
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-bold text-black">{item.name}</h3>
                  <p className="text-yellow-600 font-semibold mt-1">
                    Ksh {item.price.toFixed(2)}
                  </p>
                  <p className="text-gray-500 mt-2 text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center border rounded-full overflow-hidden bg-yellow-50">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 text-yellow-700 hover:bg-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 font-medium text-black">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 text-yellow-700 hover:bg-yellow-200 transition"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Remove from Cart"
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Order Summary */}
      <aside className="bg-black text-white shadow-xl rounded-3xl p-6 h-fit sticky top-24">
        <h3 className="text-3xl font-bold mb-6 border-b border-yellow-400 pb-3">
          Order Summary
        </h3>

        <div className="flex justify-between text-lg font-semibold text-yellow-400 mb-8">
          <span>Subtotal</span>
          <span>Ksh {subtotal.toFixed(2)}</span>
        </div>

        <a
          href={whatsappURL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block text-center px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black text-lg font-semibold rounded-full shadow-md transition-all flex items-center justify-center gap-2"
        >
          <FaWhatsapp className="text-2xl" />
          Buy/Book via WhatsApp
        </a>
      </aside>
    </div>
  );
}

export default Cart;

// import React from 'react';
// import { useCart } from '../context/CartContext';
// import { Trash2, Plus, Minus } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate

// function Cart() {
//   const { cartItems, removeFromCart, updateQuantity } = useCart();
//   const navigate = useNavigate();  // Initialize useNavigate

//   // Calculate subtotal
//   const subtotal = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   // Checkout function
//   const handleCheckout = () => {
//     if (cartItems.length === 0) {
//       alert('Your cart is empty!');
//     } else {
//       // Navigate to checkout page (adjust path if needed)
//       navigate('/checkout');
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 mt-16 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4 text-blue-800">Your Cart 🛒</h2>

//       {cartItems.length === 0 ? (
//         <p className="text-gray-500">Your cart is empty.</p>
//       ) : (
//         <div className="space-y-6">
//           {cartItems.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center justify-between border p-4 rounded-md shadow-sm bg-white"
//             >
//               <div className="flex items-center space-x-4">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-20 h-20 object-cover rounded"
//                 />
//                 <div>
//                   <h3 className="text-lg font-semibold text-blue-900">{item.name}</h3>
//                   <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
//                   {/* Product Description */}
//                   <p className="text-sm text-gray-500 mt-1">{item.description}</p>

//                   <div className="flex items-center mt-2 space-x-2">
//                     <button
//                       onClick={() => updateQuantity(item.id, -1)}
//                       className="p-1 bg-gray-200 rounded hover:bg-gray-300"
//                     >
//                       <Minus size={16} />
//                     </button>
//                     <span className="px-2">{item.quantity}</span>
//                     <button
//                       onClick={() => updateQuantity(item.id, 1)}
//                       className="p-1 bg-gray-200 rounded hover:bg-gray-300"
//                     >
//                       <Plus size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <button
//                 onClick={() => removeFromCart(item.id)}
//                 className="text-red-600 hover:text-red-800"
//               >
//                 <Trash2 size={20} />
//               </button>
//             </div>
//           ))}

//           {/* Cart Summary and Checkout */}
//           <div className="flex justify-between items-center pt-6 border-t">
//             <p className="text-lg font-bold text-blue-800">
//               Subtotal: ksh {subtotal.toFixed(2)}
//             </p>
//             <button
//               onClick={handleCheckout}  // Trigger checkout
//               className={`px-6 py-2 rounded ${cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 text-white hover:bg-blue-800'}`}
//               disabled={cartItems.length === 0}
//             >
//               Checkout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;
