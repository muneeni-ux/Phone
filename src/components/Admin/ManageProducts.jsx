import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Trash2, PencilLine } from "lucide-react";
import { toast } from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const categories = [
  "Men's Clothing",
  "Women's Clothing",
  "Kids' Clothing",
  "Shoes",
  "Bags & Accessories",
  "Clearance Sale",
];
const subCategoryOptions = {
  "Men's Clothing": [
    "All",
    "Suits",
    "Blazers",
    "Tops",
    "Bottoms",
    "Jackets & Coats",
  ],
  "Women's Clothing": ["All", "Dresses", "Tops", "Bottoms", "Jackets & Coats"],
  "Kids' Clothing": ["All", "Tops", "Bottoms"],
  Shoes: ["All"],
  "Bags & Accessories": ["All"],
  "Clearance Sale": ["All"],
};

const tags = ["New Arrival", "Bestseller", "Featured"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const PAGE_SIZE = 6;

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: categories[0],
    subCategory: "All",
    tag: tags[0],
    size: "",
    image: "",
    rating: 0,
    likes: 0,
    inStock: true,
  });

  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterSubCategory, setFilterSubCategory] = useState("All");
  const [filterTag, setFilterTag] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${SERVER_URL}/api/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      toast.error("Failed to fetch products.");
    }
    setLoading(false);
  };

  const applyFilters = useCallback(() => {
    let filtered = [...products];
    if (searchTerm.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterCategory)
      filtered = filtered.filter((p) => p.category === filterCategory);
    if (filterSubCategory && filterSubCategory !== "All") {
      filtered = filtered.filter((p) => p.subCategory === filterSubCategory);
    }
    if (filterTag) filtered = filtered.filter((p) => p.tag === filterTag);
    setFilteredProducts(filtered);
  }, [products, searchTerm, filterCategory, filterTag, filterSubCategory]);

  useEffect(() => {
    applyFilters();
    setCurrentPage(1);
  }, [applyFilters]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === "category") {
        return {
          ...prev,
          category: value,
          subCategory: subCategoryOptions[value]?.[0] || "All", // Reset subCategory
        };
      }

      return {
        ...prev,
        [name]:
          name === "rating"
            ? Math.min(Math.max(Number(value), 0), 5)
            : name === "likes"
            ? Math.max(Number(value), 0)
            : value,
      };
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imgFormData = new FormData();
    imgFormData.append("image", file);

    try {
      setLoading(true);
      const res = await fetch(`${SERVER_URL}/api/upload/image`, {
        method: "POST",
        body: imgFormData,
      });
      const data = await res.json();
      if (data.success) {
        setPreview(data.imageUrl);
        setFormData((prev) => ({ ...prev, image: data.imageUrl }));
      } else  toast.error("Image upload failed.");
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Error uploading image.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.image ||
      !formData.name.trim() ||
      !formData.price ||
      formData.price <= 0
    )
      return toast.error("Please fill in all required fields");
    try {
      setLoading(true);
      if (editId) {
        await axios.put(`${SERVER_URL}/api/products/${editId}`, formData);

        toast.success("✅ Product updated!");
      } else {
        await axios.post(`${SERVER_URL}/api/products`, formData);

        toast.success("✅ Product created!");
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);

      toast.error("❌ Error saving product");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      category: categories[0],
      tag: tags[0],
      size: "",
      image: "",
      rating: 0,
      likes: 0,
    });
    setPreview(null);
    setEditId(null);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name || "",
      price: product.price || "",
      description: product.description || "",
      category: product.category || categories[0],
      subCategory: product.subCategory || "All",
      tag: product.tag || tags[0],
      size: product.size || "",
      image: product.image || "",
      rating: product.rating || 0,
      likes: product.likes || 0,
      inStock: product.inStock ?? true,
    });
    setPreview(product.image);
    setEditId(product._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      setLoading(true);
      await axios.delete(`${SERVER_URL}/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">
        🛠 Manage Products
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1">Product Name *</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Price (ksh) *</label>
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter price"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter description"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Subcategory *</label>
            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            >
              {subCategoryOptions[formData.category]?.map((subCat) => (
                <option key={subCat} value={subCat}>
                  {subCat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Tag *</label>
            <select
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            >
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Size *</label>
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full p-3 mb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select Size</option>
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Or enter custom size (e.g. 39, 42)"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Rating (0-5)</label>
            <input
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Likes</label>
            <input
              name="likes"
              type="number"
              min="0"
              value={formData.likes}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div className="flex justify-between md:gap-40">
            <div className="stock">
              <label className="block font-semibold mb-1">In Stock *</label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      inStock: e.target.checked,
                    }))
                  }
                  className="form-checkbox h-5 w-5 text-green-600"
                />
                <span className="ml-2 text-gray-700">Available</span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold mb-1">
                Product Image *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Product Preview"
                  className="mt-3 max-h-48 object-contain rounded-lg border"
                />
              )}
            </div>
          </div>
          <div></div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
            >
              Cancel Edit
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50"
          >
            {editId ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>

      {/* Filters & Search */}
      <div className="max-w-7xl mx-auto mb-6 px-6 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0">
        <input
          type="search"
          placeholder="Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-3 rounded border focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="p-3 rounded border focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={filterSubCategory}
          onChange={(e) => setFilterSubCategory(e.target.value)}
          className="p-3 rounded border focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">All subCategories</option>
          {subCategoryOptions[formData.category]?.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="p-3 rounded border focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">All Tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Products List */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center h-48">
            <CircularProgress />
          </div>
        ) : paginatedProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        ) : (
          paginatedProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-contain rounded-md mb-3"
              />
              <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
              <p className="text-green-700 font-bold mb-2">
                ksh {product.price}
              </p>
              <p className="text-sm text-gray-600 flex-grow">
                {product.description}
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Category: {product.category} | {product.subCategory} | Tag:{" "}
                {product.tag}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Rating: {product.rating?.toFixed(1)} ⭐ | Likes:{" "}
                {product.likes || 0}
              </p>
              <p className="text-sm mt-1">
                Availability:{" "}
                <span
                  className={`font-semibold ${
                    product.inStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </p>

              <div className="mt-4 flex space-x-3 justify-between">
                <button
                  onClick={() => handleEdit(product)}
                  className="text-blue-600 hover:blue-900"
                >
                  <PencilLine size={32} />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={32} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="max-w-7xl mx-auto px-6 mt-8 flex justify-center space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`px-3 py-1 rounded border border-gray-300 ${
                  currentPage === pageNum
                    ? "bg-yellow-600 text-white border-yellow-600"
                    : "hover:bg-gray-200"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
