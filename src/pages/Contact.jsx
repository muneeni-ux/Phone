import React, { useState, useEffect } from "react";
import {
  FaWhatsapp,
} from "react-icons/fa";
import {
  MessageSquare,
  Phone,
  MapPin,
  Mail,
  CheckCircle,
  Diamond,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Contact() {
  // Initialize AOS only once on component mount
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // --- Static Data and Theme Colors ---
  const primaryColor = "text-blue-600";
  const primaryBg = "bg-blue-600";
  const primaryHover = "hover:bg-blue-700";
  const cardBg = "bg-white";
  const inputBorder = "border-gray-300";
  const focusRing = "focus:border-blue-500";

  const contactInfo = {
    email: "info@techHub.co.ke",
    phone: "+254 721 555-123",
    whatsapp: "254738380692",
    location: "456 Artisan Way, Craft City, NY 10010",
  };
  const whatsappURL = `https://wa.me/${contactInfo.whatsapp}?text=Hello!%20I%20have%20a%20question%20about%20techHub.`;

  // --- State Management ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch(`${SERVER_URL}/api/contact/send-mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({
          type: "error",
          message: data.error || "Failed to send message.",
        });
        setIsSubmitting(false);
        return;
      }

      // Success
      setStatus({
        type: "success",
        message: "Message sent successfully! We will respond within 24 hours.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }

    setIsSubmitting(false);

    // Auto-hide status after 5 seconds
    setTimeout(() => setStatus(null), 5000);
  };

  // --- Reusable Contact Card Component ---
  const ContactCard = ({ icon, title, content, link, linkText }) => (
    <div
      className={`${cardBg} p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center transform hover:shadow-xl transition-all duration-300`}
    >
      <div className={`${primaryColor} bg-blue-50 p-4 rounded-full w-fit mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-1 text-gray-900">{title}</h3>
      <p className="text-gray-500 text-sm mb-3">{content}</p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${primaryColor} font-semibold hover:text-blue-800 transition text-sm mt-auto`}
        >
          {linkText}
        </a>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans mb-[-8rem] pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
        {/* ========================================================== */}
        {/* --- 1. HERO HEADER --- */}
        {/* ========================================================== */}
        <header
          className="text-center pt-8 max-w-4xl mx-auto"
          data-aos="fade-down"
        >
          <p
            className={`${primaryColor} text-sm uppercase tracking-widest font-extrabold mb-2 flex items-center justify-center gap-2`}
          >
            <Diamond size={16} /> CONNECT WITH US
          </p>
          <h1 className="text-5xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Drop Us a Line
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-600">
            We are dedicated to providing quick and detailed support for your
            custom orders, product questions, and technical inquiries.
          </p>
        </header>

        {/* ========================================================== */}
        {/* --- 2. CONTACT INFORMATION GRID --- */}
        {/* ========================================================== */}
        <section data-aos="fade-up" data-aos-delay="200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ContactCard
              icon={<Mail size={28} />}
              title="Email Support"
              content="Best for detailed inquiries and order documentation."
              link={`mailto:${contactInfo.email}`}
              linkText={contactInfo.email}
            />
            <ContactCard
              icon={<Phone size={28} />}
              title="Phone Line"
              content="Call us for immediate assistance or quick questions."
              link={`tel:${contactInfo.phone.replace(/ /g, "")}`}
              linkText={contactInfo.phone}
            />
            <ContactCard
              icon={<FaWhatsapp size={28} />}
              title="WhatsApp Quick Chat"
              content="Instant messaging support for stock checks and quick quotes."
              link={whatsappURL}
              linkText="Chat on WhatsApp Now"
            />
          </div>
        </section>

        {/* ========================================================== */}
        {/* --- 3. MAIN FORM & MAP SECTION (Split) --- */}
        {/* ========================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT COLUMN: MAP / LOCATION DETAILS (1/3) */}
          <section className="lg:col-span-1 space-y-6" data-aos="fade-right">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin size={24} className={primaryColor} /> Our Location
            </h2>
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <p className="text-lg font-semibold text-gray-800 mb-2">
                TechHub HQ
              </p>
              <p className="text-gray-600 mb-4">{contactInfo.location}</p>
              <div className="w-full h-64 overflow-hidden rounded-xl shadow-lg border border-gray-200">
                <iframe
                  title="Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.213210410777!2d-73.9878235845945!3d40.75800047932644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c8983935%3A0x89c25855c8983935!2sTimes%20Square!5e0!3m2!1sen!2ske!4v1628178123456!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN: CONTACT FORM (2/3) */}
          <section
            className="lg:col-span-2 bg-white p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-100 h-fit"
            data-aos="fade-left"
          >
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-2">
              <MessageSquare size={28} className={primaryColor} /> Send Us a
              Message
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Name Input */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`peer w-full p-4 border ${inputBorder} ${cardBg} text-gray-900 rounded-xl focus:ring-blue-500 ${focusRing} transition duration-200 pt-6`}
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="name"
                  className={`absolute left-4 top-1 text-gray-500 transition-all duration-200 transform
                                 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                                 peer-focus:top-1 peer-focus:text-sm ${primaryColor}`}
                >
                  Your Full Name
                </label>
              </div>

              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`peer w-full p-4 border ${inputBorder} ${cardBg} text-gray-900 rounded-xl focus:ring-blue-500 ${focusRing} transition duration-200 pt-6`}
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className={`absolute left-4 top-1 text-gray-500 transition-all duration-200 transform
                                 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                                 peer-focus:top-1 peer-focus:text-sm ${primaryColor}`}
                >
                  Your Email Address
                </label>
              </div>

              {/* Message Textarea */}
              <div className="relative md:col-span-2">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`peer w-full p-4 border ${inputBorder} ${cardBg} text-gray-900 rounded-xl focus:ring-blue-500 ${focusRing} transition duration-200 h-40 pt-6`}
                  placeholder=" "
                  required
                ></textarea>
                <label
                  htmlFor="message"
                  className={`absolute left-4 top-1 text-gray-500 transition-all duration-200 transform
                                 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                                 peer-focus:top-1 peer-focus:text-sm ${primaryColor}`}
                >
                  Your Detailed Message
                </label>
              </div>

              {/* Submission Status */}
              <div className="md:col-span-2">
                {status && (
                  <p
                    className={`text-lg font-semibold p-3 rounded-xl flex items-center gap-2 
    ${
      status.type === "success"
        ? "text-green-700 bg-green-100 border border-green-300"
        : "text-red-700 bg-red-100 border border-red-300"
    }`}
                  >
                    <CheckCircle
                      size={20}
                      className={
                        status.type === "success"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    />
                    {status.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`md:col-span-2 py-4 rounded-xl text-xl font-bold transition duration-300 transform ${
                  isSubmitting
                    ? "bg-blue-300 text-gray-600 cursor-wait"
                    : `${primaryBg} text-white ${primaryHover} hover:scale-[1.005] shadow-lg shadow-blue-500/30`
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message Now"}
              </button>
            </form>
          </section>
        </div>
      </div>

      {/* --- FLOATING WHATSAPP BUTTON (Green Accent) --- */}
      <a
        href={whatsappURL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl transition duration-300 hover:bg-green-600 animate-bounce hover:animate-none"
        style={{ zIndex: 1000 }}
        title="Chat with us on WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />
      </a>
    </div>
  );
}

export default Contact;

// import React, { useState, useEffect } from "react";
// import {
//   FaEnvelope,
//   FaPhoneAlt,
//   FaMapMarkerAlt,
//   FaWhatsapp,
// } from "react-icons/fa";
// import { toast } from "react-hot-toast";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { Helmet } from "react-helmet-async";

// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// function Contact() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch(`${SERVER_URL}/api/contact/send-mail`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast.success(data.success || "Message sent successfully!");
//         setFormData({ name: "", email: "", subject: "", message: "" });
//       } else {
//         toast.error(data.error || "Failed to send message.");
//       }
//     } catch (error) {
//       toast.error("Something went wrong. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white text-black px-6 py-20 mt-12">
//       <Helmet>
//         <title>Contact Us | Pak Fashions</title>
//         <meta
//           name="description"
//           content="Get in touch with Pak Fashions for inquiries, support, or feedback. We're here to help you on your sustainable fashion journey."
//         />
//         <meta
//           name="keywords"
//           content="contact Pak Fashions, get in touch, fashion help, customer support, Laikipia, Nanyuki, Kenya"
//         />
//         <meta name="author" content="Pak Fashions" />
//         <meta name="robots" content="index, follow" />

//         {/* Open Graph Tags */}
//         <meta property="og:title" content="Contact Us | Pak Fashions" />
//         <meta
//           property="og:description"
//           content="Reach out to Pak Fashions via email, phone, WhatsApp, or visit our location in Nanyuki."
//         />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content="https://pakfashions.co.ke/contact" />
//         <meta
//           property="og:image"
//           content="https://pakfashions.co.ke/pak-fashions.jpg"
//         />

//         {/* Twitter Card */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content="Contact Us | Pak Fashions" />
//         <meta
//           name="twitter:description"
//           content="Reach out to Pak Fashions via email, phone, WhatsApp, or visit our location in Nanyuki."
//         />
//         <meta
//           name="twitter:image"
//           content="https://pakfashions.co.ke/pak-fashions.jpg"
//         />

//         {/* JSON-LD Structured Data */}
//         <script type="application/ld+json">
//           {JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "Organization",
//             name: "Pak Fashions",
//             url: "https://pakfashions.co.ke",
//             email: "pakfashionske@gmail.com",
//             telephone: "+254 724 835785",
//             address: {
//               "@type": "PostalAddress",
//               streetAddress: "237G+MQ6, Nanyuki",
//               addressLocality: "Nanyuki",
//               addressRegion: "Laikipia",
//               addressCountry: "KE",
//             },
//             contactPoint: {
//               "@type": "ContactPoint",
//               telephone: "+254 724 835785",
//               contactType: "Customer Support",
//               areaServed: "KE",
//               availableLanguage: "en",
//             },
//             sameAs: [
//               "https://wa.me/2724835785",
//               "https://web.facebook.com/PAKFASHIONSKE",
//               "https://www.instagram.com/pakfashionske?igsh=MXZsbXd3YnRhamltYg==",
//             ],
//           })}
//         </script>
//       </Helmet>

//       {/* Hero Section */}
//       <div className="text-center mb-20" data-aos="fade-down">
//         <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
//           Contact <span className="text-yellow-600">Pak Fashions</span>
//         </h1>
//         <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 leading-relaxed">
//           Questions? Feedback? We're always here to help with your sustainable
//           fashion journey.
//         </p>
//         <div className="w-20 h-1 bg-yellow-600 mx-auto mt-6 rounded-full" />
//       </div>

//       {/* Info & Form Section */}
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
//         {/* Info Cards */}
//         <div className="space-y-10" data-aos="fade-right">
//           <h2 className="text-3xl font-semibold border-l-4 border-yellow-600 pl-4 mb-6">
//             Reach Out To Us
//           </h2>

//           <div className="bg-yellow-50 rounded-3xl shadow-xl p-6 flex items-start gap-6 hover:shadow-2xl transition duration-300">
//             <FaEnvelope className="text-4xl text-yellow-600 mt-1" />
//             <div>
//               <h3 className="text-xl font-bold mb-1">Email</h3>
//               <a
//                 href="mailto:pakfashionske@gmail.com"
//                 className="text-gray-800 hover:underline break-words"
//               >
//                 pakfashionske@gmail.com
//               </a>
//             </div>
//           </div>

//           <div className="bg-yellow-50 rounded-3xl shadow-xl p-6 flex items-start gap-6 hover:shadow-2xl transition duration-300">
//             <FaPhoneAlt className="text-4xl text-yellow-600 mt-1" />
//             <div>
//               <h3 className="text-xl font-bold mb-1">Phone</h3>
//               <a
//                 href="tel:+254724835785"
//                 className="text-gray-800 hover:underline"
//               >
//                 +254 724 835785
//               </a>
//               &nbsp;|&nbsp;
//               <a
//                 href="tel:+254720146386"
//                 className="text-gray-800 hover:underline"
//               >
//                 +254 720 146386
//               </a>
//             </div>
//           </div>

//           <div className="bg-yellow-50 rounded-3xl shadow-xl p-6 flex items-start gap-6 hover:shadow-2xl transition duration-300">
//             <FaMapMarkerAlt className="text-4xl text-yellow-600 mt-1" />
//             <div>
//               <h3 className="text-xl font-bold mb-1">Visit Us</h3>
//               <p className="text-gray-800">
//                 Pak Fashions Clothes, Pak Fashions 1 at Juba House and Pak Fashions 2 at Napolitana building, Nanyuki
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Contact Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-yellow-50 rounded-3xl shadow-xl p-10 space-y-6"
//           data-aos="fade-left"
//         >
//           <h2 className="text-3xl font-semibold text-center border-b border-yellow-600 pb-4">
//             Send Us a Message
//           </h2>

//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Your Name"
//             className="w-full p-4 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Your Email"
//             className="w-full p-4 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
//             required
//           />
//           <input
//             type="text"
//             name="subject"
//             value={formData.subject}
//             onChange={handleChange}
//             placeholder="Subject (optional)"
//             className="w-full p-4 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
//           />
//           <textarea
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             placeholder="Your Message"
//             className="w-full p-4 border border-yellow-300 rounded-lg h-40 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-600"
//             required
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-yellow-600 hover:bg-yellow-600 text-black py-4 rounded-full font-semibold tracking-wide transition duration-300"
//           >
//             {loading ? "Sending..." : "Send Message"}
//           </button>
//         </form>
//       </div>

//       {/* Google Map */}
//       <section className="mt-28 max-w-6xl mx-auto" data-aos="fade-up">
//         <h2 className="text-3xl font-semibold text-center mb-6">
//           Find Us on the Map
//         </h2>
//         <div className="w-full h-96 rounded-3xl shadow-2xl overflow-hidden">
//           <iframe
//             title="Pak Fashion Location"
//             src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d15959.273034144248!2d37.0698452!3d0.0100851!3m2!1i1024!2i768!4f13.1!2m1!1spak%20fashion%20nanyuki!5e0!3m2!1sen!2ske!4v1748244256144!5m2!1sen!2ske"
//             width="100%"
//             height="100%"
//             frameBorder="0"
//             style={{ border: 0 }}
//             allowFullScreen
//             loading="lazy"
//           />
//         </div>
//       </section>

//       {/* WhatsApp Floating Button */}
//       <a
//         href="https://wa.me/254724835785?text=Hello!%20I%20have%20a%20question%20about%20pakfashions%20products."
//         target="_blank"
//         rel="noopener noreferrer"
//         className="fixed bottom-8 right-8 bg-green-600 text-white p-2 rounded-full shadow-lg hover:bg-green-600 transition z-50 animate-bounce"
//         aria-label="Chat on WhatsApp"
//       >
//         <FaWhatsapp className="text-3xl" />
//       </a>
//     </div>
//   );
// }

// export default Contact;
