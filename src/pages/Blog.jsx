import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/api/blogs`);
        if (!response.ok) throw new Error("Failed to fetch blog posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

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

  // Limit to 9 if showAll is false
  const displayedPosts = showAll ? posts : posts.slice(0, 9);

  return (
    <div className="min-h-screen bg-white mt-12 md:mt-4">
      <Helmet>
        <title>Fashion Blog | Pak Fashions</title>
        <meta
          name="description"
          content="Explore the latest in fashion trends, styling tips, and behind-the-scenes stories at Pak Fashions."
        />
        <meta
          name="keywords"
          content="fashion blog, style tips, clothing trends, Pak Fashions blog, Nanyuki, Laikipia, sustainable fashion"
        />
        <meta name="author" content="Pak Fashions" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="Fashion Blog | Pak Fashions" />
        <meta
          property="og:description"
          content="Stories, insights, and styling inspiration from the world of fashion."
        />
        <meta
          property="og:image"
          content="https://pakfashions.co.ke/PakFashionslogo.jpg"
        />
        <meta property="og:url" content="https://pakfashions.co.ke/blog" />
        <meta property="og:type" content="article" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fashion Blog | Pak Fashions" />
        <meta
          name="twitter:description"
          content="Explore the latest fashion tips and trends from Pak Fashions."
        />
        <meta
          name="twitter:image"
          content="https://pakfashions.co.ke/PakFashionslogo.jpg"
        />

        {/* Optional Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Pak Fashions Blog",
            description:
              "Stories, insights, and styling inspiration from the world of fashion.",
            url: "https://pakfashions.co.ke/blog",
            publisher: {
              "@type": "Organization",
              name: "Pak Fashions",
              logo: {
                "@type": "ImageObject",
                url: "https://pakfashions.co.ke/pak-fashion.jpg",
              },
            },
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-yellow-100 text-center py-16 px-4">
        <h1 className="text-5xl font-extrabold tracking-tight mb-3 text-black">
          Blog <span className="text-yellow-500">Pak Fashions</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Stories, insights, and tips from the vibrant world of fashion.
        </p>
        <div className="h-1 w-24 bg-yellow-500 mx-auto mt-4 rounded-full" />
      </section>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <CircularProgress style={{ color: "black" }} />
        </div>
      ) : (
        <section className="max-w-6xl mx-auto px-4 py-16 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.length > 0 ? (
            displayedPosts.map((post) => (
              <div
                key={post._id}
                className="border border-black/10 rounded-xl shadow-md hover:shadow-lg transition p-6 bg-white hover:bg-yellow-50"
              >
                <h3 className="text-xl font-bold text-black mb-2">
                  {post.title}
                </h3>
                <div className="flex items-center text-sm text-black/60 mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDateWithSuffix(post.date)}
                </div>
                <p className="text-sm text-gray-700 italic mb-2">
                  By {post.author}
                </p>
                <p className="text-gray-800 mb-4 leading-relaxed line-clamp-3">
                  {post.description}
                </p>
                <button
                  onClick={() => navigate(`/blog/${post._id}`)}
                  className="inline-block text-yellow-600 font-semibold hover:underline"
                >
                  Read more →
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-black col-span-full">
              No blog posts available.
            </div>
          )}
        </section>
      )}
      {/* Show More / Show Less Button */}
      {posts.length > 9 && (
        <div className="text-center mt-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-full shadow transition"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Blog;
