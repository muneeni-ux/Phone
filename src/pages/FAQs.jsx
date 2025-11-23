import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Helmet } from "react-helmet-async";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function FAQs() {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/api/faq`);
        // setFaqs(res.data);
        setFaqs(res.data.filter((t) => t.isVerified));
      } catch (err) {
        console.error("Failed to fetch FAQs:", err);
      }
    };

    fetchFAQs();
  }, []);

  const toggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-16 sm:px-12 lg:px-24 font-sans text-black mt-12">
      <Helmet>
        <title>FAQs | Pak Fashions</title>
        <meta
          name="description"
          content="Find answers to the most frequently asked questions about Pak Fashions' products, shipping, orders, and more."
        />
        <meta
          name="keywords"
          content="Pak Fashions FAQs, fashion questions, shipping info, order help, clothing support"
        />
        <meta name="author" content="Pak Fashions" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="FAQs | Pak Fashions" />
        <meta
          property="og:description"
          content="Common questions answered about shopping, shipping, and support from Pak Fashions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pakfashions.co.ke/faqs" />
        <meta
          property="og:image"
          content="https://pakfashions.co.ke/pak-fashions.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FAQs | Pak Fashions" />
        <meta
          name="twitter:description"
          content="Get help with your orders, shipping, and more from our FAQ section."
        />
        <meta
          name="twitter:image"
          content="https://pakfashions.co.ke/pak-fashions.png"
        />
      </Helmet>

      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-black mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-yellow-700 text-lg">
          Answers to your most common questions about our products, shipping,
          and more.
        </p>
        <div className="w-24 h-1 bg-yellow-500 mx-auto mt-4 rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.length === 0 && (
          <p className="text-center text-yellow-600">
            No FAQs available at the moment.
          </p>
        )}

        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="border border-yellow-300 rounded-xl shadow hover:shadow-md transition"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center text-left p-5 bg-yellow-50 hover:bg-yellow-100 focus:outline-none"
            >
              <span className="text-lg font-semibold text-black">
                {faq.question}
              </span>
              {activeIndex === index ? (
                <ChevronUp className="text-yellow-600" />
              ) : (
                <ChevronDown className="text-yellow-600" />
              )}
            </button>

            {activeIndex === index && (
              <div className="p-5 border-t border-yellow-200 text-black bg-white">
                <p className="leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQs;
