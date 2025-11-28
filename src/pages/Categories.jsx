// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { FaStar } from "react-icons/fa";
// import axios from "axios";
// import { Helmet } from "react-helmet-async";
// import CircularProgress from "@mui/material/CircularProgress";

// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// const Categories = () => {
//   const { categoryName } = useParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [subCategory, setSubCategory] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 8;

//   const subCategoryOptions = {
//     "Men's Clothing": [
//       "All",
//       "Suits",
//       "Blazers",
//       "Tops",
//       "Bottoms",
//       "Jackets & Coats",
//     ],
//     "Women's Clothing": [
//       "All",
//       "Dresses",
//       "Tops",
//       "Bottoms",
//       "Jackets & Coats",
//     ],
//     "Kids' Clothing": ["All", "Tops", "Bottoms"],
//     Shoes: ["All"],
//     "Bags & Accessories": ["All"],
//     "Clearance Sale": ["All"],
//   };

//   useEffect(() => {
//     const fetchCategoryProducts = async () => {
//       try {
//         setLoading(true);
//         const subQuery =
//           subCategory !== "All"
//             ? `&subCategory=${encodeURIComponent(subCategory)}`
//             : "";
//         const res = await axios.get(
//           `${SERVER_URL}/api/products?category=${encodeURIComponent(
//             categoryName
//           )}${subQuery}`
//         );
//         setProducts(res.data);
//       } catch (err) {
//         setError("Failed to fetch products.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategoryProducts();
//   }, [categoryName, subCategory]);

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [categoryName, subCategory]);

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = products.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );
//   const totalPages = Math.ceil(products.length / productsPerPage);

//   return (
//     <div className="min-h-screen px-6 py-20 mt-12 bg-white text-black">
//       <Helmet>
//         <title>{categoryName} | Shop by Category - Pak Fashions</title>
//         <meta
//           name="description"
//           content={`Explore premium fashion products under the ${categoryName} category at Pak Fashions. Stylish, affordable, and high-quality pieces.`}
//         />
//         <meta
//           name="keywords"
//           content={`fashion, ${categoryName}, clothing, style, Pak Fashions, shop category`}
//         />
//         <meta name="author" content="Pak Fashions" />
//         <meta name="robots" content="index, follow" />

//         {/* Open Graph / Facebook */}
//         <meta property="og:title" content={`${categoryName} | Pak Fashions`} />
//         <meta
//           property="og:description"
//           content={`Discover top ${categoryName} picks curated by Pak Fashions. Quality fashion for all tastes.`}
//         />
//         <meta property="og:type" content="website" />
//         <meta
//           property="og:url"
//           content={`https://pakfashions.co.ke/category/${categoryName}`}
//         />
//         <meta
//           property="og:image"
//           content="https://pakfashions.co.ke/pak-fashion.jpg"
//         />

//         {/* Twitter Card */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={`${categoryName} | Pak Fashions`} />
//         <meta
//           name="twitter:description"
//           content={`Explore top-rated ${categoryName} items at Pak Fashions. Clothing & fashion redefined.`}
//         />
//         <meta
//           name="twitter:image"
//           content="https://pakfashions.co.ke/pak-circle.png"
//         />
//       </Helmet>

//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-10 text-center">
//           <span className="bg-yellow-400 px-4 py-1 rounded-xl text-black shadow">
//             {categoryName}
//           </span>
//         </h1>
//         {/* Subcategory Filter Buttons */}
//         {(subCategoryOptions[categoryName] || []).length > 1 && (
//           <div className="flex flex-wrap gap-3 justify-center mb-10">
//             {subCategoryOptions[categoryName].map((sub) => (
//               <button
//                 key={sub}
//                 onClick={() => setSubCategory(sub)}
//                 className={`px-4 py-2 rounded-full text-sm font-semibold border ${
//                   subCategory === sub
//                     ? "bg-yellow-400 text-black border-yellow-600"
//                     : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-50"
//                 }`}
//               >
//                 {sub}
//               </button>
//             ))}
//           </div>
//         )}

