// src/pages/ProductDetails.jsx
import React, { useState, useEffect, useCallback } from "react";
import { FaHeart, FaStar, FaCartPlus, FaCheckCircle } from "react-icons/fa";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  BatteryCharging,
  Camera,
  Cpu,
  HardDrive,
  MonitorSmartphone,
  CheckCircle as LucideCheckCircle, // Renamed Lucide CheckCircle to avoid conflict
  Clock,
  ChevronLeft,
  ChevronRight,
  Zap,
  Package,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import CircularProgress from "@mui/material/CircularProgress";
import { useCart } from "../context/CartContext";

/**
 * ProductDetails (frontend mock)
 * - Enhanced styling for a modern, tech-focused look.
 */

/* ---------------------------
   MOCK PRODUCTS (in-file)
   --------------------------- */
const PRODUCTS = [
  {
    _id: "1",
    brand: "Oppo",
    name: "Oppo Reno 10 Pro",
    price: 65000,
    oldPrice: 72000,
    inStock: true,
    rating: 4.5,
    likes: 230,
    category: "Smartphone",
    description:
      "Oppo Reno 10 Pro: premium glass finish, 120Hz AMOLED, flagship Camera stack. Experience ultra-fast performance and crystal-clear optics.",
    gallery: [
      "https://via.placeholder.com/800x800/ffffff/007bff?text=Oppo+Reno+10+Pro+1",
      "https://via.placeholder.com/800x800/ffffff/007bff?text=Oppo+Reno+10+Pro+2",
      "https://via.placeholder.com/800x800/ffffff/007bff?text=Oppo+Reno+10+Pro+3",
    ],
    specs: {
      display: "6.7-inch 120Hz AMOLED",
      processor: "Dimensity 9200",
      ram: "12 GB LPDDR5X",
      storage: "256 GB UFS 3.1",
      camera: "50MP OIS + 8MP UW + 2MP Macro",
      battery: "5000 mAh, 80W SuperVOOC",
    },
  },
  {
    _id: "2",
    brand: "Vivo",
    name: "Vivo V30 Pro 5G - Aurora Blue",
    price: 59999,
    oldPrice: 65000,
    inStock: true,
    rating: 4.8,
    likes: 1205,
    category: "Smartphone",
    description:
      "Pro-grade photography, curved AMOLED, long battery life and fast-charging. Capture stunning low-light photos with the Aura Light.",
    gallery: [
      "https://images.unsplash.com/photo-1610945265064-003985558941?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610945417439-01287752174d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593361094065-22d7168987b5?q=80&w=800&auto=format&fit=crop",
    ],
    specs: {
      display: "6.78-inch 120Hz Curved AMOLED",
      processor: "Snapdragon 8 Gen 2",
      ram: "12 GB LPDDR5",
      storage: "512 GB UFS 3.1",
      camera: "50MP Wide + 50MP Portrait + 50MP Ultra-wide",
      battery: "5000 mAh / 80W Fast Charge",
    },
  },
  {
    _id: "3",
    brand: "Samsung",
    name: "Galaxy S23 Ultra",
    price: 145000,
    oldPrice: 160000,
    inStock: false,
    rating: 4.9,
    likes: 880,
    category: "Smartphone",
    description: "Samsung flagship — top camera and S Pen support. The ultimate productivity and photography powerhouse.",
    gallery: [
      "https://via.placeholder.com/800x800/ffffff/1E3A8A?text=Samsung+S23+Ultra+1",
      "https://via.placeholder.com/800x800/ffffff/1E3A8A?text=Samsung+S23+Ultra+2",
    ],
    specs: {
      display: "6.8-inch Dynamic AMOLED 2X",
      processor: "Snapdragon 8 Gen 2 for Galaxy",
      ram: "12 GB",
      storage: "512 GB",
      camera: "200MP + 10MP telephoto + 12MP ultrawide",
      battery: "5000 mAh, 45W Fast Charging",
    },
  },
];

// ----------------------------------------------------------------
// NEW: Toast Component for Cart Notification
// ----------------------------------------------------------------
const Toast = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Auto-close after 3 seconds
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!message) return null;

    return (
        <div 
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-xl shadow-2xl 
                       bg-green-500 text-white flex items-center gap-3 transition-opacity duration-300"
            style={{ animation: 'fadeInOut 3s ease-in-out forwards' }}
        >
            <FaCheckCircle size={20} />
            <span className="font-semibold">{message}</span>
             <style>{`
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translate(-50%, 20px); }
                    10% { opacity: 1; transform: translate(-50%, 0); }
                    90% { opacity: 1; transform: translate(-50%, 0); }
                    100% { opacity: 0; transform: translate(-50%, 20px); }
                }
            `}</style>
        </div>
    );
};
// ----------------------------------------------------------------

