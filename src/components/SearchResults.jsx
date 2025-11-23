// src/pages/SearchResults.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import productsData from "../data/productsData"; // You should replace this with real data or props

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q")?.toLowerCase() || "";

  // Simulate product filtering
  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  return (
    <div className="max-w-7xl mx-auto pt-24 px-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">
        Search Results for "{query}"
      </h2>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-800">
                  {product.name}
                </h3>
                <p className="text-blue-600 font-semibold">Ksh {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
}

export default SearchResults;
