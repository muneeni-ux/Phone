// import React, { useState } from "react";
// import { X } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// function SearchModal({ onClose }) {
//   const [query, setQuery] = useState("");
//   const navigate = useNavigate();

//   // Handle search when Enter key is pressed
//   const handleSearch = (e) => {
//     if (e.key === "Enter" && query.trim()) {
//       // Redirect to the search results page
//       navigate(`/search?q=${query.trim()}`);
//       onClose(); // Close the modal
//     }
//   };

//   return (
//     <div className="absolute left-0 top-16 w-full bg-white shadow z-50 px-4 py-4">
//       <div className="max-w-3xl mx-auto relative">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-black"
//         >
//           <X size={20} />
//         </button>

//         {/* Search Input */}
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)} // Update query as user types
//           onKeyDown={handleSearch} // Trigger search on Enter key press
//           placeholder="Search products..."
//           autoFocus
//           className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//         />
//       </div>
//     </div>
//   );
// }

// export default SearchModal;

// components/SearchModal.jsx
import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);

    try {
      const res = await axios.get(
        `${SERVER_URL}/api/products/search?query=${query}`
      );
      setResults(res.data);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-16 z-50">
      <div className="bg-white w-full max-w-xl max-h-[80vh] mx-4 p-6 rounded-xl shadow-lg relative overflow-hidden">
        <button
          className="absolute top-1 right-1 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <form onSubmit={handleSearch} className="flex mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            className="flex-grow border border-yellow-400 px-4 py-2 rounded-l-full focus:outline-none"
          />
          <button
            type="submit"
            className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-r-full hover:bg-green-600"
          >
            Search
          </button>
        </form>

        {/* Scrollable Results Container */}
        <div className="overflow-y-auto max-h-[60vh] pr-2">
          {loading ? (
            // <p className="text-center text-green-700">Searching...</p>
            <div className="flex justify-center items-center space-x-2 text-green-700">
              <svg
                className="animate-spin h-5 w-5 text-green-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span className="text-sm font-medium animate-pulse">
                Searching...
              </span>
            </div>
          ) : results.length > 0 ? (
            <ul className="space-y-3">
              {results.map((product) => (
                <li key={product._id} className="border-b pb-2">
                  <Link
                    to={`/product/${product._id}`}
                    onClick={onClose}
                    className="flex items-center space-x-4 hover:bg-green-50 p-2 rounded-lg"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="text-sm font-semibold text-green-800">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.category}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            query && (
              <p className="text-center text-gray-500">No results found.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
