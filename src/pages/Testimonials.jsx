import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Quote } from "lucide-react";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/testimonials`);
        // setTestimonials(res.data);
        setTestimonials(res.data.filter((t) => t.isVerified));
      } catch (err) {
        console.error("Failed to load testimonials:", err);
      }
    };
    fetchTestimonials();
  }, []);

  // Limit to 9 if showAll is false
  const displayedTestimonials = showAll
    ? testimonials
    : testimonials.slice(0, 9);

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product", // Or "Organization" if reviews are general
    name: "Pak Fashions",
    description: "Handcrafted fashion loved by our customers.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue:
        testimonials.length > 0
          ? (
              testimonials.reduce((sum, t) => sum + (t.rating || 5), 0) /
              testimonials.length
            ).toFixed(1)
          : "5",
      reviewCount: testimonials.length,
    },
    review: testimonials.slice(0, 5).map((t) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: t.name,
      },
      datePublished: new Date(t.date).toISOString(),
      reviewBody: t.message,
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating || 5,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white py-20 px-6 sm:px-12 lg:px-24 font-sans text-black mt-12">
      {/* SEO Helmet */}
      <Helmet>
        <title>Customer Testimonials | Pak Fashions</title>
        <meta
          name="description"
          content="Read verified reviews and heartfelt testimonials from Pak Fashions customers. Real experiences that highlight our quality and service."
        />
        <meta
          name="keywords"
          content="Pak Fashions testimonials, customer reviews, fashion feedback, verified testimonials, user experience"
        />
        <meta name="author" content="Pak Fashions" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta
          property="og:title"
          content="Customer Testimonials | Pak Fashions"
        />
        <meta
          property="og:description"
          content="Discover what our happy customers are saying about their Pak Fashions experience."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://pakfashions.co.ke/testimonials"
        />
        <meta
          property="og:image"
          content="https://pakfashions.co.ke/pak-fashions.jpg"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Customer Testimonials | Pak Fashions"
        />
        <meta
          name="twitter:description"
          content="Real stories from real customers. See what people are saying about Pak Fashions."
        />
        <meta
          name="twitter:image"
          content="https://pakfashions.co.ke/pak-fashions.jpg"
        />
        <script type="application/ld+json">
          {JSON.stringify(reviewSchema)}
        </script>
      </Helmet>
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-extrabold text-black mb-4">
          What Our Customers Say
        </h1>
        <p className="text-lg text-yellow-700">
          Real experiences from people who love our handcrafted fashion.
        </p>
        <div className="w-24 h-1 bg-yellow-500 rounded-full mx-auto mt-4"></div>
      </div>

      {testimonials.length === 0 ? (
        <p className="text-center text-yellow-600">No testimonials yet.</p>
      ) : (
        <>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {displayedTestimonials.map((t) => (
              <div
                key={t.id}
                className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow hover:shadow-md transition relative"
              >
                <Quote
                  className="text-yellow-600 absolute -top-4 -left-4 bg-white p-2 rounded-full shadow"
                  size={32}
                />

                <p className="text-black text-base leading-relaxed mb-6 italic">
                  “{t.message}”
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-black">{t.name}</h4>
                    <p className="text-sm text-yellow-700">
                      {new Date(t.date).toLocaleDateString()}
                    </p>
                  </div>
                  {t.isVerified && (
                    <span className="text-xs bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full font-semibold">
                      Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Show More / Show Less Button */}
          {testimonials.length > 9 && (
            <div className="text-center mt-2">
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-full shadow transition"
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Testimonials;
