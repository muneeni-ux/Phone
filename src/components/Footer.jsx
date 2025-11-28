// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Facebook, Instagram } from "lucide-react";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// function Footer() {
//   const [activeModal, setActiveModal] = useState(null); // 'terms', 'returns', 'privacy', 'shipping'
//     const [email, setEmail] = useState("");

//   const closeModal = () => setActiveModal(null);

//  const handleSubscribe = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${SERVER_URL}/api/subscribe`, { email });
//       toast.success("Thanks for subscribing!");
//       setEmail("");
//     } catch (err) {
//       // toast.error("Subscription failed. Please try again.");
//       toast.error(err.response?.data?.message || "An error occurred. Please try again.");
//       console.error(err);
//     }
//   };
//   const modalContent = {
//     terms: {
//       title: "Terms of Service",
//       content: (
//         <>
//           <p className="mb-3">
//             Welcome to <strong>Pak Fashions</strong> — your trusted fashion
//             destination in Nanyuki. By using our platform, you agree to the
//             following terms and conditions. We reserve the right to update these
//             terms without prior notice.
//           </p>
//           <ul className="list-disc pl-5 space-y-2">
//             <li>
//               All items are intended for personal use only unless otherwise
//               stated.
//             </li>
//             <li>
//               Reselling of our products without prior written consent is
//               strictly prohibited.
//             </li>
//             <li>
//               All orders are subject to stock availability and confirmation of
//               the order price.
//             </li>
//             <li>
//               Prices and product descriptions may be updated periodically
//               without notification.
//             </li>
//             <li>
//               By placing an order, you confirm that all details provided are
//               accurate and complete.
//             </li>
//           </ul>
//         </>
//       ),
//     },

//     returns: {
//       title: "Return & Exchange Policy",
//       content: (
//         <>
//           <p className="mb-3">
//             At <strong>Pak Fashions</strong>, we want you to be fully satisfied
//             with your purchase. However, if you are not completely happy with an
//             item, we accept returns under the following conditions:
//           </p>
//           <ul className="list-disc pl-5 space-y-2">
//             <li>
//               Returns must be initiated within <strong>7 days</strong> of
//               delivery.
//             </li>
//             <li>
//               Items must be unused, unwashed, and in their original condition
//               and packaging.
//             </li>
//             <li>
//               Defective or damaged items may be returned or exchanged at no
//               extra cost.
//             </li>
//             <li>
//               Customized or clearance items are <strong>non-returnable</strong>.
//             </li>
//             <li>
//               Shipping fees are non-refundable unless the error was on our end.
//             </li>
//           </ul>
//           <p className="mt-3">
//             For assistance, please contact our team via WhatsApp or email. We’re
//             based in Nanyuki and can assist with quick local exchanges when
//             necessary.
//           </p>
//         </>
//       ),
//     },

//     privacy: {
//       title: "Privacy Policy",
//       content: (
//         <>
//           <p className="mb-3">
//             Your privacy is very important to us. We are committed to protecting
//             the personal information you share with us.
//           </p>
//           <ul className="list-disc pl-5 space-y-2">
//             <li>
//               We collect minimal information needed to process orders and
//               communicate updates.
//             </li>
//             <li>
//               Your contact information is never sold or shared with third
//               parties.
//             </li>
//             <li>
//               Payment details are securely handled through trusted payment
//               gateways.
//             </li>
//             <li>
//               You may request to have your account or data permanently deleted
//               at any time.
//             </li>
//             <li>
//               Our site uses cookies to improve user experience and analytics.
//             </li>
//           </ul>
//           <p className="mt-3">
//             For privacy-related questions, contact us at{" "}
//             <strong>privacy@pakfashion.com</strong>.
//           </p>
//         </>
//       ),
//     },

