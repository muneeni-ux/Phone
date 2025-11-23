import React, { useState, useEffect } from "react";
import {
  FaHeart,
  FaCartPlus,
  FaSearch,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Helmet } from "react-helmet-async";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

AOS.init();

function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [likedProducts, setLikedProducts] = useState([]);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const itemsPerPage = 6;
  const { addToCart } = useCart();

  useEffect(() => {
    AOS.refresh();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams();

        if (searchTerm) params.append("search", searchTerm);
        if (selectedCategories.length)
          selectedCategories.forEach((c) => params.append("category", c));
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (sortOption) params.append("sort", sortOption);

        const res = await fetch(
          `${SERVER_URL}/api/products?${params.toString()}`
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products.");
        console.error("Error fetching products:", err);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [searchTerm, selectedCategories, maxPrice, sortOption]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  const filteredProducts = products;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleLike = async (productId) => {
    console.log("🔁 toggleLike called for product:", productId);

    try {
      const response = await fetch(
        `${SERVER_URL}/api/products/like/${productId}`,
        {
          method: "POST",
        }
      );

      console.log("📡 Server response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("📥 Server response data:", data);

        if (data.success) {
          const newHeart = { id: Date.now(), productId };

          // Update product likes in state
          setProducts((prev) =>
            prev.map((product) =>
              product._id === productId
                ? { ...product, likes: data.likes }
                : product
            )
          );

          // Trigger heart animation
          setFloatingHearts((prev) => [...prev, newHeart]);

          // Track liked products
          setLikedProducts((prev) =>
            prev.includes(productId) ? prev : [...prev, productId]
          );

          // Remove floating heart after animation
          setTimeout(() => {
            setFloatingHearts((prev) =>
              prev.filter((h) => h.id !== newHeart.id)
            );
          }, 1200);
        } else {
          console.warn("❗ Like action was not successful:", data);
        }
      } else {
        console.error("❌ Server responded with error:", response.statusText);
      }
    } catch (error) {
      console.error("❗ Failed to like product:", error);
    }
  };

  const categories = [
    "Men's Clothing",
    "Women's Clothing",
    "Kids' Clothing",
    "Shoes",
    "Bags & Accessories",
    "Clearance Sale",
  ];

  const tags = ["New Arrival", "Bestseller", "Featured"];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-yellow-300" />
        )
      );
    }
    return stars;
  };

  return (
    <>
      <Helmet>
        <title>Shop Stylish Clothing Online | Pak Fashions Kenya</title>
        <meta
          name="description"
          content="Browse and shop elegant men's, women's and kids' clothing, shoes, bags and accessories at unbeatable prices. Fast delivery in Kenya."
        />
        <meta
          name="keywords"
          content="shop clothes Kenya, affordable fashion, men's wear, women's dresses, Nanyuki, kids wear, bags, accessories"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Shop Online | Pak Fashions" />
        <meta
          property="og:description"
          content="Discover Pak Fashions collection of trendy, quality, and affordable clothing. Fast local delivery."
        />
        <meta
          property="og:image"
          content="https://pakfashions.co.ke/PakFashions-logo.jpg"
        />
        <meta property="og:url" content="https://pakfashions.co.ke/shop" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pak Fashions | Online Shop" />
        <meta
          name="twitter:description"
          content="Affordable and elegant fashion for all. Based in Nanyuki, Laikipia."
        />
        <meta
          name="twitter:image"
          content="https://pakfashions.co.ke/PakFashions-logo.jpg"
        />
      </Helmet>
      <div className="bg-white min-h-screen px-6 py-12 sm:px-12 lg:px-20 mt-12 font-sans text-black">
        {/* Hero */}
        <header className="text-center mb-12" data-aos="fade-down">
          <h1 className="text-5xl font-extrabold tracking-tight mb-3 text-black">
            Shop Our Collection
          </h1>
          <p className="text-yellow-700 font-medium text-lg">
            Discover stylish pieces made with love and tradition.
          </p>
          <div className="h-1 w-28 bg-yellow-500 rounded-full mx-auto mt-4"></div>
        </header>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Filters Sidebar */}
          <aside className="md:w-1/4 w-full bg-yellow-50 p-8 rounded-2xl shadow border border-yellow-200 md:sticky top-24 self-start text-black">
            <div className="space-y-10">
              {/* Search */}
              <div>
                <h2 className="text-2xl font-semibold mb-5">Search Products</h2>
                <div className="relative">
                  <FaSearch className="absolute left-4 top-3.5 text-yellow-600" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-12 pr-4 py-3 border border-yellow-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-xl font-semibold mb-5">Categories</h3>
                <div className="flex flex-col space-y-4 max-h-52 overflow-auto pr-2">
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      className="inline-flex items-center space-x-3 text-black cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryChange(cat)}
                        className="form-checkbox h-5 w-5 text-yellow-600"
                      />
                      <span className="text-lg">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Max Price */}
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Max Price:{" "}
                  <span className="text-yellow-600 font-bold">
                    Ksh {maxPrice}
                  </span>
                </h3>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full accent-yellow-600"
                />
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-xl font-semibold mb-5">Popular Tags</h3>
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col">
            {/* Sort */}
            <div
              className="flex justify-between items-center mb-8"
              data-aos="fade-left"
            >
              <div className="text-lg font-semibold">
                {filteredProducts.length} Products Found
              </div>
              <select
                className="border border-yellow-400 p-3 rounded-md text-black focus:ring-2 focus:ring-yellow-500"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
                <option value="rated">Best Rated</option>
              </select>
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <CircularProgress style={{ color: "black" }} />{" "}
              </div>
            ) : error ? (
              <p className="text-center text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-md w-fit mx-auto font-semibold mb-6">
                {error}
              </p>
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
                data-aos="fade-up"
              >
                {paginatedProducts.length === 0 && (
                  <p className="text-center text-yellow-600 col-span-full">
                    No products match your filters.
                  </p>
                )}
                {paginatedProducts.map((product) => (
                  <article
                    key={product._id}
                    className="bg-white border border-yellow-100 rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden group cursor-pointer"
                    data-aos="zoom-in"
                  >
                    <div className="relative">
                      {/* Floating hearts */}
                      {floatingHearts
                        .filter((h) => h.productId === product._id)
                        .map((heart) => (
                          <div
                            key={heart.id}
                            className="absolute left-1/2 top-80 transform -translate-x-1/2 -translate-y-1/2 text-pink-500 text-3xl pointer-events-none z-10"
                            style={{
                              animation: "floatHeart 1.2s ease-out forwards",
                            }}
                            // style={{
                            //   animation: likedProducts.includes(product._id)
                            //     ? "pop 0.3s ease-in-out"
                            //     : "none",
                            // }}
                          >
                            ❤️❤️
                          </div>
                        ))}
                      <Link to={`/product/${product._id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      <span className="absolute top-3 left-3 bg-yellow-600 text-white text-xs px-3 py-1 rounded-full shadow font-medium">
                        {product.tag}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col justify-between h-56">
                      <div>
                        <h3 className="font-semibold text-xl mb-2 truncate">
                          {product.name}
                        </h3>
                        <div className="flex items-center space-x-2 mb-2">
                          {renderStars(product.rating)}
                          <span className="text-sm text-yellow-600 font-medium">
                            ({product.rating})
                          </span>
                        </div>
                        <p className="text-lg font-bold text-black">
                          Ksh {product.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-between items-center gap-4">
                        <button
                          onClick={() => toggleLike(product._id)}
                          className={`p-2 rounded-full hover:bg-yellow-200 hover:text-red-600 ${
                            likedProducts.includes(product._id)
                              ? "text-red-600 bg-yellow-100"
                              : "text-yellow-500"
                          }`}
                        >
                          <FaHeart size={20} />
                        </button>
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-full font-semibold flex items-center gap-2 w-full justify-center transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FaCartPlus /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
            {/* Pagination */}
            <nav
              className="mt-12 flex justify-center items-center space-x-3"
              aria-label="Pagination"
              data-aos="fade-up"
            >
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-full border border-yellow-500 text-yellow-600 disabled:text-yellow-300 disabled:border-yellow-200 hover:bg-yellow-100"
              >
                &lt;
              </button>
              {[...Array(totalPages).keys()].map((page) => (
                <button
                  key={page + 1}
                  onClick={() => setCurrentPage(page + 1)}
                  className={`px-4 py-2 rounded-full border text-yellow-600 border-yellow-500 hover:bg-yellow-200 ${
                    currentPage === page + 1
                      ? "bg-yellow-600 text-white font-semibold"
                      : "bg-white"
                  }`}
                >
                  {page + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-full border border-yellow-500 text-yellow-600 disabled:text-yellow-300 disabled:border-yellow-200 hover:bg-yellow-100"
              >
                &gt;
              </button>
            </nav>
          </main>
        </div>
      </div>
    </>
  );
}

export default Shop;

// import React, { useState, useEffect } from "react";
// import { FaHeart, FaCartPlus, FaSearch } from "react-icons/fa";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import axios from "axios";
// import CircularProgress from "@mui/material/CircularProgress";

// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// AOS.init();

// function Shop() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [maxPrice, setMaxPrice] = useState(5000);
//   const [sortOption, setSortOption] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [likedProducts, setLikedProducts] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const itemsPerPage = 6;
//   const { addToCart } = useCart();

//   // Fetch products from backend
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const queryParams = new URLSearchParams({
//           search: searchTerm,
//           maxPrice: maxPrice,
//           sort: sortOption,
//         });

//         // Add selected category filters
//         if (selectedCategories.length === 1) {
//           queryParams.append("category", selectedCategories[0]);
//         }

//         const res = await axios.get(
//           `${SERVER_URL}/api/products?${queryParams}`
//         );
//         setProducts(res.data);
//       } catch (err) {
//         setError("Failed to load products.");
//       }

//       setLoading(false);
//     };

//     fetchProducts();
//   }, [searchTerm, selectedCategories, maxPrice, sortOption]);

//   const totalPages = Math.ceil(products.length / itemsPerPage);
//   const paginatedProducts = products.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleCategoryChange = (category) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category)
//         ? prev.filter((c) => c !== category)
//         : [...prev, category]
//     );
//   };

//   const toggleLike = (productId) => {
//     setLikedProducts((prev) =>
//       prev.includes(productId)
//         ? prev.filter((id) => id !== productId)
//         : [...prev, productId]
//     );
//   };

//   return (
//     <div className="bg-blue-50 text-blue-900 min-h-screen px-4 sm:px-6 py-10 mt-12 md:mt-6">
//       <div className="text-center mb-10" data-aos="fade-down">
//         <h1 className="text-4xl font-bold mb-3">Shop Our Collection</h1>
//         <p className="text-lg max-w-2xl mx-auto text-blue-800">
//           Discover handcrafted jewelry made with love and tradition.
//         </p>
//       </div>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Filters Sidebar */}
//         <aside className="md:w-1/4" data-aos="fade-right">
//           <div className="bg-white p-6 rounded-lg shadow space-y-6">
//             <div>
//               <h2 className="text-xl font-semibold mb-2">Search</h2>
//               <div className="relative">
//                 <FaSearch className="absolute left-3 top-3 text-blue-400" />
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div>
//               <h3 className="font-bold mb-2">Category</h3>
//               {[
//                 "Home & living",
//                 "Decor",
//                 "Fashion",
//                 "Accessories",
//                 "Art & collectibles",
//               ].map((cat) => (
//                 <div key={cat}>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       checked={selectedCategories.includes(cat)}
//                       onChange={() => handleCategoryChange(cat)}
//                     />
//                     {cat}
//                   </label>
//                 </div>
//               ))}
//             </div>

//             <div>
//               <h3 className="font-bold mb-2">Max Price</h3>
//               <input
//                 type="range"
//                 min="10"
//                 max="5000"
//                 value={maxPrice}
//                 onChange={(e) => setMaxPrice(e.target.value)}
//                 className="w-full"
//               />
//               <p className="text-sm text-blue-700 mt-1">Ksh {maxPrice}</p>
//             </div>

//             <div>
//               <h3 className="font-bold mb-2">Tags</h3>
//               <div className="flex flex-wrap gap-2">
//                 {["New Arrival", "Bestseller", "Featured"].map((tag) => (
//                   <span
//                     key={tag}
//                     className="bg-blue-200 px-2 py-1 rounded-full text-sm"
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <div className="flex-1">
//           {/* Sort */}
//           <div className="flex justify-end mb-6" data-aos="fade-left">
//             <select
//               className="border border-blue-300 p-2 rounded"
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//             >
//               <option value="">Sort by</option>
//               <option value="price-low">Price: Low to High</option>
//               <option value="price-high">Price: High to Low</option>
//               <option value="newest">Newest</option>
//               <option value="rated">Best Rated</option>
//             </select>
//           </div>

//           {/* Products Grid */}
//           {loading ? (
//             <div className="flex justify-center items-center py-20">
//               <CircularProgress style={{ color: "#D97706" }} />{" "}
//               {/* Tailwind blue-600 */}
//             </div>
//           ) : error ? (
//             <p className="text-center text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-md w-fit mx-auto font-semibold mb-6">
//               {error}
//             </p>
//           ) : (
//             <div
//               className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
//               // data-aos="fade-up"
//             >
//               {paginatedProducts.map((product) => (
//                 <div
//                   key={product._id}
//                   className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition relative"
//                 >
//                   <Link to={`/product/${product._id}`}>
//                     <img
//                       src={product._image}
//                       alt={product.name}
//                       className="w-full h-64 object-cover rounded-lg mb-4"
//                     />
//                   </Link>
//                   <span className="absolute top-4 left-4 bg-blue-500 text-white px-2 py-1 text-xs rounded-full">
//                     {product.tag}
//                   </span>
//                   <h3 className="font-semibold text-lg">{product.name}</h3>
//                   <p className="text-blue-700 font-bold mb-3">
//                     Ksh {product.price}
//                   </p>
//                   <div className="flex gap-3">
//                     <button
//                       className="flex-1 bg-blue-900 text-white py-2 rounded hover:bg-blue-800"
//                       onClick={() => addToCart(product)}
//                     >
//                       <FaCartPlus className="inline mr-2" /> Add to Cart
//                     </button>
//                     <button
//                       onClick={() => toggleLike(product._id)}
//                       className={`p-2 rounded border ${
//                         likedProducts.includes(product._id)
//                           ? "bg-red-100 border-red-500 text-red-500"
//                           : "bg-white border-blue-900 text-blue-900 hover:bg-blue-100"
//                       }`}
//                     >
//                       <FaHeart />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Pagination */}
//           <div className="flex justify-center items-center space-x-4">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((p) => p - 1)}
//               className="px-4 py-2 bg-blue-900 text-white rounded disabled:opacity-50"
//             >
//               Prev
//             </button>
//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 className={`px-3 py-1 rounded-full text-sm font-medium ${
//                   currentPage === i + 1
//                     ? "bg-blue-500 text-white"
//                     : "bg-blue-100"
//                 }`}
//                 onClick={() => setCurrentPage(i + 1)}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage((p) => p + 1)}
//               className="px-4 py-2 bg-blue-900 text-white rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Shop;
