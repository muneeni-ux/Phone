// import React, { useState } from "react";
// import {
//   FaEnvelope,
//   FaPhoneAlt,
//   FaMapMarkerAlt,
//   FaWhatsapp,
// } from "react-icons/fa";
// import AOS from "aos";
// import "aos/dist/aos.css";

// function Contact() {
//   // Handle form state
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Simulate form submission
//     console.log("Form Submitted", formData);
//     alert("Thank you for reaching out!");
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 text-blue-900 px-6 py-12 mt-4">
//       {/* Hero Section */}
//       <div className="text-center mb-12" data-aos="fade-down">
//         <h1 className="text-4xl font-bold mb-4">Get in Touch with Us</h1>
//         <p className="text-lg max-w-2xl mx-auto text-blue-800">
//           We’d love to hear from you. Whether you have a question or just want
//           to say hello, don’t hesitate to reach out.
//         </p>
//       </div>

//       {/* Contact Information */}
//       <section className="text-center mb-12" data-aos="zoom-in">
//         <h2 className="text-2xl font-semibold mb-8">Our Contact Information</h2>
//         <div className="grid sm:grid-cols-3 gap-8">
//           <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
//             <FaEnvelope className="text-4xl text-blue-700 mb-4 mx-auto" />
//             <h3 className="text-lg font-bold mb-2">Email</h3>
//             <p>info@beadworksboutique.com</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
//             <FaPhoneAlt className="text-4xl text-blue-700 mb-4 mx-auto" />
//             <h3 className="text-lg font-bold mb-2">Phone</h3>
//             <p>+123 456 7890</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
//             <FaMapMarkerAlt className="text-4xl text-blue-700 mb-4 mx-auto" />
//             <h3 className="text-lg font-bold mb-2">Location</h3>
//             <p>123 Beadworks Ave, Craft City, AB</p>
//           </div>
//         </div>
//       </section>

//       {/* Google Map Embed */}
//       <section className="mb-12" data-aos="fade-up">
//         <h2 className="text-2xl font-semibold text-center mb-4">
//           Our Location
//         </h2>
//         <div className="w-full h-80 overflow-hidden rounded-lg shadow-lg">
//           <iframe
//             title="Location Map"
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.926065417317!2d36.82194657487547!3d-1.2920653356417284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d528fd4b3f%3A0x2d5b7289277e474e!2sNairobi!5e0!3m2!1sen!2ske!4v1683208748496!5m2!1sen!2ske"
//             width="100%"
//             height="100%"
//             frameBorder="0"
//             style={{ border: 0 }}
//             allowFullScreen=""
//             loading="lazy"
//           ></iframe>
//         </div>
//       </section>

//       {/* Contact Form */}
//       <section className="max-w-4xl mx-auto" data-aos="fade-up">
//         <h2 className="text-2xl font-semibold text-center mb-6">
//           Send Us a Message
//         </h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Your Name"
//             className="p-4 bg-white border border-blue-300 rounded-lg w-full"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Your Email"
//             className="p-4 bg-white border border-blue-300 rounded-lg w-full"
//             required
//           />
//           <textarea
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             placeholder="Your Message"
//             className="p-4 bg-white border border-blue-300 rounded-lg w-full h-40"
//             required
//           ></textarea>
//           <button
//             type="submit"
//             className="bg-blue-700 text-white py-3 rounded-full text-lg w-full transition duration-300 hover:bg-blue-800"
//           >
//             Send Message
//           </button>
//         </form>
//       </section>
//       {/* WhatsApp Button */}
//       <section className="fixed">
//         <a
//           href="https://wa.me/1234567890?text=Hello!%20I%20have%20a%20question%20about%20Beadworks%20Boutique."
//           target="_blank"
//           rel="noopener noreferrer"
//           className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300 hover:bg-green-600 animate-bounce transition-all duration-300"
//           style={{ zIndex: 1000 }}
//         >
//           <FaWhatsapp className="text-3xl" />
//         </a>
//       </section>
//     </div>
//   );
// }

// export default Contact;