/* ---------------------------
   COMPONENT
   --------------------------- */
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  // NEW State for Toast Message
  const [toastMessage, setToastMessage] = useState(''); 

  // Function to show toast
  const showToast = useCallback((message) => {
    setToastMessage(message);
  }, []);

  // Updated AddToCart handler
  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(`${product.name} added to cart!`);
  };

  // Load product by id (mock)
  useEffect(() => {
    setLoading(true);
    // simulate small delay like an API
    const t = setTimeout(() => {
      const found = PRODUCTS.find((p) => String(p._id) === String(id));
      if (found) {
        setProduct(found);
        // related = same brand, excluding current
        setRelated(PRODUCTS.filter((p) => p.brand === found.brand && p._id !== found._id));
      } else {
        setProduct(null);
        setRelated([]);
      }
      setCurrentImageIndex(0);
      setLoading(false);
    }, 250);

    return () => clearTimeout(t);
  }, [id]);

  const nextImage = () => setCurrentImageIndex((i) => (i + 1) % (product?.gallery?.length || 1));
  const prevImage = () =>
    setCurrentImageIndex((i) =>
      i === 0 ? (product?.gallery?.length || 1) - 1 : i - 1
    );

  const toggleLike = () => {
    setLiked((s) => !s);
    setProduct((p) => (p ? { ...p, likes: p.likes + (liked ? -1 : 1) } : p));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <CircularProgress color="primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="text-center p-8 bg-gray-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found 😔</h2>
          <p className="text-gray-600 mb-6">The product you're looking for may have been removed or the link is incorrect.</p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition shadow-lg"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  /* Reusable SpecRow - Enhanced Styling */
  const SpecRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-center justify-between border-b border-gray-200 last:border-b-0 py-3 px-2 transition-colors hover:bg-blue-50/50 rounded-md">
      <div className="flex items-center gap-3">
        <Icon size={18} className="text-blue-600 flex-shrink-0" />
        <span className="font-medium text-gray-800">{label}</span>
      </div>
      <span className="text-gray-600 font-medium text-sm text-right">{value}</span>
    </div>
  );
  
  // Helper for star rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar 
        key={i} 
        className={`text-sm ${i < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"}`} 
      />
    ));
  };

  return (
    <>
      <Helmet>
        <title>{product.name} | TechHub</title>
        <meta name="description" content={product.description} />
      </Helmet>
      
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />

      {/* Main Container */}
      <main className="min-h-screen bg-gray-50 text-gray-900 px-4 md:px-8 py-12 mb-[-8rem]">
        <div className="max-w-6xl mx-auto">
          
          <Link to="/" className="text-blue-600 hover:text-blue-800 transition mb-8 inline-flex items-center gap-2 font-medium">
            <ChevronLeft size={18} /> Back to Shop
          </Link>

          {/* Product Grid (Gallery and Info) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 items-start bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            
            {/* Gallery (Left/Center Column) */}
            <div className="lg:col-span-1">
              <div className="relative rounded-xl border border-gray-200 shadow-lg overflow-hidden bg-white">
                <img
                  src={product.gallery[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-[450px] object-contain p-8 transition duration-500 hover:scale-[1.03]"
                />
                {product.gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-md text-gray-700 hover:text-blue-600 transition"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-md text-gray-700 hover:text-blue-600 transition"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4 mt-4 justify-center">
                {product.gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${i === currentImageIndex ? "border-blue-500 shadow-md" : "border-gray-200 hover:border-blue-300"}`}
                  >
                    <img src={g} alt={`thumb-${i}`} className="w-full h-full object-cover p-1" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details & Price (Center/Right Column) */}
            <div className="xl:col-span-2">
              <span className="text-sm font-semibold uppercase text-blue-600 tracking-wider bg-blue-100 px-3 py-1 rounded-full">{product.category}</span>
              <h1 className="text-4xl md:text-5xl font-extrabold mt-2 text-gray-900 leading-tight">{product.name}</h1>
              <p className="text-md text-gray-500 mt-2 font-medium">
                By <span className="text-blue-600 font-bold">{product.brand}</span>
              </p>

              {/* Price & Stock */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 pt-6 border-t border-gray-200">
                <div>
                  {product.oldPrice && (
                    <div className="text-xl text-gray-400 line-through font-medium">
                      Ksh {product.oldPrice.toLocaleString()}
                    </div>
                  )}
                  <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                    Ksh {product.price.toLocaleString()}
                  </div>
                </div>

                <div className="mt-4 sm:mt-0">
                  <div className={`px-4 py-2 rounded-full font-bold flex items-center gap-2 ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    {product.inStock ? <LucideCheckCircle size={18} /> : <Clock size={18} />}
                    <span>{product.inStock ? "Ready to Ship" : "Out of Stock"}</span>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-gray-700 leading-relaxed border-b border-gray-100 pb-6">{product.description}</p>

              {/* Ratings & Likes */}
              <div className="flex items-center gap-6 mt-6 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  {renderStars(product.rating)}
                  <span className="text-sm font-semibold text-gray-700 ml-1">({product.rating})</span>
                </div>

                <div className="flex items-center gap-2 text-gray-500">
                  <FaHeart className="text-pink-500" />
                  <span className="font-semibold">{product.likes.toLocaleString()} Likes</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={() => { toggleLike(); }}
                  className={`flex items-center justify-center gap-3 px-6 py-3 rounded-xl border-2 font-semibold transition duration-300 shadow-md ${
                    liked 
                    ? "bg-red-500 text-white border-red-500 hover:bg-red-600" 
                    : "bg-white text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-400"
                  }`}
                  title="Add to Wishlist"
                >
                  <FaHeart size={18} /> {liked ? "Added to Wishlist" : "Add to Wishlist"}
                </button>

                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`flex items-center justify-center gap-3 px-8 py-3 rounded-xl text-white font-bold transition duration-300 shadow-xl ${
                    product.inStock 
                    ? "bg-blue-600 hover:bg-blue-700 shadow-blue-500/30" 
                    : "bg-gray-400 cursor-not-allowed shadow-none"
                  }`}
                  title="Add to Cart"
                >
                  <FaCartPlus size={18} /> {product.inStock ? "Buy Now" : "Currently Unavailable"}
                </button>
              </div>
            </div>
          </div>
          
          {/* Specifications and Features (Full Width Section) */}
          <section className="mt-12 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="font-extrabold text-3xl mb-6 text-gray-900 border-b pb-4">Key Specifications</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SpecRow icon={MonitorSmartphone} label="Display" value={product.specs.display} />
              <SpecRow icon={Cpu} label="Processor" value={product.specs.processor} />
              <SpecRow icon={HardDrive} label="RAM" value={product.specs.ram} />
              <SpecRow icon={Package} label="Storage" value={product.specs.storage} />
              <SpecRow icon={Camera} label="Camera System" value={product.specs.camera} />
              <SpecRow icon={BatteryCharging} label="Battery & Charging" value={product.specs.battery} />
            </div>

            {/* Additional Features (Example) */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-bold text-xl mb-4 text-gray-800">Additional Features</h4>
              <ul className="flex flex-wrap gap-4 text-gray-600">
                <li className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"><LucideCheckCircle size={16} className="text-green-500"/> Premium Build</li>
                <li className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"><Zap size={16} className="text-yellow-500"/> Super Fast Charging</li>
                <li className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"><FaStar size={14} className="text-blue-500"/> Top-Rated Performance</li>
              </ul>
            </div>
          </section>

          {/* Related Products Section */}
          <section className="mt-12">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <h4 className="text-2xl font-extrabold text-gray-900">More from {product.brand}</h4>
              <Link to={`/category/${product.brand.toLowerCase()}`} className="text-blue-600 hover:text-blue-800 transition font-medium">View all →</Link>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.length === 0 ? (
                <div className="text-gray-600 p-4 bg-white rounded-xl shadow-sm border col-span-full">
                  No other related items found for {product.brand}.
                </div>
              ) : (
                related.map((r) => (
                  <div key={r._id} className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center bg-white shadow-md hover:shadow-lg transition duration-300">
                    <img src={r.gallery?.[0] || r.image} alt={r.name} className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg p-1 border" />
                    <div className="flex-1 text-center sm:text-left">
                      <Link to={`/product/${r._id}`} className="font-bold text-lg text-blue-600 hover:text-blue-700 block truncate transition">{r.name}</Link>
                      <div className="text-gray-700 text-lg mt-1 font-semibold">Ksh {r.price.toLocaleString()}</div>
                    </div>
                    <button 
                      onClick={() => handleAddToCart(r)} 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-semibold text-sm w-full sm:w-auto mt-2 sm:mt-0"
                    >
                      Add <FaCartPlus size={12} className="inline ml-1"/>
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default ProductDetails;