//     shipping: {
//       title: "Shipping Information",
//       content: (
//         <>
//           <p className="mb-3">
//             We offer fast, affordable, and reliable shipping across Kenya.
//             Orders are typically processed within <strong>24–48 hours</strong>.
//           </p>
//           <ul className="list-disc pl-5 space-y-2">
//             <li>
//               <strong>Free delivery within Nanyuki town</strong> and surrounding
//               areas.
//             </li>
//             <li>
//               Orders outside Nanyuki are delivered within 2–5 business days via
//               trusted courier services.
//             </li>
//             <li>
//               Tracking information is shared via email or SMS once your order is
//               dispatched.
//             </li>
//             <li>
//               Shipping is free for orders above <strong>Ksh 10,000</strong>{" "}
//               nationwide.
//             </li>
//             <li>
//               Same-day delivery may be available within Nanyuki for orders
//               placed before 1 PM.
//             </li>
//           </ul>
//           <p className="mt-3">
//             If you have specific delivery needs around Nanyuki estates or
//             neighboring towns, contact our delivery support.
//           </p>
//         </>
//       ),
//     },
//   };

//   const TikTokIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 256 256"
//     fill="currentColor"
//     className="w-5 h-5"
//   >
//     <path d="M232 64.5v33.3a93.7 93.7 0 0 1-53.4-16.5v78.7a80 80 0 1 1-80-80 77.3 77.3 0 0 1 16 1.7v34.2a46.2 46.2 0 1 0 32 44.1V24h32a62.1 62.1 0 0 0 53.4 40.5Z" />
//   </svg>
// );


//   return (
//     <>
//       <footer className="bg-black text-white py-12 px-6 mt-20">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-12 sm:text-left">
//           {/* Branding */}
//           <div>
//             <h3 className="text-2xl font-bold mb-3 tracking-wide text-yellow-500 text-center sm:text-left">
//               Pak Fashions
//             </h3>
//             <p className="text-sm text-gray-400 max-w-xs mx-auto sm:mx-0 leading-relaxed">
//               Clothes designed with passion, inspired by culture. Made with love
//               in Kenya.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <nav>
//             <h4 className="text-xl font-semibold mb-4 text-yellow-400">
//               Quick Links
//             </h4>
//             <ul className="space-y-3 text-sm font-medium">
//               {[
//                 "Home",
//                 "Shop",
//                 "Blog",
//                 "About",
//                 "Contact",
//                 "FAQs",
//                 "Testimonials",
//               ].map((page) => (
//                 <li key={page}>
//                   <Link
//                     to={`/${page.toLowerCase()}`}
//                     className="hover:text-yellow-500 transition-colors"
//                   >
//                     {page}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Help & Info (Modal-based) */}
//           <div>
//             <h4 className="text-xl font-semibold mb-4 text-yellow-400">
//               Help & Info
//             </h4>
//             <ul className="space-y-3 text-sm font-medium">
//               {[
//                 { key: "shipping", label: "Shipping Information" },
//                 { key: "returns", label: "Return Policy" },
//                 { key: "privacy", label: "Privacy Policy" },
//                 { key: "terms", label: "Terms of Service" },
//               ].map(({ key, label }) => (
//                 <li key={key}>
//                   <button
//                     onClick={() => setActiveModal(key)}
//                     className="hover:text-yellow-500 transition-colors focus:outline-none"
//                   >
//                     {label}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact & Social */}
//           <div>
//             <h4 className="text-xl font-semibold mb-4 text-yellow-400">
//               Contact Us
//             </h4>
//             <p className="text-sm text-gray-400 mb-2">
//               Email: pakfashionske@gmail.com
//             </p>
//             <p className="text-sm text-gray-400 mb-4">
//               Phone: +254 724 835785&nbsp;|&nbsp;+254 720 146386
//             </p>
//             <p className="text-sm text-gray-400 mb-6">
//               Working Hours: Mon–Sun, 7am–9pm
//             </p>
//             <div className="flex justify-center sm:justify-start gap-5">
//               {[
//                 {
//                   href: "https://web.facebook.com/PAKFASHIONSKE",
//                   icon: <Facebook />,
//                   label: "Facebook",
//                 },
//                 {
//                   href: "https://www.instagram.com/pakfashionske?igsh=MXZsbXd3YnRhamltYg==",
//                   icon: <Instagram />,
//                   label: "Instagram",
//                 },
//                 // {
//                 //   href: "mailto:pakfashionske@gmail.com",
//                 //   icon: <Mail />,
//                 //   label: "Email",
//                 // },
//                 {
//                   href: "https://www.tiktok.com/@pak.fashions?_t=ZM-8yA1gcZDqD8&_r=1",
//                   icon: <TikTokIcon />,
//                   label: "TikTok",
//                 },
//               ].map(({ href, icon, label }) => (
//                 <a
//                   key={label}
//                   href={href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={label}
//                   className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-600 hover:bg-yellow-700 transition text-white shadow-md"
//                 >
//                   {icon}
//                 </a>
//               ))}
//             </div>
//              {/* Newsletter */}
//         <section
//           className="text-center text-white mt-4"
//         >
//           <p className="text-2xl font-bold text-yellow-400 mb-4">
//             Join Our Community
//           </p>
//           <form
//             className="flex flex-col sm:flex-row gap-4 justify-center mt-6"
//             onSubmit={handleSubscribe}
//           >
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="px-5 py-3 rounded text-black focus:ring-yellow-400"
//             />
//             <button
//               type="submit"
//               className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full hover:scale-105 transform transition"
//             >
//               Subscribe
//             </button>
//           </form>
//         </section>
//           </div>
         
