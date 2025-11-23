import React, { useState, useEffect } from "react";
import { FaHeart, FaStar, FaCartPlus } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import CircularProgress from "@mui/material/CircularProgress";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ProductDetails = () => {
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/products/${id}`);
        setProduct(res.data);
        setLoading(false);

        // Fetch related products after main product is loaded
        fetchRelatedProducts(res.data.category, res.data._id);
      } catch (err) {
        console.error("Failed to fetch product", err);
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async (category, currentId) => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/products`);
        const filtered = res.data.filter(
          (p) => p.category === category && p._id !== currentId
        );
        setRelatedProducts(filtered);
        setRelatedLoading(false);
      } catch (err) {
        console.error("Failed to fetch related products", err);
        setRelatedLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const toggleLike = async (productId) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/api/products/like/${productId}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      if (data.success) {
        // Update likes in product object
        setProduct((prev) => ({ ...prev, likes: data.likes }));

        // Show floating heart
        const newHeart = { id: Date.now(), productId };
        setFloatingHearts((prev) => [...prev, newHeart]);
        console.log("Heart triggered for", productId);

        // Remove heart after animation
        setTimeout(() => {
          setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
        }, 1200);

        // Toggle liked state
        setLiked(true); // Optional to prevent spamming
      }
    } catch (error) {
      console.error("Failed to like product:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <CircularProgress style={{ color: "black" }} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-red-500 font-semibold">
        Product not found.
      </div>
    );
  }

  return (
    <>
      {product && (
        <Helmet>
          <title>{`${product.name} | Pak Fashions`}</title>
          <meta
            name="description"
            content={
              product.description?.slice(0, 160) ||
              "Elegant fashion from Pak Fashions"
            }
          />
          <meta
            name="keywords"
            content={`fashion, ${product.category}, ${product.name}, pak fashions`}
          />
          <meta name="robots" content="index, follow" />

          {/* Open Graph */}
          <meta property="og:title" content={product.name} />
          <meta
            property="og:description"
            content={product.description?.slice(0, 160)}
          />
          <meta property="og:image" content={product.image} />
          <meta
            property="og:url"
            content={`https://pakfashions.co.ke/product/${product._id}`}
          />
          <meta property="og:type" content="product" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={`${product.name} | Pak Fashions`}
          />
          <meta
            name="twitter:description"
            content={product.description?.slice(0, 160)}
          />
          <meta name="twitter:image" content={product.image} />

          {/* Structured Data (JSON-LD) */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: product.name,
              image: [product.image],
              description: product.description,
              sku: product._id,
              offers: {
                "@type": "Offer",
                priceCurrency: "KES",
                price: product.price,
                availability: product.inStock ? "InStock" : "OutOfStock",
                url: `https://pakfashions.co.ke/product/${product._id}`,
              },
              brand: {
                "@type": "Brand",
                name: "Pak Fashions",
              },
            })}
          </script>
        </Helmet>
      )}

      {/* Product Section */}
      <section className="bg-white text-black px-6 py-16 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center bg-yellow-50 shadow-2xl rounded-3xl p-8 md:p-14">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-xl shadow-xl">
            {/* Floating hearts */}
            {floatingHearts
              .filter((h) => h.productId === product._id)
              .map((heart) => (
                <div
                  key={heart.id}
                  className="absolute left-1/2 top-80 transform -translate-x-1/2 -translate-y-1/2 text-pink-500 text-6xl pointer-events-none "
                  style={{
                    animation: "floatHeart 1.2s ease-out forwards",
                  }}
                >
                  ❤️
                </div>
              ))}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-black">
              {product.name}
            </h1>

            <div className="flex items-center gap-4">
              <p className="text-2xl font-bold text-green-600">
                Ksh {product.price.toLocaleString()}
              </p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  product.inStock
                    ? "bg-green-100 text-green-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-lg ${
                    i < product.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-500 ml-2">
                {product.rating} / 5
              </span>
            </div>
            <p className="inline-block text-sm font-semibold text-green-800 bg-green-100 rounded-full px-4 py-1 shadow-sm border border-green-200">
              Size:{" "}
              <span className="ml-1 text-black font-semibold">
                {product.size}
              </span>
            </p>

            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => toggleLike(product._id)}
                title={liked ? "Unlike" : "Like"}
                className={`rounded-full p-3 h-14 w-14 text-lg border-2 transition-all duration-300 flex justify-center items-center hover:bg-red-100 hover:border-red-500 hover:text-red-500 hover:animate-pulse ${
                  liked
                    ? "bg-red-100 border-red-500 text-red-500 animate-pulse"
                    : "bg-white border-gray-400 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FaHeart />
              </button>

              <button
                onClick={() => addToCart(product)}
                disabled={!product.inStock}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300 ${
                  product.inStock
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <FaCartPlus />
                Add to Cart
              </button>
            </div>

            <Link
              to="/shop"
              className="block text-sm text-blue-700 hover:underline mt-6"
            >
              ← Back to Shop
            </Link>
          </div>
        </div>
      </section>
      {/* Related Products */}
      <div className="mt-14">
        <h3 className="text-xl font-semibold mb-4 text-blue-800 text-center">
          You might also like
        </h3>
        {relatedLoading ? (
          <div className="flex justify-center py-10">
            <CircularProgress style={{ color: "#D97706" }} />
          </div>
        ) : relatedProducts.length === 0 ? (
          <p className="text-gray-500 text-center font-medium">
            No related products found.
          </p>
        ) : (
          <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-thin scrollbar-thumb-blue-500">
            {relatedProducts.map((p) => (
              <Link
                to={`/product/${p._id}`}
                key={p._id}
                className="min-w-[200px] bg-white border rounded-lg shadow hover:shadow-lg transition p-4"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-48 w-full object-cover rounded mb-2"
                />
                <h4 className="text-md font-semibold font-medium text-black truncate">
                  {p.name}
                </h4>
                <p className="text-sm text-green-600 font-semibold">
                  Ksh {p.price}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;

// // Add a "You might also like" section at the bottom with related products.

// // Persist likes to localStorage or backend for logged-in users.
// import React, { useState, useEffect } from "react";
// import { FaHeart, FaStar, FaCartPlus } from "react-icons/fa";
// import { useParams, Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import axios from "axios";
// import CircularProgress from "@mui/material/CircularProgress";

// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [relatedLoading, setRelatedLoading] = useState(true);
//   const [liked, setLiked] = useState(false);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`${SERVER_URL}/api/products/${id}`);
//         setProduct(res.data);
//         setLoading(false);

//         // Fetch related products after main product is loaded
//         fetchRelatedProducts(res.data.category, res.data._id);
//       } catch (err) {
//         console.error("Failed to fetch product", err);
//         setLoading(false);
//       }
//     };

//     const fetchRelatedProducts = async (category, currentId) => {
//       try {
//         const res = await axios.get(`${SERVER_URL}/api/products`);
//         const filtered = res.data.filter(
//           (p) => p.category === category && p._id !== currentId
//         );
//         setRelatedProducts(filtered);
//         setRelatedLoading(false);
//       } catch (err) {
//         console.error("Failed to fetch related products", err);
//         setRelatedLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const toggleLike = () => setLiked((prev) => !prev);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-20">
//         <CircularProgress style={{ color: "#D97706" }} />
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="text-center py-20 text-red-500 font-semibold">
//         Product not found.
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10 mt-10 bg-white shadow-lg rounded-lg">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row gap-10">
//         {/* Image */}
//         <div className="flex-1">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 object-cover"
//           />
//         </div>

//         {/* Info */}
//         <div className="flex-1 space-y-4">
//           <h2 className="text-3xl font-bold text-blue-900">{product.name}</h2>
//           <p className="text-2xl font-semibold text-blue-700">
//             Ksh {product.price}
//           </p>

//           {/* Rating */}
//           <div className="flex items-center gap-1 text-yellow-500">
//             {[...Array(5)].map((_, i) => (
//               <FaStar
//                 key={i}
//                 className={i < product.rating ? "text-yellow-400" : "text-gray-300"}
//               />
//             ))}
//             <span className="ml-2 text-sm text-gray-600">
//               ({product.rating} / 5)
//             </span>
//           </div>

//           {/* Description */}
//           <p className="text-gray-700 leading-relaxed">{product.description}</p>

//           {/* Actions */}
//           <div className="flex items-center gap-4 mt-6">
//             <button
//               onClick={toggleLike}
//               className={`p-3 rounded-full border-2 transition-all ${
//                 liked
//                   ? "bg-red-100 border-red-500 text-red-500"
//                   : "bg-white border-blue-900 text-blue-900 hover:bg-blue-100"
//               }`}
//               title={liked ? "Unlike" : "Like"}
//             >
//               <FaHeart />
//             </button>

//             <button
//               className="flex items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
//               onClick={() => addToCart(product)}
//             >
//               <FaCartPlus />
//               Add to Cart
//             </button>
//           </div>

//           {/* Back Link */}
//           <Link
//             to="/shop"
//             className="inline-block mt-8 text-sm text-blue-600 hover:underline"
//           >
//             ← Back to Shop
//           </Link>
//         </div>
//       </div>

//       {/* Related Products */}
//       <div className="mt-14">
//         <h3 className="text-xl font-semibold mb-4 text-blue-800">
//           You might also like
//         </h3>
//         {relatedLoading ? (
//           <div className="flex justify-center py-10">
//             <CircularProgress style={{ color: "#D97706" }} />
//           </div>
//         ) : relatedProducts.length === 0 ? (
//           <p className="text-gray-500">No related products found.</p>
//         ) : (
//           <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-thin scrollbar-thumb-blue-500">
//             {relatedProducts.map((p) => (
//               <Link
//                 to={`/product/${p._id}`}
//                 key={p._id}
//                 className="min-w-[200px] bg-white border rounded-lg shadow hover:shadow-lg transition p-4"
//               >
//                 <img
//                   src={p.image}
//                   alt={p.name}
//                   className="h-48 w-full object-cover rounded mb-2"
//                 />
//                 <h4 className="text-md font-semibold">{p.name}</h4>
//                 <p className="text-blue-700 font-bold">Ksh {p.price}</p>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;
