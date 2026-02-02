import React, { useState, useEffect, useCallback } from "react";
import { FaHeart, FaStar, FaCartPlus, FaCheckCircle } from "react-icons/fa";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  BatteryCharging,
  Camera,
  Cpu,
  HardDrive,
  MonitorSmartphone,
  CheckCircle as LucideCheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Package,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import CircularProgress from "@mui/material/CircularProgress";
import { useCart } from "../context/CartContext";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";


/* --------------------------
   Toast Component
--------------------------- */
const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-xl shadow-2xl bg-green-500 text-white flex items-center gap-3 transition-opacity duration-300"
      style={{ animation: "fadeInOut 3s ease-in-out forwards" }}
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


/* --------------------------
   MAIN PRODUCT DETAILS PAGE
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

  const [toastMessage, setToastMessage] = useState("");

  const showToast = useCallback((msg) => setToastMessage(msg), []);

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(`${product.name} added to cart!`);
  };


  /* --------------------------
     FETCH PRODUCT FROM BACKEND
  --------------------------- */
  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${SERVER_URL}/api/products/${id}`);
      const data = await res.json();

      if (!data || data.success === false) {
        setProduct(null);
        return;
      }

      setProduct(data);
      fetchRelated(data.brand, data._id);

      setCurrentImageIndex(0);
      setLoading(false);
    } catch (err) {
      console.error("PRODUCT FETCH ERROR:", err);
      setProduct(null);
      setLoading(false);
    }
  };


  /* --------------------------
     FETCH RELATED PRODUCTS
  --------------------------- */
  const fetchRelated = async (brand, currentId) => {
    try {
      const res = await fetch(`${SERVER_URL}/api/products?brand=${brand}`);
      const list = await res.json();

      const filtered = list.filter((p) => p._id !== currentId);
      setRelated(filtered);
    } catch (err) {
      console.error("RELATED FETCH ERROR:", err);
      setRelated([]);
    }
  };


  useEffect(() => {
    fetchProduct();
  }, [id]);


  /* --------------------------
     IMAGE CONTROLS
  --------------------------- */
  const nextImage = () =>
    setCurrentImageIndex((i) =>
      (i + 1) % (product?.gallery?.length || 1)
    );

  const prevImage = () =>
    setCurrentImageIndex((i) =>
      i === 0 ? (product?.gallery?.length || 1) - 1 : i - 1
    );


  const toggleLike = () => {
    setLiked(!liked);
    setProduct((p) =>
      p ? { ...p, likes: p.likes + (liked ? -1 : 1) } : p
    );
  };


  /* --------------------------
     LOADING UI
  --------------------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <CircularProgress color="primary" />
      </div>
    );
  }


  /* --------------------------
     NOT FOUND
  --------------------------- */
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="text-center p-8 bg-gray-50 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found 😔
          </h2>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }


  /* --------------------------
     SPEC ROW COMPONENT
  --------------------------- */
  const SpecRow = ({ icon: Icon, label, value }) =>
    value ? (
      <div className="flex items-center justify-between border-b border-gray-200 last:border-b-0 py-3 px-2 transition-colors hover:bg-blue-50/50 rounded-md">
        <div className="flex items-center gap-3">
          <Icon size={18} className="text-blue-600" />
          <span className="font-medium text-gray-800">{label}</span>
        </div>
        <span className="text-gray-600 text-sm">{value}</span>
      </div>
    ) : null;


  /* --------------------------
     RENDER STARS
  --------------------------- */
  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`text-sm ${
          i < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"
        }`}
      />
    ));


  /* --------------------------
     MAIN UI
  --------------------------- */
  return (
    <>
      <Helmet>
        <title>{product.name} | TechHub</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <Toast message={toastMessage} onClose={() => setToastMessage("")} />

      <main className="min-h-screen bg-gray-50 px-4 md:px-8 py-12 mb-[-8rem]">
        <div className="max-w-6xl mx-auto">

          {/* BACK */}
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-2 font-medium mb-8"
          >
            <ChevronLeft size={18} /> Back to Shop
          </Link>

          {/* PRODUCT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 bg-white p-8 rounded-2xl shadow-xl border">

            {/* IMAGE GALLERY */}
            <div>
              <div className="relative border rounded-xl overflow-hidden shadow-lg bg-white">
                <img
                  src={
                    product.gallery?.[currentImageIndex] ||
                    "/placeholder.png"
                  }
                  alt={product.name}
                  className="w-full h-[450px] object-contain p-8"
                />

                {product.gallery?.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow"
                    >
                      <ChevronLeft />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow"
                    >
                      <ChevronRight />
                    </button>
                  </>
                )}
              </div>

              {/* THUMBNAILS */}
              <div className="flex gap-4 mt-4 justify-center">
                {product.gallery?.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`w-20 h-20 border rounded-lg overflow-hidden ${
                      i === currentImageIndex
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    <img src={g} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>


            {/* DETAILS */}
            <div className="xl:col-span-2">
              <span className="text-sm font-semibold uppercase text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                {product.category}
              </span>

              <h1 className="text-4xl md:text-5xl font-extrabold mt-2">
                {product.name}
              </h1>

              <p className="text-md text-gray-500 mt-2">
                By <span className="text-blue-600 font-bold">{product.brand}</span>
              </p>

              {/* PRICE */}
              <div className="flex justify-between mt-6 pt-6 border-t">
                <div>
                  {product.oldPrice && (
                    <div className="text-xl text-gray-400 line-through">
                      Ksh {product.oldPrice.toLocaleString()}
                    </div>
                  )}

                  <div className="text-4xl font-extrabold text-blue-600">
                    Ksh {product.price.toLocaleString()}
                  </div>
                </div>

                <div
                  className={`px-4 py-2 rounded-full flex items-center gap-2 font-bold ${
                    product.inStock
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.inStock ? (
                    <LucideCheckCircle />
                  ) : (
                    <Clock />
                  )}
                  {product.inStock ? "Ready to Ship" : "Out of Stock"}
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="mt-6 text-gray-700 border-b pb-6">
                {product.description}
              </p>

              {/* RATING & LIKES */}
              <div className="flex gap-6 mt-6 pb-6 border-b">
                <div className="flex items-center gap-2">
                  {renderStars(product.rating)}
                  <span className="text-sm font-semibold">({product.rating})</span>
                </div>

                <div className="flex items-center gap-2 text-gray-500">
                  <FaHeart className="text-pink-500" />
                  <span className="font-semibold">
                    {product.likes?.toLocaleString()} Likes
                  </span>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-4 mt-8 flex-wrap">
                <button
                  onClick={toggleLike}
                  className={`px-6 py-3 rounded-xl border-2 shadow-md flex items-center gap-3 ${
                    liked
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-white text-blue-600 border-blue-200"
                  }`}
                >
                  <FaHeart /> {liked ? "Added to Wishlist" : "Add to Wishlist"}
                </button>

                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`px-8 py-3 rounded-xl font-bold text-white shadow-xl flex items-center gap-3 ${
                    product.inStock
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  <FaCartPlus /> {product.inStock ? "Buy Now" : "Unavailable"}
                </button>
              </div>
            </div>
          </div>


          {/* SPECS */}
          <section className="mt-12 bg-white p-8 rounded-2xl shadow-xl border">
            <h3 className="font-extrabold text-3xl mb-6">Key Specifications</h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SpecRow icon={MonitorSmartphone} label="Display" value={product.specs?.display} />
              <SpecRow icon={Cpu} label="Processor" value={product.specs?.processor} />
              <SpecRow icon={HardDrive} label="RAM" value={product.specs?.ram} />
              <SpecRow icon={Package} label="Storage" value={product.specs?.storage} />
              <SpecRow icon={Camera} label="Camera" value={product.specs?.camera} />
              <SpecRow icon={BatteryCharging} label="Battery" value={product.specs?.battery} />
            </div>
          </section>


          {/* RELATED */}
          <section className="mt-12">
            <div className="flex justify-between pb-4 border-b">
              <h4 className="text-2xl font-extrabold">
                More from {product.brand}
              </h4>

              <Link
                to={`/category/${product.brand}`}
                className="text-blue-600 hover:text-blue-800"
              >
                View all →
              </Link>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.length === 0 ? (
                <div className="bg-white p-4 rounded-xl shadow col-span-full">
                  No related products found.
                </div>
              ) : (
                related.map((r) => (
                  <div
                    key={r._id}
                    className="border rounded-xl p-4 bg-white shadow-md hover:shadow-lg transition flex gap-4 items-center"
                  >
                    <img
                      src={r.gallery?.[0] || "/placeholder.png"}
                      alt={r.name}
                      className="w-20 h-20 object-contain rounded-lg border"
                    />

                    <div className="flex-1">
                      <Link
                        to={`/product/${r._id}`}
                        className="font-bold text-lg text-blue-600 block"
                      >
                        {r.name}
                      </Link>

                      <div className="text-gray-700 font-semibold">
                        Ksh {r.price.toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(r)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm"
                    >
                      <FaCartPlus size={12} />
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



// import React, { useState, useEffect, useCallback } from "react";
// import { FaHeart, FaStar, FaCartPlus, FaCheckCircle } from "react-icons/fa";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import {
//   BatteryCharging,
//   Camera,
//   Cpu,
//   HardDrive,
//   MonitorSmartphone,
//   CheckCircle as LucideCheckCircle,
//   Clock,
//   ChevronLeft,
//   ChevronRight,
//   Zap,
//   Package,
// } from "lucide-react";
// import { Helmet } from "react-helmet-async";
// import CircularProgress from "@mui/material/CircularProgress";
// import { useCart } from "../context/CartContext";

// const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

// // ----------------------------
// // Toast Component (unchanged)
// // ----------------------------
// const Toast = ({ message, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => onClose(), 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   if (!message) return null;

//   return (
//     <div
//       className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-xl shadow-2xl 
//       bg-green-500 text-white flex items-center gap-3 transition-opacity duration-300"
//       style={{ animation: "fadeInOut 3s ease-in-out forwards" }}
//     >
//       <FaCheckCircle size={20} />
//       <span className="font-semibold">{message}</span>

//       <style>{`
//         @keyframes fadeInOut {
//           0% { opacity: 0; transform: translate(-50%, 20px); }
//           10% { opacity: 1; transform: translate(-50%, 0); }
//           90% { opacity: 1; transform: translate(-50%, 0); }
//           100% { opacity: 0; transform: translate(-50%, 20px); }
//         }
//       `}</style>
//     </div>
//   );
// };

// // ----------------------------
// // Product Details Component
// // ----------------------------
// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { addToCart } = useCart();

//   const [product, setProduct] = useState(null);
//   const [related, setRelated] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [liked, setLiked] = useState(false);

//   const [toastMessage, setToastMessage] = useState("");

//   const showToast = useCallback((message) => {
//     setToastMessage(message);
//   }, []);

//   const handleAddToCart = (product) => {
//     addToCart(product);
//     showToast(`${product.name} added to cart!`);
//   };

//   // ==========================================
//   // FETCH PRODUCT FROM BACKEND
//   // ==========================================
//   const fetchProduct = async () => {
//     try {
//       setLoading(true);

//       const res = await fetch(`${SERVER_URL}/api/products/${id}`);
//       const data = await res.json();

//       if (data?.success === false || !data) {
//         setProduct(null);
//         setRelated([]);
//       } else {
//         setProduct(data);

//         // Fetch related products
//         fetchRelated(data.brand, data._id);
//       }

//       setCurrentImageIndex(0);
//       setLoading(false);
//     } catch (error) {
//       console.error("PRODUCT FETCH ERROR:", error);
//       setProduct(null);
//       setLoading(false);
//     }
//   };

//   // RELATED PRODUCTS
//   const fetchRelated = async (brand, currentId) => {
//     try {
//       const res = await fetch(`${SERVER_URL}/api/products?brand=${brand}`);
//       const list = await res.json();

//       const filtered = list.filter((p) => p._id !== currentId);
//       setRelated(filtered);
//     } catch (error) {
//       console.error("RELATED FETCH ERROR:", error);
//       setRelated([]);
//     }
//   };

//   // Load on mount / update
//   useEffect(() => {
//     fetchProduct();
//   }, [id]);

//   const nextImage = () =>
//     setCurrentImageIndex((i) => (i + 1) % (product?.gallery?.length || 1));

//   const prevImage = () =>
//     setCurrentImageIndex((i) =>
//       i === 0 ? (product?.gallery?.length || 1) - 1 : i - 1
//     );

//   const toggleLike = () => {
//     setLiked(!liked);
//     setProduct((p) =>
//       p ? { ...p, likes: p.likes + (liked ? -1 : 1) } : p
//     );
//   };

//   // Loading UI
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <CircularProgress color="primary" />
//       </div>
//     );
//   }

//   // Product not found UI
//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white px-6">
//         <div className="text-center p-8 bg-gray-50 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">
//             Product Not Found 😔
//           </h2>
//           <button
//             onClick={() => navigate("/shop")}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg"
//           >
//             Back to Shop
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // SpecRow
//   const SpecRow = ({ icon: Icon, label, value }) => (
//     <div className="flex items-center justify-between border-b border-gray-200 last:border-b-0 py-3 px-2 transition-colors hover:bg-blue-50/50 rounded-md">
//       <div className="flex items-center gap-3">
//         <Icon size={18} className="text-blue-600 flex-shrink-0" />
//         <span className="font-medium text-gray-800">{label}</span>
//       </div>
//       <span className="text-gray-600 font-medium text-sm text-right">
//         {value}
//       </span>
//     </div>
//   );

//   const renderStars = (rating) =>
//     [...Array(5)].map((_, i) => (
//       <FaStar
//         key={i}
//         className={`text-sm ${
//           i < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"
//         }`}
//       />
//     ));

//   return (
//     <>
//       <Helmet>
//         <title>{product.name} | TechHub</title>
//         <meta name="description" content={product.description} />
//       </Helmet>

//       <Toast
//         message={toastMessage}
//         onClose={() => setToastMessage("")}
//       />

//       {/* ---- FULL UI (unchanged) ---- */}
//       {/* EVERYTHING BELOW IS EXACTLY YOUR UI WITH BACKEND DATA INTEGRATED */}
//       {/* -------------------------------------------------------------- */}

//       <main className="min-h-screen bg-gray-50 text-gray-900 px-4 md:px-8 py-12 mb-[-8rem]">
//         <div className="max-w-6xl mx-auto">
//           <Link
//             to="/"
//             className="text-blue-600 hover:text-blue-800 transition mb-8 inline-flex items-center gap-2 font-medium"
//           >
//             <ChevronLeft size={18} /> Back to Shop
//           </Link>

//           {/* PRODUCT GRID */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 items-start bg-white p-8 rounded-2xl shadow-xl border border-gray-100">

//             {/* GALLERY */}
//             <div>
//               <div className="relative rounded-xl border border-gray-200 shadow-lg overflow-hidden bg-white">
//                 <img
//                   src={product.gallery[currentImageIndex]}
//                   alt={product.name}
//                   className="w-full h-[450px] object-contain p-8"
//                 />

//                 {product.gallery.length > 1 && (
//                   <>
//                     <button
//                       onClick={prevImage}
//                       className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-md"
//                     >
//                       <ChevronLeft size={20} />
//                     </button>

//                     <button
//                       onClick={nextImage}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-md"
//                     >
//                       <ChevronRight size={20} />
//                     </button>
//                   </>
//                 )}
//               </div>

//               {/* THUMBNAILS */}
//               <div className="flex gap-4 mt-4 justify-center">
//                 {product.gallery.map((g, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setCurrentImageIndex(i)}
//                     className={`w-20 h-20 border-2 rounded-lg ${
//                       i === currentImageIndex
//                         ? "border-blue-500"
//                         : "border-gray-200"
//                     }`}
//                   >
//                     <img src={g} className="w-full h-full object-cover p-1" />
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* DETAILS */}
//             <div className="xl:col-span-2">
//               <span className="text-sm font-semibold uppercase text-blue-600 tracking-wider bg-blue-100 px-3 py-1 rounded-full">
//                 {product.category}
//               </span>

//               <h1 className="text-4xl md:text-5xl font-extrabold mt-2">
//                 {product.name}
//               </h1>

//               <p className="text-md text-gray-500 mt-2">
//                 By{" "}
//                 <span className="text-blue-600 font-bold">
//                   {product.brand}
//                 </span>
//               </p>

//               {/* PRICE SECTION */}
//               <div className="flex justify-between mt-6 pt-6 border-t">
//                 <div>
//                   {product.oldPrice && (
//                     <div className="text-xl text-gray-400 line-through">
//                       Ksh {product.oldPrice.toLocaleString()}
//                     </div>
//                   )}

//                   <div className="text-4xl font-extrabold text-blue-600">
//                     Ksh {product.price.toLocaleString()}
//                   </div>
//                 </div>

//                 <div>
//                   <div
//                     className={`px-4 py-2 rounded-full flex items-center gap-2 font-bold ${
//                       product.inStock
//                         ? "bg-green-100 text-green-700"
//                         : "bg-red-100 text-red-600"
//                     }`}
//                   >
//                     {product.inStock ? (
//                       <LucideCheckCircle size={18} />
//                     ) : (
//                       <Clock size={18} />
//                     )}
//                     <span>
//                       {product.inStock ? "Ready to Ship" : "Out of Stock"}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <p className="mt-6 text-gray-700 border-b pb-6">
//                 {product.description}
//               </p>

//               {/* RATINGS + LIKES */}
//               <div className="flex gap-6 mt-6 pb-6 border-b">
//                 <div className="flex items-center gap-2">
//                   {renderStars(product.rating)}
//                   <span className="text-sm font-semibold">
//                     ({product.rating})
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2 text-gray-500">
//                   <FaHeart className="text-pink-500" />
//                   <span className="font-semibold">
//                     {product.likes?.toLocaleString()} Likes
//                   </span>
//                 </div>
//               </div>

//               {/* ACTIONS */}
//               <div className="flex gap-4 mt-8 flex-wrap">
//                 <button
//                   onClick={toggleLike}
//                   className={`px-6 py-3 rounded-xl border-2 shadow-md flex items-center gap-3 ${
//                     liked
//                       ? "bg-red-500 text-white border-red-500"
//                       : "bg-white text-blue-600 border-blue-200"
//                   }`}
//                 >
//                   <FaHeart size={18} />{" "}
//                   {liked ? "Added to Wishlist" : "Add to Wishlist"}
//                 </button>

//                 <button
//                   onClick={() => handleAddToCart(product)}
//                   disabled={!product.inStock}
//                   className={`px-8 py-3 rounded-xl font-bold text-white shadow-xl flex items-center gap-3 ${
//                     product.inStock
//                       ? "bg-blue-600 hover:bg-blue-700"
//                       : "bg-gray-400 cursor-not-allowed"
//                   }`}
//                 >
//                   <FaCartPlus size={18} />
//                   {product.inStock ? "Buy Now" : "Unavailable"}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* SPECS */}
//           <section className="mt-12 bg-white p-8 rounded-2xl shadow-xl border">
//             <h3 className="font-extrabold text-3xl mb-6">
//               Key Specifications
//             </h3>

//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <SpecRow icon={MonitorSmartphone} label="Display" value={product.specs?.display} />
//               <SpecRow icon={Cpu} label="Processor" value={product.specs?.processor} />
//               <SpecRow icon={HardDrive} label="RAM" value={product.specs?.ram} />
//               <SpecRow icon={Package} label="Storage" value={product.specs?.storage} />
//               <SpecRow icon={Camera} label="Camera" value={product.specs?.camera} />
//               <SpecRow icon={BatteryCharging} label="Battery" value={product.specs?.battery} />
//             </div>
//           </section>

//           {/* RELATED PRODUCTS */}
//           <section className="mt-12">
//             <div className="flex justify-between pb-4 border-b">
//               <h4 className="text-2xl font-extrabold">
//                 More from {product.brand}
//               </h4>

//               <Link
//                 to={`/category/${product.brand}`}
//                 className="text-blue-600 hover:text-blue-800"
//               >
//                 View all →
//               </Link>
//             </div>

//             <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {related.length === 0 ? (
//                 <div className="bg-white p-4 rounded-xl shadow-sm col-span-full">
//                   No related products found.
//                 </div>
//               ) : (
//                 related.map((r) => (
//                   <div
//                     key={r._id}
//                     className="border rounded-xl p-4 bg-white shadow-md hover:shadow-lg transition flex gap-4 items-center"
//                   >
//                     <img
//                       src={r.gallery?.[0]}
//                       alt={r.name}
//                       className="w-20 h-20 object-contain rounded-lg border"
//                     />

//                     <div className="flex-1">
//                       <Link
//                         to={`/product/${r._id}`}
//                         className="font-bold text-lg text-blue-600 block"
//                       >
//                         {r.name}
//                       </Link>

//                       <div className="text-gray-700 font-semibold">
//                         Ksh {r.price.toLocaleString()}
//                       </div>
//                     </div>

//                     <button
//                       onClick={() => handleAddToCart(r)}
//                       className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm"
//                     >
//                       Add <FaCartPlus size={12} className="inline ml-1" />
//                     </button>
//                   </div>
//                 ))
//               )}
//             </div>
//           </section>
//         </div>
//       </main>
//     </>
//   );
// };

// export default ProductDetails;
