import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, ArrowLeft, MessageSquare } from "lucide-react";
import { Helmet } from "react-helmet-async";
import CircularProgress from "@mui/material/CircularProgress";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${SERVER_URL}/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.error(err));

    fetch(`${SERVER_URL}/api/blogs/${id}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error("Comments error:", err));
  }, [id]);

  const formatDateWithSuffix = (dateStr) => {
    const dateObj = new Date(dateStr);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("default", { month: "long" });
    const year = dateObj.getFullYear();
    const getSuffix = (d) => {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
    return `${day}${getSuffix(day)} ${month} ${year}`;
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.name || !newComment.text) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${SERVER_URL}/api/blogs/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });
      const savedComment = await res.json();
      setComments((prev) => [savedComment, ...prev]);
      setNewComment({ name: "", text: "" });
    } catch (err) {
      console.error("Failed to submit comment", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!blog)
    return (
      <div className="flex justify-center items-center py-20 bg-white">
        <CircularProgress style={{ color: "black" }} />
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-black mt-12">
      <Helmet>
        <title>{blog.title} | Pak Fashions Blog</title>
        <meta
          name="description"
          content={
            blog.content.length > 160
              ? blog.content.slice(0, 160) + "..."
              : blog.content
          }
        />
        <meta
          name="keywords"
          content={`fashion, blog, article, ${blog.author}, ${blog.title}, Pak Fashions`}
        />
        <meta name="author" content={blog.author} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (Facebook/LinkedIn) */}
        <meta property="og:title" content={blog.title} />
        <meta
          property="og:description"
          content={
            blog.content.length > 160
              ? blog.content.slice(0, 160) + "..."
              : blog.content
          }
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://pakfashions.co.ke/blog/${blog._id}`}
        />
        <meta
          property="og:image"
          content={
            blog.image || "https://pakfashions.co.ke/default-og-image.jpg"
          }
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta
          name="twitter:description"
          content={
            blog.content.length > 160
              ? blog.content.slice(0, 160) + "..."
              : blog.content
          }
        />
        <meta
          name="twitter:image"
          content={
            blog.image || "https://pakfashions.co.ke/default-og-image.jpg"
          }
        />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description:
              blog.content.length > 160
                ? blog.content.slice(0, 160) + "..."
                : blog.content,
            author: {
              "@type": "Person",
              name: blog.author,
            },
            datePublished: blog.date,
            image:
              blog.image || "https://pakfashions.co.ke/default-og-image.jpg",
            publisher: {
              "@type": "Organization",
              name: "Pak Fashions",
              logo: {
                "@type": "ImageObject",
                url: "https://pakfashions.co.ke/logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://pakfashions.co.ke/blog/${blog._id}`,
            },
          })}
        </script>
      </Helmet>
      {/* Header Section */}
      <div className="bg-yellow-100 text-center py-16 px-6 shadow-sm">
        <h1 className="text-4xl font-extrabold mb-4 max-w-3xl mx-auto leading-tight tracking-wide">
          {blog.title}
        </h1>
        <div className="flex justify-center items-center text-sm text-black/70">
          <Calendar className="w-4 h-4 mr-2" />
          {formatDateWithSuffix(blog.date)}
        </div>
      </div>

      {/* Back Navigation */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-yellow-600 hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Blog
        </button>
      </div>

      {/* Blog Content */}
      <article className="max-w-4xl mx-auto px-4 leading-relaxed text-lg text-black">
        {blog.content.split("\n").map((para, idx) => (
          <p className="mb-6" key={idx}>
            {para}
          </p>
        ))}

        <hr className="my-10 border-yellow-300" />

        <p className="text-sm italic text-yellow-600">
          Written by{" "}
          <span className="font-medium text-black">{blog.author}</span>
        </p>
      </article>

      {/* Comment Section */}
      <section className="max-w-4xl mx-auto px-4 py-10 mt-10 bg-yellow-50 border-t border-yellow-300 rounded-lg">
        <h2 className="text-2xl font-semibold text-yellow-800 flex items-center mb-4">
          <MessageSquare className="w-5 h-5 mr-2" /> Comments
        </h2>

        <form onSubmit={handleSubmitComment} className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Your name"
            className="w-full px-4 py-2 border border-yellow-300 rounded focus:outline-none"
            value={newComment.name}
            onChange={(e) =>
              setNewComment({ ...newComment, name: e.target.value })
            }
          />
          <textarea
            rows={4}
            placeholder="Write your comment..."
            className="w-full px-4 py-2 border border-yellow-300 rounded focus:outline-none"
            value={newComment.text}
            onChange={(e) =>
              setNewComment({ ...newComment, text: e.target.value })
            }
          ></textarea>
          <button
            type="submit"
            disabled={submitting}
            className="bg-yellow-500 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-600 transition"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>

        {/* Display Comments */}
        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="border-l-4 border-yellow-400 pl-4">
                <p className="text-sm text-gray-700 mb-1 font-medium">
                  {comment.name}
                </p>
                <p className="text-gray-800">{comment.text}</p>
              </div>
            ))
          ) : (
            <p className="text-sm italic text-gray-500">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default BlogPost;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Calendar, ArrowLeft } from "lucide-react";