//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <CircularProgress style={{ color: "black" }} />
//           </div>
//         ) : error ? (
//           <p className="text-center text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-md w-fit mx-auto font-semibold mb-6">
//             {error}
//           </p>
//         ) : products.length === 0 ? (
//           <p className="text-center text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-md w-fit mx-auto font-semibold mb-6">
//             No products found in this category.
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
//             {currentProducts.map((product) => (
//               <Link
//                 to={`/product/${product._id}`}
//                 key={product._id}
//                 className="group bg-yellow-50 rounded-2xl p-5 shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 border border-yellow-200"
//               >
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-64 object-cover rounded-xl mb-4 group-hover:opacity-90 transition duration-300"
//                 />
//                 <h2 className="text-xl font-bold text-black group-hover:underline">
//                   {product.name}
//                 </h2>
//                 <p className="text-gray-700 mb-2">Ksh {product.price}</p>
//                 <div className="flex items-center gap-1 text-yellow-500 mb-1">
//                   {[...Array(5)].map((_, i) => (
//                     <FaStar
//                       key={i}
//                       className={i < product.rating ? "" : "text-gray-300"}
//                     />
//                   ))}
//                 </div>
//                 <p className="text-sm text-gray-600">{product.category} | {product.subCategory} </p>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//       {totalPages > 1 && (
//         <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//           >
//             Prev
//           </button>

//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-3 py-1 rounded-full ${
//                 currentPage === i + 1
//                   ? "bg-yellow-500 text-white"
//                   : "bg-gray-100 text-gray-800"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}

//           <button
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Categories;

import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaStar,
  FaRegStar,
  FaHeart,
  FaCartPlus,
  FaSearch,
  FaFilter,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import { Helmet } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css";
import { useCart } from "../context/CartContext";

AOS.init();

// --------------------- Mock Products ---------------------
const mockProducts = [
  {
    _id: "1",
    brand: "Oppo",
    name: "Oppo Reno 10 Pro",
    subCategory: "Smartphones",
    series: "Pro",
    storage: "256GB",
    price: 65000,
    rating: 4.5,
    image: "https://via.placeholder.com/400x400/3b82f6/ffffff?text=Oppo+Reno+10+Pro",
  },
  {
    _id: "2",
    brand: "Oppo",
    name: "Oppo Find N3 Flip",
    subCategory: "Smartphones",
    series: "Max",
    storage: "512GB",
    price: 120000,
    rating: 4.8,
    image: "https://via.placeholder.com/400x400/3b82f6/ffffff?text=Oppo+Find+N3+Flip",
  },
  {
    _id: "6",
    brand: "Oppo",
    name: "Oppo A78",
    subCategory: "Smartphones",
    series: "Lite",
    storage: "128GB",
    price: 30000,
    rating: 4.2,
    image: "https://via.placeholder.com/400x400/3b82f6/ffffff?text=Oppo+A78",
  },
  {
    _id: "4",
    brand: "Oppo",
    name: "Oppo Watch Free",
    subCategory: "Smartwatches",
    series: "N/A",
    storage: "N/A",
    price: 15000,
    rating: 4.0,
    image: "https://via.placeholder.com/400x400/3b82f6/ffffff?text=Oppo+Watch+Free",
  },
  {
    _id: "3",
    brand: "Samsung",
    name: "Galaxy S23 Ultra",
    subCategory: "Smartphones",
    series: "Ultra",
    storage: "512GB",
    price: 145000,
    rating: 4.9,
    image: "https://via.placeholder.com/400x400/3b82f6/ffffff?text=Samsung+S23+Ultra",
  },
  {
    _id: "7",
    brand: "Samsung",
    name: "Galaxy Book Pro 3",
    subCategory: "Laptops",
    series: "Pro",
    storage: "1TB",
    price: 210000,
    rating: 4.7,
    image: "https://via.placeholder.com/400x400/3b82f6/ffffff?text=Samsung+Book+Pro+3",
  },
  {
    _id: "8",
    brand: "Samsung",
    name: "Galaxy Watch 6 Classic",
    subCategory: "Smartwatches",
    series: "Classic",
    storage: "N/A",
    price: 45000,
    rating: 4.6,
    image: "https://via.placeholder.com/400x400/3b82f6/ffffff?text=Samsung+Watch+6",
  },
];