import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet-async";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${SERVER_URL}/api/contact/send-mail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.success || "Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.error || "Failed to send message.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black px-6 py-20 mt-12">
      <Helmet>
        <title>Contact Us | Pak Fashions</title>
        <meta
          name="description"
          content="Get in touch with Pak Fashions for inquiries, support, or feedback. We're here to help you on your sustainable fashion journey."
        />
        <meta
          name="keywords"
          content="contact Pak Fashions, get in touch, fashion help, customer support, Laikipia, Nanyuki, Kenya"
        />
        <meta name="author" content="Pak Fashions" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Contact Us | Pak Fashions" />
        <meta
          property="og:description"
          content="Reach out to Pak Fashions via email, phone, WhatsApp, or visit our location in Nanyuki."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pakfashions.co.ke/contact" />
        <meta
          property="og:image"
          content="https://pakfashions.co.ke/pak-fashions.jpg"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | Pak Fashions" />
        <meta
          name="twitter:description"
          content="Reach out to Pak Fashions via email, phone, WhatsApp, or visit our location in Nanyuki."
        />
        <meta
          name="twitter:image"
          content="https://pakfashions.co.ke/pak-fashions.jpg"
        />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Pak Fashions",
            url: "https://pakfashions.co.ke",
            email: "pakfashionske@gmail.com",
            telephone: "+254 724 835785",
            address: {
              "@type": "PostalAddress",
              streetAddress: "237G+MQ6, Nanyuki",
              addressLocality: "Nanyuki",
              addressRegion: "Laikipia",
              addressCountry: "KE",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+254 724 835785",
              contactType: "Customer Support",
              areaServed: "KE",
              availableLanguage: "en",
            },
            sameAs: [
              "https://wa.me/2724835785",
              "https://web.facebook.com/PAKFASHIONSKE",
              "https://www.instagram.com/pakfashionske?igsh=MXZsbXd3YnRhamltYg==",
            ],
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <div className="text-center mb-20" data-aos="fade-down">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
          Contact <span className="text-yellow-600">Pak Fashions</span>
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 leading-relaxed">
          Questions? Feedback? We're always here to help with your sustainable
          fashion journey.
        </p>
        <div className="w-20 h-1 bg-yellow-600 mx-auto mt-6 rounded-full" />
      </div>

      {/* Info & Form Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Info Cards */}
        <div className="space-y-10" data-aos="fade-right">
          <h2 className="text-3xl font-semibold border-l-4 border-yellow-600 pl-4 mb-6">
            Reach Out To Us
          </h2>

          <div className="bg-yellow-50 rounded-3xl shadow-xl p-6 flex items-start gap-6 hover:shadow-2xl transition duration-300">
            <FaEnvelope className="text-4xl text-yellow-600 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-1">Email</h3>
              <a
                href="mailto:pakfashionske@gmail.com"
                className="text-gray-800 hover:underline break-words"
              >
                pakfashionske@gmail.com
              </a>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-3xl shadow-xl p-6 flex items-start gap-6 hover:shadow-2xl transition duration-300">
            <FaPhoneAlt className="text-4xl text-yellow-600 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-1">Phone</h3>
              <a
                href="tel:+254724835785"
                className="text-gray-800 hover:underline"
              >
                +254 724 835785
              </a>
              &nbsp;|&nbsp;
              <a
                href="tel:+254720146386"
                className="text-gray-800 hover:underline"
              >
                +254 720 146386
              </a>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-3xl shadow-xl p-6 flex items-start gap-6 hover:shadow-2xl transition duration-300">
            <FaMapMarkerAlt className="text-4xl text-yellow-600 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-1">Visit Us</h3>
              <p className="text-gray-800">
                Pak Fashions Clothes, Pak Fashions 1 at Juba House and Pak Fashions 2 at Napolitana building, Nanyuki
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-yellow-50 rounded-3xl shadow-xl p-10 space-y-6"
          data-aos="fade-left"
        >
          <h2 className="text-3xl font-semibold text-center border-b border-yellow-600 pb-4">
            Send Us a Message
          </h2>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-4 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-4 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
            required
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject (optional)"
            className="w-full p-4 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full p-4 border border-yellow-300 rounded-lg h-40 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-600"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 hover:bg-yellow-600 text-black py-4 rounded-full font-semibold tracking-wide transition duration-300"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* Google Map */}
      <section className="mt-28 max-w-6xl mx-auto" data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Find Us on the Map
        </h2>
        <div className="w-full h-96 rounded-3xl shadow-2xl overflow-hidden">
          <iframe
            title="Pak Fashion Location"
            src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d15959.273034144248!2d37.0698452!3d0.0100851!3m2!1i1024!2i768!4f13.1!2m1!1spak%20fashion%20nanyuki!5e0!3m2!1sen!2ske!4v1748244256144!5m2!1sen!2ske"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/254724835785?text=Hello!%20I%20have%20a%20question%20about%20pakfashions%20products."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-600 text-white p-2 rounded-full shadow-lg hover:bg-green-600 transition z-50 animate-bounce"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />
      </a>
    </div>
  );
}

export default Contact;