// import CircularProgress from "@mui/material/CircularProgress";

// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// function BlogPost() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [blog, setBlog] = useState(null);

//   useEffect(() => {
//     fetch(`${SERVER_URL}/api/blogs/${id}`)
//       .then((res) => res.json())
//       .then((data) => setBlog(data))
//       .catch((err) => console.error(err));
//   }, [id]);

//   if (!blog)
//     return (
//       <div className="flex justify-center items-center py-20 bg-white">
//         <CircularProgress style={{ color: "black" }} />
//       </div>
//     );

//   const formatDateWithSuffix = (dateStr) => {
//     const dateObj = new Date(dateStr);
//     const day = dateObj.getDate();
//     const month = dateObj.toLocaleString("default", { month: "long" });
//     const year = dateObj.getFullYear();
//     const getSuffix = (d) => {
//       if (d > 3 && d < 21) return "th";
//       switch (d % 10) {
//         case 1: return "st";
//         case 2: return "nd";
//         case 3: return "rd";
//         default: return "th";
//       }
//     };
//     return `${day}${getSuffix(day)} ${month} ${year}`;
//   };

//   return (
//     <div className="min-h-screen bg-white text-black mt-12">
//       {/* Header Section */}
//       <div className="bg-yellow-100 text-center py-16 px-6 shadow-sm">
//         <h1 className="text-4xl font-extrabold mb-4 max-w-3xl mx-auto leading-tight tracking-wide">
//           {blog.title}
//         </h1>
//         <div className="flex justify-center items-center text-sm text-black/70">
//           <Calendar className="w-4 h-4 mr-2" />
//           {formatDateWithSuffix(blog.date)}
//         </div>
//       </div>

//       {/* Back Navigation */}
//       <div className="max-w-4xl mx-auto px-4 mt-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-sm text-yellow-600 hover:underline mb-4"
//         >
//           <ArrowLeft className="w-4 h-4 mr-1" />
//           Back to Blog
//         </button>
//       </div>

//       {/* Content Area */}
//       <article className="max-w-4xl mx-auto px-4 pb-20 leading-relaxed text-lg text-black">
//         {blog.content.split("\n").map((para, idx) => (
//           <p className="mb-6" key={idx}>
//             {para}
//           </p>
//         ))}

//         <hr className="my-10 border-yellow-300" />

//         <p className="text-sm italic text-yellow-600">
//           Written by <span className="font-medium text-black">{blog.author}</span>
//         </p>
//       </article>
//     </div>
//   );
// }

// export default BlogPost;
