import React, { useState, useEffect, useCallback } from "react";
import { useCart } from "../context/CartContext";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  CheckCircle,
  CreditCard,
  Smartphone,
  DollarSign,
  Truck,
  MapPin,
  X,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom"; // Assumed routing for product details
import CheckoutModal from "../components/modal/CheckoutModal";
import Toast from "../components/modal/Toast";

// Utility to format price
const formatPrice = (price) => `Ksh ${price.toLocaleString()}`;

// Mock Constants
const phoneNumber = "254738380692"; // TechHub WhatsApp Number
const MOCK_SHIPPING_FEE = 500;

// --------------------- Toast Component (Reused) ---------------------
// const Toast = ({ message, type = "info", onClose }) => {
//   useEffect(() => {
//     if (!message) return;
//     const timer = setTimeout(() => onClose(), 3000);
//     return () => clearTimeout(timer);
//   }, [message, onClose]);

//   if (!message) return null;

//   const baseStyle =
//     "fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 transition-opacity duration-300 font-semibold";
//   let icon, colorStyle;

//   switch (type) {
//     case "success":
//       icon = <CheckCircle size={20} />;
//       colorStyle = "bg-green-600 text-white";
//       break;
//     case "error":
//       icon = <Trash2 size={20} />;
//       colorStyle = "bg-red-600 text-white";
//       break;
//     default:
//       icon = <DollarSign size={20} />;
//       colorStyle = "bg-blue-600 text-white";
//   }

//   return (
//     <div
//       className={`${baseStyle} ${colorStyle}`}
//       style={{ animation: "fadeInOut 3s ease-in-out forwards" }}
//     >
//       {icon}
//       <span>{message}</span>
//     </div>
//   );
// };

// --------------------- CHECKOUT MODAL COMPONENT ---------------------

