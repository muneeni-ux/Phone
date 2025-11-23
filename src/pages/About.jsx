import React, { useEffect } from "react";
import { FaRecycle, FaUsers, FaHeart, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet-async";

function About() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen bg-white text-black px-6 py-20 mt-12">
      <Helmet>
        <title>About Us | Pak Fashions - Fashion with Heart in Kenya</title>
        <meta
          name="description"
          content="Learn about Pak Fashions – our story, mission, and how we're redefining sustainable fashion in Nanyuki, Laikipia, and beyond."
        />
        <meta
          name="keywords"
          content="about pak fashions, sustainable fashion kenya, affordable clothes Nanyuki, Laikipia fashion, eco-friendly clothes"
        />
        <meta name="author" content="Pak Fashions" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="About Us | Pak Fashions" />
        <meta
          property="og:description"
          content="Learn about our journey, values, and mission to deliver affordable, sustainable style."
        />
        <meta
          property="og:image"
          content="https://pakfashions.co.ke/PakFashions-logo.jpg"
        />
        <meta property="og:url" content="https://pakfashions.co.ke/about" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Pak Fashions" />
        <meta
          name="twitter:description"
          content="Pak Fashions - Where style meets sustainability in Kenya."
        />
        <meta
          name="twitter:image"
          content="https://pakfashions.co.ke/PakFashions-logo.jpg"
        />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Pak Fashions",
            url: "https://pakfashions.co.ke",
            logo: "https://pakfashions.co.ke/pak-circle.png",
            foundingDate: "2010",
            description:
              "Pak Fashions is a sustainable clothing brand based in Nanyuki, Kenya, offering affordable fashion for all.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "237G+MQ6, Nanyuki",
              addressLocality: "Nanyuki",
              addressRegion: "Laikipia",
              postalCode: "10400",
              addressCountry: "KE",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+254 726 329 260",
              contactType: "Customer Support",
              areaServed: "KE",
              availableLanguage: ["English", "Swahili"],
            },
            sameAs: [
              "https://web.facebook.com/PAKFASHIONSKE",
              "https://www.instagram.com/pakfashionske?igsh=MXZsbXd3YnRhamltYg==",
            ],
          })}
        </script>
      </Helmet>
      {/* Hero Section */}
      <div className="text-center mb-20" data-aos="fade-down">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-black">
          About <span className="text-yellow-600">Pak Fashions</span>
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 leading-relaxed">
          Quality loved fashion with a purpose — making style affordable,
          sustainable, and community-driven.
        </p>
        <div className="w-20 h-1 bg-yellow-600 mx-auto mt-6 rounded-full" />
      </div>

      {/* Our Story */}
      <section className="max-w-6xl mx-auto mb-24 grid md:grid-cols-2 gap-16 items-center">
        <img
          src="https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80"
          alt="Pak Fashion Store"
          className="rounded-3xl shadow-2xl w-full object-cover h-96 hover:scale-105 transition-transform duration-600"
          data-aos="fade-right"
        />
        <div data-aos="fade-left">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            <span className="border-l-4 border-yellow-600 pl-4">
              Our Story & Mission
            </span>
          </h2>
          <p className="text-gray-800 leading-relaxed text-lg mb-4">
            Founded in 2010, Pak Fashion is dedicated to providing high-quality,
            affordable clothing to our community. We believe in extending the
            life of fashion while promoting sustainability and beauty.
          </p>
          <p className="text-gray-800 leading-relaxed text-lg">
            Our carefully curated collection supports eco-friendly shopping
            habits and helps customers find unique styles without compromising
            their budget or the planet.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="text-center mb-28 px-4" data-aos="zoom-in">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12 tracking-wide text-black">
          What We Stand For
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: (
                <FaRecycle className="text-5xl text-yellow-600 mb-5 mx-auto" />
              ),
              title: "Sustainability",
              desc: "Giving the community a chance to be as beautiful as can be fostering love among each other.",
            },
            {
              icon: (
                <FaUsers className="text-5xl text-yellow-600 mb-5 mx-auto" />
              ),
              title: "Community",
              desc: "Supporting local families and fostering connections through affordable, quality clothing.",
            },
            {
              icon: (
                <FaHeart className="text-5xl text-yellow-600 mb-5 mx-auto" />
              ),
              title: "Passion",
              desc: "Passionate about fashion that’s both stylish and responsible.",
            },
          ].map(({ icon, title, desc }, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition duration-300 border border-yellow-100"
              data-aos={`flip-${i === 0 ? "left" : i === 1 ? "up" : "right"}`}
            >
              {icon}
              <h3 className="text-xl font-semibold mb-3 text-black">{title}</h3>
              <p className="text-gray-700 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="relative max-w-5xl mx-auto mb-24 px-8 py-12 bg-yellow-50 rounded-3xl shadow-xl"
        data-aos="fade-up"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-yellow-600 rounded-t-3xl" />
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8 text-black">
          Why Shop With Pak Fashion?
        </h2>
        <p className="text-center text-gray-800 leading-relaxed text-lg max-w-3xl mx-auto">
          We combine affordability, quality, and sustainability. Every item in
          our store is carefully inspected and selected to ensure you get great
          style without compromising the planet. Join us in making fashion
          circular and empowering our local community.
        </p>
      </section>

      {/* Contact CTA */}
      <div className="text-center" data-aos="zoom-in-up">
        <Link to="/contact" aria-label="Contact Us Page">
          <button className="mt-6 inline-flex items-center gap-3 bg-yellow-600 hover:bg-yellow-600 text-black px-8 py-4 rounded-full text-xl font-semibold shadow-lg transition duration-300">
            <FaPhoneAlt className="text-lg" />
            Contact Us
          </button>
        </Link>
      </div>
    </div>
  );
}

export default About;