//         </div>

//         <div className="border-t border-gray-700 mt-12 pt-6 text-sm text-gray-400 text-center">
//           &copy; {new Date().getFullYear()} Pak Fashions. All rights reserved.
//         </div>
//       </footer>

//       {/* Modal Display */}
//       {activeModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
//           <div className="bg-white rounded-xl max-w-lg w-full p-8 relative shadow-lg">
//             <button
//               onClick={closeModal}
//               className="absolute top-3 right-4 text-2xl font-bold text-gray-400 hover:text-red-600 transition focus:outline-none"
//               aria-label="Close modal"
//             >
//               ×
//             </button>
//             <h2 className="text-xl font-bold mb-5 text-gray-900">
//               {modalContent[activeModal].title}
//             </h2>
//             <div className="text-gray-700 text-sm leading-relaxed">
//               {modalContent[activeModal].content}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Footer;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, PhoneCall, MapPin } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Footer() {
  const [activeModal, setActiveModal] = useState(null);
  const [email, setEmail] = useState("");

  const closeModal = () => setActiveModal(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${SERVER_URL}/api/subscribe`, { email });
      toast.success("Thanks for subscribing!");
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Subscription failed!");
    }
  };

  /* ---------- MODAL CONTENT ---------- */
  const modalContent = {
    terms: {
      title: "Terms of Service",
      content: (
        <>
          <p className="mb-3">
            Welcome to <strong>TECHHUB</strong>. By using our platform, you agree to follow our terms.
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>All orders depend on stock availability.</li>
            <li>Prices may change without prior notice.</li>
            <li>Device descriptions are updated regularly.</li>
            <li>By ordering, you confirm that your details are accurate.</li>
          </ul>
        </>
      ),
    },

    returns: {
      title: "Return & Exchange Policy",
      content: (
        <>
          <p className="mb-3">
            Your satisfaction is important to us. TECHHUB accepts returns under the following conditions:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Returns accepted within <strong>7 days</strong> of delivery.</li>
            <li>Device must be unused and in original packaging.</li>
            <li>Faulty devices can be returned at no extra cost.</li>
            <li>Clearance items are non-returnable.</li>
          </ul>
        </>
      ),
    },

    privacy: {
      title: "Privacy Policy",
      content: (
        <>
          <p className="mb-3">
            We value your privacy and keep your data secure.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>We only collect information necessary for order processing.</li>
            <li>Your contact details are never sold or misused.</li>
            <li>Payments are handled through secure encrypted gateways.</li>
            <li>You may request account deletion at any time.</li>
          </ul>
        </>
      ),
    },

    shipping: {
      title: "Shipping Information",
      content: (
        <>
          <p className="mb-3">TECHHUB ships fast and reliably across Kenya.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Processing time: 24–48 hours.</li>
            <li>Delivery within Nairobi: Same day or next day.</li>
            <li>Countrywide delivery: 1–4 days via trusted couriers.</li>
            <li>Free delivery for orders above <strong>Ksh 10,000</strong>.</li>
          </ul>
        </>
      ),
    },
  };

  const TikTokIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className="w-5 h-5">
      <path d="M232 64.5v33.3a93.7 93.7 0 0 1-53.4-16.5v78.7a80 80 0 1 1-80-80 77.3 77.3 0 0 1 16 1.7v34.2a46.2 46.2 0 1 0 32 44.1V24h32a62.1 62.1 0 0 0 53.4 40.5Z" />
    </svg>
  );

  return (
    <>
      <footer className="bg-black text-white py-14 px-6 border-t border-blue-700/20 mt-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-12">

          {/* ---------- BRAND ---------- */}
          <div>
            <h3 className="text-3xl font-extrabold text-blue-600 tracking-wide mb-3">
              TECH<span className="text-white">HUB</span>
            </h3>
            <p className="text-gray-400 text-sm max-w-xs">
              Latest smartphones, accessories & tech gadgets delivered across Kenya.
            </p>

            <div className="mt-6 space-y-2 text-gray-300 text-sm">
              <p className="flex items-center gap-2"><PhoneCall size={16} /> +254 712 345 678</p>
              <p className="flex items-center gap-2"><Mail size={16} /> support@techhub.co.ke</p>
              <p className="flex items-center gap-2"><MapPin size={16} /> Nairobi, Kenya</p>
            </div>
          </div>

          {/* ---------- PHONES ---------- */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-blue-500">Phones</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {[
                "Oppo",
                "Samsung",
                "Tecno",
                "Infinix",
                "Redmi",
              ].map((brand) => (
                <li key={brand}>
                  <Link
                    to={`/category/${brand.toLowerCase()}`}
                    className="hover:text-blue-400 transition"
                  >
                    {brand}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- ACCESSORIES ---------- */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-blue-500">Accessories</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/category/accessories" className="hover:text-blue-400">All Accessories</Link></li>
              <li><Link to="/category/audio" className="hover:text-blue-400">Audio</Link></li>
              <li><Link to="/category/chargers" className="hover:text-blue-400">Chargers</Link></li>
              <li><Link to="/category/cables" className="hover:text-blue-400">Cables</Link></li>
              <li><Link to="/category/cases" className="hover:text-blue-400">Phone Cases</Link></li>
              <li><Link to="/category/wearables" className="hover:text-blue-400">Wearables</Link></li>
            </ul>
          </div>

          {/* ---------- HELP & NEWSLETTER ---------- */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-blue-500">Help & Info</h4>
            <ul className="space-y-3 text-sm">
              {[
                { key: "shipping", label: "Shipping Info" },
                { key: "returns", label: "Return Policy" },
                { key: "privacy", label: "Privacy Policy" },
                { key: "terms", label: "Terms of Service" },
              ].map(({ key, label }) => (
                <li key={key}>
                  <button
                    onClick={() => setActiveModal(key)}
                    className="hover:text-blue-400 transition"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-300 mb-3">
                Join our newsletter
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 text-black rounded focus:ring-2 focus:ring-blue-600 w-full"
                />
                <button
                  type="submit"
                  className="bg-blue-600 px-4 py-2 rounded text-white font-semibold hover:bg-blue-700"
                >
                  Go
                </button>
              </form>
            </div>

            {/* Socials */}
            <div className="flex gap-4 mt-6">
              {[
                { href: "#", icon: <Facebook /> },
                { href: "#", icon: <Instagram /> },
                { href: "#", icon: <TikTokIcon /> },
              ].map(({ href, icon }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 rounded-full text-white"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- COPYRIGHT ---------- */}
        <p className="text-center text-gray-500 text-sm mt-10 pt-6 border-t border-gray-700/40">
          © {new Date().getFullYear()} TECHHUB. All rights reserved.
        </p>
      </footer>

      {/* ---------- MODAL ---------- */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-8 relative shadow-xl">
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-600"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-5">{modalContent[activeModal].title}</h2>
            <div className="text-gray-700 text-sm">{modalContent[activeModal].content}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;