// --------------------- Main Cart Component ---------------------
function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // State for Toast & Modal
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const grandTotal = subtotal > 0 ? subtotal + MOCK_SHIPPING_FEE : 0;

  // Function to show toast message
  const showToast = useCallback((message, type) => {
    setToastMessage(message);
    setToastType(type);
  }, []);

  // Handlers wrapped to include toast
  const handleRemoveFromCart = (id, name) => {
    removeFromCart(id);
    showToast(`${name} removed from cart.`, "error");
  };

  const handleUpdateQuantity = (id, change, name) => {
    if (cartItems.find((item) => item.id === id).quantity + change >= 1) {
      updateQuantity(id, change);
      showToast(
        `${name} quantity ${change > 0 ? "increased" : "decreased"}.`,
        "success"
      );
    }
  };

  // WhatsApp message formatting (Inquiry / Quick Order)
  const message =
    cartItems.length > 0
      ? `Hello TechHub, I'm interested in the following products (Quick Order):\n\n${cartItems
          .map(
            (item, i) =>
              `${i + 1}. *${item.name}* (Qty: ${
                item.quantity
              })\nUnit Price: ${formatPrice(item.price)}\n`
          )
          .join("\n")}\n*Total Estimate: ${formatPrice(
          subtotal
        )}*\n\nPlease confirm availability and local delivery/pickup.`
      : "Hello TechHub, I would like to make an inquiry about your products.";

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20 font-sans mb-[-8rem]">
      <style>{`
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, 20px); }
            10% { opacity: 1; transform: translate(-50%, 0); }
            90% { opacity: 1; transform: translate(-50%, 0); }
            100% { opacity: 0; transform: translate(-50%, 20px); }
          }
      `}</style>
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage("")}
      />

      <Helmet>
        <title>{`Shopping Cart (${cartItems.length}) | TechHub`}</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ------------------ LEFT COLUMN: CART ITEMS ------------------ */}
        <section className="lg:col-span-2 space-y-10">
          {/* --- Main Heading --- */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 border-b-4 border-blue-500 pb-3 inline-block tracking-tight">
            Your Shopping Cart 🛍️
          </h1>

          <div className="space-y-6">
            {/* --- Empty Cart State (Same as before - excellent) --- */}
            {cartItems.length === 0 ? (
              <div
                className="text-center py-20 bg-white rounded-3xl shadow-2xl border border-gray-100 transform hover:scale-[1.005] transition-all duration-300"
                data-aos="zoom-in"
              >
                <ShoppingBag size={72} className="text-blue-500 mx-auto mb-6" />
                <p className="text-gray-700 text-3xl font-bold mb-4">
                  Your cart is currently empty!
                </p>
                <p className="text-gray-500 mb-8">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-500/50 transform hover:-translate-y-0.5 transition duration-300 uppercase tracking-wider"
                >
                  <ArrowLeft size={18} /> Continue Shopping
                </Link>
              </div>
            ) : (
              /* --- Cart Items List --- */
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-start bg-white border border-gray-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 gap-4 group"
                  data-aos="fade-up"
                >
                  {/* 1. Image (Optimized for Mobile) */}
                  <Link
                    to={`/product/${item.id}`}
                    className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      // Note: object-contain is better for product visibility than object-cover
                      className="w-full h-full object-contain rounded-xl border border-gray-200 bg-gray-50 group-hover:shadow-lg transition-all duration-500"
                    />
                  </Link>

                  {/* 2. Details & Controls (Flexible Column/Row) */}
                  <div className="flex flex-col flex-grow w-full gap-2">
                    {/* A. Top Row: Name and Total Price (Aligned across the top) */}
                    <div className="flex justify-between items-start pb-2 border-b border-gray-100">
                      {/* Product Info */}
                      <div>
                        <h3 className="text-lg sm:text-2xl font-extrabold text-gray-900 hover:text-blue-600 transition tracking-tight leading-tight">
                          <Link to={`/product/${item.id}`}>{item.name}</Link>
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-gray-500 capitalize">
                          {item.brand || "Artisan Craft"} | Unit:{" "}
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      {/* Total Price */}
                      <div className="text-right flex-shrink-0 ml-4">
                        <p className="text-sm font-semibold text-gray-500 uppercase hidden sm:block">
                          Total
                        </p>
                        <p className="text-xl sm:text-3xl font-extrabold text-blue-600 tracking-tight">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>

                    {/* B. Bottom Row: Controls (Always flexible and spaced) */}
                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white shadow-sm">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, -1, item.name)
                          }
                          disabled={item.quantity <= 1}
                          className="p-2 sm:p-3 text-blue-600 hover:bg-blue-100 disabled:opacity-50 transition"
                          title="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3 sm:px-4 font-extrabold text-md sm:text-xl text-gray-900 select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, 1, item.name)
                          }
                          className="p-2 sm:p-3 text-blue-600 hover:bg-blue-100 transition"
                          title="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleRemoveFromCart(item.id, item.name)}
                        title="Remove item"
                        className="p-2 sm:p-3 rounded-full text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-700 transition duration-200 shadow-md flex-shrink-0"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ------------------ RIGHT COLUMN: ORDER SUMMARY ------------------ */}
        <aside className="lg:sticky lg:top-10">
          <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl p-6 lg:p-8">
            <h3 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-2 border-gray-200 pb-3">
              Order Summary
            </h3>

            {/* Price Details */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-lg text-gray-700">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-lg text-gray-700 border-b border-dashed pb-3">
                <span className="flex items-center gap-2">
                  <Truck size={18} /> Estimated Shipping
                </span>
                <span className="font-semibold text-green-600">
                  {cartItems.length > 0
                    ? formatPrice(MOCK_SHIPPING_FEE)
                    : formatPrice(0)}
                </span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="flex justify-between text-2xl font-extrabold pt-4">
              <span>Grand Total</span>
              <span className="text-blue-600">{formatPrice(grandTotal)}</span>
            </div>

            {/* Primary Checkout CTA (Opens Modal) */}
            <button
              onClick={() => {
                if (cartItems.length > 0) setIsModalOpen(true);
                else
                  showToast(
                    "Your cart is empty. Add items to checkout.",
                    "error"
                  );
              }}
              disabled={cartItems.length === 0}
              className={`w-full block text-center mt-8 py-3 text-xl font-bold rounded-xl shadow-lg transition duration-300 transform 
                ${
                  cartItems.length > 0
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30 hover:scale-[1.02]"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
            >
              Proceed to Checkout
            </button>

            {/* WhatsApp Option (Alternative) */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 text-center mb-3">
                Prefer ordering manually or local pickup?
              </p>
              <a
                href={whatsappURL}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full block text-center py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-3 ${
                  cartItems.length === 0 ? "opacity-60 cursor-not-allowed" : ""
                }`}
                onClick={(e) => cartItems.length === 0 && e.preventDefault()}
              >
                <FaWhatsapp className="text-xl" />
                Quick Order / Inquiry via WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* ------------------ RENDER MODAL ------------------ */}
      {isModalOpen && cartItems.length > 0 && (
        <CheckoutModal
          grandTotal={grandTotal}
          cartItems={cartItems} // <-- Pass cart items here
          closeModal={() => setIsModalOpen(false)}
          showToast={showToast} // <-- Toast callback for modal
        />
      )}
    </div>
  );
}

export default Cart;
