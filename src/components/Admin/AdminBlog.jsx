// // src/pages/admin/AdminBlog.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Trash2, PencilLine, PlusCircle } from "lucide-react";

// const API = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

// const AdminBlog = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     author: "",
//     date: "",
//     content: "",
//   });
//   const [editId, setEditId] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchBlogs = async () => {
//     try {
//       const res = await axios.get(`${API}/api/blogs`);
//       setBlogs(res.data);
//     } catch (err) {
//       alert("Failed to fetch blogs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

// const handleChange = (e) => {
//   setForm({ ...form, [e.target.name]: e.target.value });
// };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editId) {
//         await axios.put(`${API}/api/blogs/${editId}`, form);
//         alert("Post updated");
//       } else {
//         await axios.post(API, form);
//         alert("Post created");
//       }
//       setForm({ title: "", description: "", author: "", date: "", content: "" });
//       setEditId(null);
//       fetchBlogs();
//     } catch (err) {
//       alert("Error submitting blog");
//     }
//   };

//   const handleEdit = (post) => {
//     setForm({
//       title: post.title,
//       description: post.description,
//       author: post.author,
//       date: post.date,
//       content: post.content,
//     });
//     setEditId(post._id);
//   };

//   const handleDelete = async (id) => {
//     const confirm = window.confirm("Delete this blog post?");
//     if (!confirm) return;
//     try {
//       await axios.delete(`${API}/${id}`);
//       setBlogs((prev) => prev.filter((b) => b._id !== id));
//     } catch {
//       alert("Error deleting post");
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md">
//       <h1 className="text-2xl font-bold mb-4">Admin Blog Manager</h1>

//       {/* Blog Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="space-y-4 border p-4 rounded-md mb-6 bg-gray-50"
//       >
//         <h2 className="text-xl font-semibold">
//           {editId ? "Edit Blog Post" : "Add New Blog Post"}
//         </h2>
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={form.title}
//           onChange={handleChange}
//           className="w-full border rounded px-3 py-2"
//           required
//         />
//         <input
//           type="text"
//           name="description"
//           placeholder="Short Description"
//           value={form.description}
//           onChange={handleChange}
//           className="w-full border rounded px-3 py-2"
//           required
//         />
//         <input
//           type="text"
//           name="author"
//           placeholder="Author"
//           value={form.author}
//           onChange={handleChange}
//           className="w-full border rounded px-3 py-2"
//           required
//         />
//         <input
//           type="date"
//           name="date"
//           value={form.date}
//           onChange={handleChange}
//           className="w-full border rounded px-3 py-2"
//           required
//         />
//         <textarea
//           name="content"
//           placeholder="Full Blog Content"
//           value={form.content}
//           onChange={handleChange}
//           rows="4"
//           className="w-full border rounded px-3 py-2"
//           required
//         />
//         <button
//           type="submit"
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           <PlusCircle size={18} />
//           {editId ? "Update Post" : "Create Post"}
//         </button>
//       </form>

//       {/* Blog List */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : blogs.length === 0 ? (
//         <p>No blog posts available.</p>
//       ) : (
//         <div className="grid gap-4">
//           {blogs.map((post) => (
//             <div
//               key={post._id}
//               className="border p-4 rounded-lg shadow-sm bg-gray-50"
//             >
//               <h3 className="text-lg font-semibold">{post.title}</h3>
//               <p className="text-sm text-gray-600">{post.description}</p>
//               <p className="text-sm mt-1">
//                 <strong>Author:</strong> {post.author} |{" "}
//                 <strong>Date:</strong> {new Date(post.date).toLocaleDateString()}
//               </p>
//               <div className="flex gap-3 mt-2">
//                 <button
//                   onClick={() => handleEdit(post)}
//                   className="text-blue-600 hover:underline flex items-center gap-1"
//                 >
//                   <PencilLine size={16} />
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(post._id)}
//                   className="text-red-600 hover:underline flex items-center gap-1"
//                 >
//                   <Trash2 size={16} />
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminBlog;
/* src/pages/admin/AdminBlog.jsx */
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Trash2,
  PencilLine,
  PlusCircle,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Search as SearchIcon,
} from "lucide-react";
// import "react-quill/dist/quill.snow.css";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-hot-toast";

const API = process.env.REACT_APP_SERVER_URL; // vite / CRA

const PER_PAGE = 10;

