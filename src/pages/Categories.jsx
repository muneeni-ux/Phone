import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import CircularProgress from "@mui/material/CircularProgress";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Categories = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subCategory, setSubCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const subCategoryOptions = {
    "Men's Clothing": [
      "All",
      "Suits",
      "Blazers",
      "Tops",
      "Bottoms",
      "Jackets & Coats",
    ],
    "Women's Clothing": [
      "All",
      "Dresses",
      "Tops",
      "Bottoms",
      "Jackets & Coats",
    ],
    "Kids' Clothing": ["All", "Tops", "Bottoms"],
    Shoes: ["All"],
    "Bags & Accessories": ["All"],
    "Clearance Sale": ["All"],
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const subQuery =
          subCategory !== "All"
            ? `&subCategory=${encodeURIComponent(subCategory)}`
            : "";
        const res = await axios.get(
          `${SERVER_URL}/api/products?category=${encodeURIComponent(
            categoryName
          )}${subQuery}`
        );
        setProducts(res.data);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName, subCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryName, subCategory]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="min-h-screen px-6 py-20 mt-12 bg-white text-black">
      <Helmet>
        <title>{categoryName} | Shop by Category - Pak Fashions</title>
        <meta
          name="description"
          content={`Explore premium fashion products under the ${categoryName} category at Pak Fashions. Stylish, affordable, and high-quality pieces.`}
        />
        <meta
          name="keywords"
          content={`fashion, ${categoryName}, clothing, style, Pak Fashions, shop category`}
        />
        <meta name="author" content="Pak Fashions" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={`${categoryName} | Pak Fashions`} />
        <meta
          property="og:description"
          content={`Discover top ${categoryName} picks curated by Pak Fashions. Quality fashion for all tastes.`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://pakfashions.co.ke/category/${categoryName}`}
        />
        <meta
          property="og:image"
          content="https://pakfashions.co.ke/pak-fashion.jpg"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${categoryName} | Pak Fashions`} />
        <meta
          name="twitter:description"
          content={`Explore top-rated ${categoryName} items at Pak Fashions. Clothing & fashion redefined.`}
        />
        <meta
          name="twitter:image"
          content="https://pakfashions.co.ke/pak-circle.png"
        />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-10 text-center">
          <span className="bg-yellow-400 px-4 py-1 rounded-xl text-black shadow">
            {categoryName}
          </span>
        </h1>
        {/* Subcategory Filter Buttons */}
        {(subCategoryOptions[categoryName] || []).length > 1 && (
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {subCategoryOptions[categoryName].map((sub) => (
              <button
                key={sub}
                onClick={() => setSubCategory(sub)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                  subCategory === sub
                    ? "bg-yellow-400 text-black border-yellow-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-50"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <CircularProgress style={{ color: "black" }} />
          </div>
        ) : error ? (
          <p className="text-center text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-md w-fit mx-auto font-semibold mb-6">
            {error}
          </p>
        ) : products.length === 0 ? (
          <p className="text-center text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-md w-fit mx-auto font-semibold mb-6">
            No products found in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {currentProducts.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="group bg-yellow-50 rounded-2xl p-5 shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 border border-yellow-200"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-xl mb-4 group-hover:opacity-90 transition duration-300"
                />
                <h2 className="text-xl font-bold text-black group-hover:underline">
                  {product.name}
                </h2>
                <p className="text-gray-700 mb-2">Ksh {product.price}</p>
                <div className="flex items-center gap-1 text-yellow-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < product.rating ? "" : "text-gray-300"}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">{product.category} | {product.subCategory} </p>
              </Link>
            ))}
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-full ${
                currentPage === i + 1
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Categories;
