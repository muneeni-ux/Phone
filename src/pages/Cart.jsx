import React, { useState, useEffect, useCallback } from "react";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CheckCircle, CreditCard, Smartphone, DollarSign, Truck, MapPin, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom"; // Assumed routing for product details
import CheckoutModal from "../components/modal/CheckoutModal";

// Utility to format price
const formatPrice = (price) => `Ksh ${price.toLocaleString()}`;

// Mock Constants
const phoneNumber = "254738380692"; // TechHub WhatsApp Number
const MOCK_SHIPPING_FEE = 500;

// --------------------- Toast Component (Reused) ---------------------
const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const baseStyle = "fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 transition-opacity duration-300 font-semibold";
  let icon, colorStyle;

  switch (type) {
    case 'success':
      icon = <CheckCircle size={20} />;
      colorStyle = "bg-green-600 text-white";
      break;
    case 'error':
      icon = <Trash2 size={20} />;
      colorStyle = "bg-red-600 text-white";
      break;
    default:
      icon = <DollarSign size={20} />;
      colorStyle = "bg-blue-600 text-white";
  }

  return (
    <div
      className={`${baseStyle} ${colorStyle}`}
      style={{ animation: "fadeInOut 3s ease-in-out forwards" }}
    >
      {icon}
      <span>{message}</span>
    </div>
  );
};

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
    showToast(`${name} removed from cart.`, 'error');
  };

  const handleUpdateQuantity = (id, change, name) => {
    if (cartItems.find(item => item.id === id).quantity + change >= 1) {
      updateQuantity(id, change);
      showToast(`${name} quantity ${change > 0 ? 'increased' : 'decreased'}.`, 'success');
    }
  };

  // WhatsApp message formatting (Inquiry / Quick Order)
  const message = cartItems.length > 0 
    ? `Hello TechHub, I'm interested in the following products (Quick Order):\n\n${cartItems.map((item, i) => `${i + 1}. *${item.name}* (Qty: ${item.quantity})\nUnit Price: ${formatPrice(item.price)}\n`).join("\n")}\n*Total Estimate: ${formatPrice(subtotal)}*\n\nPlease confirm availability and local delivery/pickup.`
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
      <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage("")} />

      <Helmet>
        <title>{`Shopping Cart (${cartItems.length}) | TechHub`}</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* ------------------ LEFT COLUMN: CART ITEMS ------------------ */}
        <section className="lg:col-span-2 space-y-8">
          
          <h1 className="text-4xl font-extrabold text-gray-900 border-b-4 border-blue-600 pb-4 mb-4 inline-block">
            Your Shopping Cart 🛒
          </h1>

          <div className="space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-xl border border-gray-200">
                <ShoppingBag size={64} className="text-blue-500 mx-auto mb-4" />
                <p className="text-gray-700 text-2xl font-semibold mb-4">Your cart is empty!</p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-200"
                >
                  <ArrowLeft size={18} /> Continue Shopping
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 gap-4 sm:gap-6"
                >
                  {/* Image & Link */}
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full sm:w-28 h-40 sm:h-28 object-contain rounded-xl border border-gray-100 bg-gray-50 hover:shadow-md transition"
                    />
                  </Link>

                  <div className="flex flex-col justify-between flex-grow w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        {/* Product Name & Link */}
                        <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition">
                          <Link to={`/product/${item.id}`}>{item.name}</Link>
                        </h3>
                        <p className="text-sm font-medium text-gray-500 capitalize">
                          {item.brand || "Tech Brand"}
                        </p>
                      </div>
                      
                      <div className="text-right flex-shrink-0">
                          <p className="text-2xl font-extrabold text-blue-600">
                              {formatPrice(item.price * item.quantity)}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                              Unit: {formatPrice(item.price)}
                          </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 border-t border-gray-100 pt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white shadow-sm">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, -1, item.name)}
                          disabled={item.quantity <= 1}
                          className="p-3 text-blue-600 hover:bg-blue-100 disabled:opacity-50 transition"
                          title="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 font-extrabold text-lg text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, 1, item.name)}
                          className="p-3 text-blue-600 hover:bg-blue-100 transition"
                          title="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => handleRemoveFromCart(item.id, item.name)}
                        title="Remove item"
                        className="p-3 rounded-full text-red-500 hover:bg-red-50 hover:text-red-700 transition duration-200 border border-transparent hover:border-red-300"
                      >
                        <Trash2 size={22} />
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
                <span className="flex items-center gap-2"><Truck size={18}/> Estimated Shipping</span>
                <span className="font-semibold text-green-600">{cartItems.length > 0 ? formatPrice(MOCK_SHIPPING_FEE) : formatPrice(0)}</span>
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
                    else showToast("Your cart is empty. Add items to checkout.", 'error');
                }}
                disabled={cartItems.length === 0}
                className={`w-full block text-center mt-8 py-3 text-xl font-bold rounded-xl shadow-lg transition duration-300 transform 
                ${cartItems.length > 0
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30 hover:scale-[1.02]' 
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
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
              closeModal={() => setIsModalOpen(false)} 
              showToast={showToast} 
          />
      )}
    </div>
  );
}

export default Cart;