const AdminBlog = () => {
  /* ------------ state ------------ */
  const [blogs, setBlogs] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);

  // form
  const [form, setForm] = useState({
    title: "",
    description: "",
    author: "",
    date: new Date().toISOString().slice(0, 10),
    content: "",
  });
  const [editId, setEditId] = useState(null);

  // modal
  const [activePost, setActivePost] = useState(null);

  // search & pagination
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  /* ------------ fetch ------------ */
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get(`${API}/api/blogs`);
      setBlogs(data);
    } catch {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  /* ------------ derived lists ------------ */
  const filtered = useMemo(() => {
    if (!query.trim()) return blogs;
    return blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [blogs, query]);

  const maxPage = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  /* ------------ handlers ------------ */
  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      author: "",
      date: new Date().toISOString().slice(0, 10),
      content: "",
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("author", form.author);
    formData.append("date", form.date);
    formData.append("content", form.content);
    if (imageFile) formData.append("image", imageFile);

    try {
      if (editId) {
        await axios.put(`${API}/api/blogs/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Post updated");
      } else {
        await axios.post(`${API}/api/blogs`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Post created");
      }
      resetForm();
      setImageFile(null);
      fetchBlogs();
    } catch {
      toast.error("Error saving post");
    }
  };

  // const handleEdit = (p) => {
  //   setForm({ ...p, date: p.date?.slice(0, 10) });
  //   setEditId(p._id);
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };
  const handleEdit = (p) => {
    setForm({
      title: p.title,
      description: p.description,
      author: p.author,
      date: p.date?.slice(0, 10),
      content: p.content,
      image: p.image || "",
    });
    setImageFile(null); // So it doesn't override on edit unless a new one is picked
    setEditId(p._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog post?")) return;
    try {
      await axios.delete(`${API}/api/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch {
      toast.error("Error deleting");
    }
  };

  /* ------------ ui ------------ */
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* ===== title & search ===== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold">Blog manager</h1>

        <label className="relative w-full md:w-72">
          <SearchIcon
            className="absolute left-2.5 top-2.5 text-gray-400"
            size={18}
          />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search posts..."
            className="w-full pl-8 pr-3 py-2 border rounded focus:outline-none"
          />
        </label>
      </div>

      {/* ===== form ===== */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-4 rounded-md mb-10 space-y-4"
      >
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <PlusCircle size={18} />
          {editId ? "Edit post" : "New post"}
        </h2>

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border rounded px-3 py-2"
          required
        />

        <input
          name="description"
          placeholder="Short description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border rounded px-3 py-2"
          required
        />

        <div className="flex flex-col md:flex-row gap-4">
          <input
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="flex-1 border rounded px-3 py-2"
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
          {(imageFile || form.image) && (
            <img
              src={imageFile ? URL.createObjectURL(imageFile) : form.image}
              alt="Preview"
              className="w-24 h-24 mt-2 rounded object-cover border"
            />
          )}
        </div>

        {/* react-quill */}
        {/* <ReactQuill
          theme="snow"
          value={form.content}
          onChange={(content) => setForm({ ...form, content })}
          className="bg-white"
        /> */}
        <textarea
          name="content"
          placeholder="Full Blog Content"
          value={form.content}
          onChange={handleChange}
          rows="6"
          className="w-full border rounded px-3 py-2"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center gap-1"
          >
            <PlusCircle size={16} />
            {editId ? "Update" : "Create"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-sm underline text-gray-500"
            >
              cancel edit
            </button>
          )}
        </div>
      </form>

      {/* ===== list ===== */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <CircularProgress style={{ color: "black" }} />{" "}
          {/* Tailwind amber-600 */}
        </div>
      ) : filtered.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        <>
          <div className="grid gap-4">
            {paginated.map((post) => (
              <div
                key={post._id}
                className="border p-4 rounded shadow-sm bg-gray-50 flex gap-4"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-24 h-24 object-cover rounded border"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {post.description}
                  </p>
                  <p className="text-xs mt-1 text-gray-500">
                    {post.author} · {new Date(post.date).toLocaleDateString()}
                  </p>
                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={() => setActivePost(post)}
                      className="text-amber-600 flex items-center gap-1 hover:underline"
                    >
                      <Eye size={16} /> Read
                    </button>
                    <button
                      onClick={() => handleEdit(post)}
                      className="text-blue-600 flex items-center gap-1 hover:underline"
                    >
                      <PencilLine size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-red-600 flex items-center gap-1 hover:underline"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ===== pagination ===== */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="disabled:opacity-40"
            >
              <ChevronLeft />
            </button>
            <span className="text-sm">
              {page} / {maxPage}
            </span>
            <button
              disabled={page === maxPage}
              onClick={() => setPage((p) => p + 1)}
              className="disabled:opacity-40"
            >
              <ChevronRight />
            </button>
          </div>
        </>
      )}

      {/* ===== modal ===== */}
      {activePost && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-lg p-6 relative">
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <img
              src={activePost.image}
              alt={activePost.title}
              className="w-full max-h-72 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{activePost.title}</h2>
            <p className="text-sm mb-4 text-gray-600">
              {activePost.author} ·{" "}
              {new Date(activePost.date).toLocaleDateString()}
            </p>

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: activePost.content }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
