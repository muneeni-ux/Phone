import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, PhoneCall, MapPin } from "lucide-react";
import axios from "axios";
import Toast from "./modal/Toast";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Footer() {
  const [activeModal, setActiveModal] = useState(null);
  const [email, setEmail] = useState("");
  const [toastMsg, setToastMsg] = useState(null);
  const [toastType, setToastType] = useState("info");

  const closeModal = () => setActiveModal(null);

  const showToast = (message, type = "info") => {
    setToastMsg(message);
    setToastType(type);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${SERVER_URL}/api/subscribe`, { email });
      showToast("Thanks for subscribing!", "success");
      setEmail("");
    } catch (err) {
      showToast(err.response?.data?.message || "Subscription failed!", "error");
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
            <li>Delivery within Nakuru: Same day or next day.</li>
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
            <div className="flex mb-3 items-center gap-1">
            <img src="./techHub.png" alt="techHub" className="h-20" />
            <h3 className="text-2xl font-extrabold text-blue-600 tracking-wide ">
              TECH<span className="text-white">HUB</span>
            </h3>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              Latest smartphones, accessories & tech gadgets delivered across Kenya.
            </p>
            <div className="mt-6 space-y-2 text-gray-300 text-sm">
              <p className="flex items-center gap-2"><PhoneCall size={16} /> +254 712 345 678</p>
              <p className="flex items-center gap-2"><Mail size={16} /> support@techhub.co.ke</p>
              <p className="flex items-center gap-2"><MapPin size={16} /> Nakuru, Kenya</p>
            </div>
          </div>

          {/* ---------- PHONES ---------- */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-blue-500">Phones</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              {["Oppo","Samsung","Tecno","Infinix","Redmi"].map((brand) => (
                <li key={brand}>
                  <Link to={`/category/${brand.toLowerCase()}`} className="hover:text-blue-400 transition">{brand}</Link>
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
                  <button onClick={() => setActiveModal(key)} className="hover:text-blue-400 transition">{label}</button>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-300 mb-3">Join our newsletter</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 text-black rounded focus:ring-2 focus:ring-blue-600 w-full"
                />
                <button type="submit" className="bg-blue-600 px-4 py-2 rounded text-white font-semibold hover:bg-blue-700">
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
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 rounded-full text-white">
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
            <button onClick={closeModal} className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-600">×</button>
            <h2 className="text-xl font-bold mb-5">{modalContent[activeModal].title}</h2>
            <div className="text-gray-700 text-sm">{modalContent[activeModal].content}</div>
          </div>
        </div>
      )}

      {/* ---------- TOAST ---------- */}
      {toastMsg && (
        <Toast
          message={toastMsg}
          type={toastType}
          onClose={() => setToastMsg(null)}
        />
      )}
    </>
  );
}

export default Footer;