// Filters metadata
const deviceTypeOptions = {
  Oppo: ["Smartphones", "Smartwatches"],
  Samsung: ["Smartphones", "Laptops", "Smartwatches"],
};
const seriesOptions = ["Ultra", "Pro", "Max", "FE", "Lite", "Classic", "N/A"];
const storageOptions = ["64GB", "128GB", "256GB", "512GB", "1TB", "N/A"];

// --------------------- Toast Component ---------------------
const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-xl shadow-2xl 
                  bg-green-600 text-white flex items-center gap-3 transition-opacity duration-300"
      style={{ animation: "fadeInOut 3s ease-in-out forwards" }}
    >
      <FaCheckCircle size={20} />
      <span className="font-semibold">{message}</span>
    </div>
  );
};

// --------------------- Main Component ---------------------
const BrandPage = () => {
  const { categoryName: brandName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDeviceTypes, setSelectedDeviceTypes] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState([]);
  const [selectedStorageSizes, setSelectedStorageSizes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [likedProducts, setLikedProducts] = useState([]);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const productsPerPage = 8;
  const { addToCart } = useCart();

  const handleFilterChange = (setter, value) => {
    setter((prev) => (prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]));
    setCurrentPage(1);
  };

  const showToast = useCallback((message) => setToastMessage(message), []);

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(`${product.name} added to cart!`);
  };

  // Initial load by brand
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      try {
        const brandFiltered = mockProducts.filter((p) => p.brand.toLowerCase() === brandName.toLowerCase());
        setProducts(brandFiltered);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [brandName]);

  // Apply filters logic
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      try {
        let filtered = mockProducts.filter((p) => p.brand.toLowerCase() === brandName.toLowerCase());

        if (selectedDeviceTypes.length) filtered = filtered.filter((p) => selectedDeviceTypes.includes(p.subCategory));
        if (selectedSeries.length) filtered = filtered.filter((p) => selectedSeries.includes(p.series));
        if (selectedStorageSizes.length) filtered = filtered.filter((p) => selectedStorageSizes.includes(p.storage));
        if (searchTerm) {
          const s = searchTerm.toLowerCase();
          filtered = filtered.filter((p) => p.name.toLowerCase().includes(s) || p.subCategory.toLowerCase().includes(s));
        }

        setProducts(filtered);
      } catch {
        setError("Failed to apply filters");
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [brandName, selectedDeviceTypes, selectedSeries, selectedStorageSizes, searchTerm]);

  useEffect(() => {
    AOS.refresh();
  }, [products]);

  const totalPages = Math.max(1, Math.ceil(products.length / productsPerPage));
  const currentProducts = products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const toggleLike = (id) => {
    setLikedProducts((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    const newHeart = { id: Date.now(), productId: id };
    setFloatingHearts((prev) => [...prev, newHeart]);
    setTimeout(() => setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id)), 1200);
  };

  const renderStars = (rating) =>
    Array.from({ length: 5 }).map((_, i) =>
      i < Math.floor(rating) ? <FaStar key={i} className="text-yellow-500" /> : <FaRegStar key={i} className="text-gray-300" />
    );

  const CheckboxFilter = ({ option, state, setter, label }) => (
    <div key={option} className="flex items-center">
      <input id={`filter-${label}-${option}`} type="checkbox" checked={state.includes(option)} onChange={() => handleFilterChange(setter, option)} className="hidden" />
      <label
        htmlFor={`filter-${label}-${option}`}
        className={`flex items-center cursor-pointer select-none text-sm py-1 transition-colors w-full ${
          state.includes(option) ? "text-blue-600 font-bold" : "text-gray-700 hover:text-blue-500"
        }`}
      >
        <div
          className={`w-4 h-4 mr-3 border-2 rounded-sm flex items-center justify-center flex-shrink-0 transition-all ${
            state.includes(option) ? "bg-blue-600 border-blue-600 shadow-sm" : "bg-gray-100 border-gray-300 hover:border-blue-400"
          }`}
        >
          {state.includes(option) && <FaCheckCircle size={10} className="text-white" />}
        </div>
        {option}
      </label>
    </div>
  );

  const currentDeviceTypes = deviceTypeOptions[brandName] || [];

  const SidebarContent = () => (
    <>
      <div className="mb-6">
        <div className="relative">
          <FaSearch className="absolute left-4 top-3 text-blue-500" />
          <input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={`Search ${brandName}...`}
            className="pl-12 pr-3 py-3 w-full border border-gray-300 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 placeholder-gray-400 font-medium shadow-sm"
          />
        </div>
      </div>

      {currentDeviceTypes.length > 0 && (
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h4 className="font-extrabold text-xl mb-3 text-gray-900">Device Type</h4>
          <div className="flex flex-col gap-2">{currentDeviceTypes.map((t) => <CheckboxFilter key={t} option={t} state={selectedDeviceTypes} setter={setSelectedDeviceTypes} label="type" />)}</div>
        </div>
      )}

      <div className="mb-6 border-b border-gray-200 pb-4">
        <h4 className="font-extrabold text-xl mb-3 text-gray-900">Series</h4>
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2">{seriesOptions.map((s) => <CheckboxFilter key={s} option={s} state={selectedSeries} setter={setSelectedSeries} label="series" />)}</div>
      </div>

      <div className="mb-6">
        <h4 className="font-extrabold text-xl mb-3 text-gray-900">Storage</h4>
        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2">{storageOptions.map((sz) => <CheckboxFilter key={sz} option={sz} state={selectedStorageSizes} setter={setSelectedStorageSizes} label="storage" />)}</div>
      </div>
    </>
  );

  return (
    <>
      <Helmet>
        <title>{brandName} Devices | TechHub</title>
      </Helmet>

      {/* Main Page Container (Bright Theme) */}
      <div className="min-h-screen bg-gray-50 text-gray-900 px-4 sm:px-6 lg:px-12 pb-12 font-sans relative mb-[-8rem]">
        <style>{`
          /* Custom CSS for Floating Hearts and Toast */
          @keyframes floatHeart {
            0% { opacity: 1; transform: translate(-50%, 0) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -100px) scale(1.5); }
          }
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, 20px); }
            10% { opacity: 1; transform: translate(-50%, 0); }
            90% { opacity: 1; transform: translate(-50%, 0); }
            100% { opacity: 0; transform: translate(-50%, 20px); }
          }
        `}</style>

        <Toast message={toastMessage} onClose={() => setToastMessage("")} />

        {/* Header Section */}
        <header className="text-center mb-10" data-aos="fade-down">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 italic">{brandName}</span>
            <span className="text-gray-700"> Catalog</span>
          </h1>
          <p className="text-gray-500 font-light text-lg border-b border-blue-200 pb-3 inline-block">
            Explore the full range of devices.
          </p>
        </header>

        {/* Mobile Filter Button */}
        <div className="md:hidden mb-6 flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-md">
          <p className="text-md font-semibold text-gray-600">Found {products.length} Products</p>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full transition duration-200 shadow-lg"
          >
            <FaFilter size={14} /> Filters
          </button>
        </div>

        {/* Desktop/Mobile Layout */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          
          {/* Desktop Sidebar Filter */}
          <aside className="md:w-72 md:sticky md:top-6 h-fit bg-white border border-gray-200 rounded-2xl p-6 shadow-xl hidden md:block" data-aos="fade-right">
            <SidebarContent />
          </aside>

          {/* Mobile Filter Modal */}
          {isFilterOpen && (
            <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm md:hidden">
              <div className="bg-white border border-gray-200 rounded-xl m-4 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Filter Options</h3>
                  <button onClick={() => setIsFilterOpen(false)} className="text-gray-500 hover:text-gray-900 p-2 transition">
                    <FaTimes size={24} />
                  </button>
                </div>
                <SidebarContent />
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition"
                >
                  Show Results
                </button>
              </div>
            </div>
          )}
          
          {/* Products Main Area */}
          <main className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <CircularProgress style={{ color: "#3b82f6" }} />
              </div>
            ) : error ? (
              <div className="text-red-600 bg-white p-6 rounded-xl border border-red-300 text-center font-medium shadow-lg">{error}</div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 text-blue-600 bg-white p-8 rounded-2xl border border-blue-200 font-bold shadow-xl">
                No products found matching the filters for {brandName}. Try adjusting your search.
              </div>
            ) : (
              <>
                {/* Product Grid - Using grid-cols-2 for mobile/small screens */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentProducts.map((p) => (
                    <article
                      key={p._id}
                      className="relative border border-gray-200 rounded-xl p-4 bg-white shadow-lg hover:shadow-blue-200 transition duration-300 transform hover:-translate-y-1"
                      data-aos="fade-up"
                    >
                      {/* Floating Heart Effect */}
                      {floatingHearts
                        .filter((h) => h.productId === p._id)
                        .map((heart) => (
                          <div
                            key={heart.id}
                            className="absolute left-1/2 bottom-1/2 transform -translate-x-1/2 text-pink-500 text-4xl pointer-events-none z-10"
                            style={{ animation: "floatHeart 1.2s ease-out forwards" }}
                          >
                            ❤️
                          </div>
                        ))}

                      {/* Product Image */}
                      <Link to={`/product/${p._id}`}>
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-40 sm:h-48 object-contain mb-3 bg-gray-50 rounded-lg p-2 transition duration-300 hover:scale-[1.03]"
                        />
                      </Link>

                      {/* Product Info */}
                      <h3 className="text-lg sm:text-xl text-blue-600 font-bold truncate mt-2">{p.name}</h3>
                      <p className="text-xs text-gray-500 uppercase font-medium">
                        {p.subCategory}
                        {p.series && p.series !== "N/A" && ` • ${p.series}`}
                        {p.storage && p.storage !== "N/A" && ` | ${p.storage}`}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mt-3 mb-4 text-sm">{renderStars(p.rating)}
                        <span className="text-sm text-yellow-500 font-semibold">({p.rating.toFixed(1)})</span>
                      </div>

                      {/* Price and Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="text-xl sm:text-2xl font-extrabold text-gray-900">Ksh {p.price.toLocaleString()}</div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleLike(p._id)}
                            className={`p-2 sm:p-3 rounded-full transition duration-200 border ${
                              likedProducts.includes(p._id)
                                ? "text-red-500 border-red-500 bg-red-50 hover:bg-red-100"
                                : "text-gray-500 border-gray-300 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                            title="Add to Wishlist"
                          >
                            <FaHeart size={16} />
                          </button>
                          <button
                            onClick={() => handleAddToCart(p)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-1 sm:gap-2 font-semibold transition duration-200 shadow-md shadow-blue-500/30"
                            title="Add to Cart"
                          >
                            <FaCartPlus size={16} /> <span className="hidden sm:inline">Add</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10 flex justify-center gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="px-4 py-2 border border-blue-600 rounded-lg text-blue-600 disabled:border-gray-300 disabled:text-gray-400 hover:bg-blue-50 transition font-semibold"
                    >
                      Prev
                    </button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 border rounded-lg transition font-semibold ${
                          currentPage === i + 1
                            ? "bg-blue-600 text-white border-blue-600 shadow-md"
                            : "bg-white text-blue-600 border-blue-300 hover:bg-blue-100"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="px-4 py-2 border border-blue-600 rounded-lg text-blue-600 disabled:border-gray-300 disabled:text-gray-400 hover:bg-blue-50 transition font-semibold"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default BrandPage;