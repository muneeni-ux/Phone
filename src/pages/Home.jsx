import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  ArrowRight,
  Truck,
  Sparkles,
  Users,
  Gift,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Clock, // New icon for countdown
  Zap, // New icon for Black Friday
  Smartphone,
  PhoneCall,
  Shield,
  CreditCard,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useCart } from "../context/CartContext";


// --- START: Data Constants (Updated with modern imagery) ---
// NOTE: Replaced all /mnt/data paths with live, public URLs for a legit feel.

const fontLink = (
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700;800&display=swap"
    rel="stylesheet"
  />
);

// Helper function for a simple countdown (frontend-only)
const calculateTimeLeft = () => {
  const targetDate = new Date("2025-12-6T00:00:00").getTime(); // Example date: Black Friday
  const now = new Date().getTime();
  const difference = targetDate > now ? targetDate - now : 0;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

// Static hero slides (background images + content)
const HERO_SLIDES = [
  {
    id: 1,
    title: "The Future is 5G: Next-Gen Smartphones",
    subtitle:
      "Powerful specs, sleek design, and unbeatable value. Upgrade today.",
    cta: "Shop Latest Phones",
    ctaTo: "/shop",
    image:
      "https://phones.co.ke/wp-content/uploads/2024/03/latest-xiaomi-phones-in-kenya.png", // Modern phone setup
    accent: "blue",
  },
  {
    id: 2,
    title: "Accessories Engineered for Speed",
    subtitle:
      "Charge faster and connect flawlessly with certified cables and chargers.",
    cta: "Shop Accessories",
    ctaTo: "/category/accessories",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbtbLRZmbQX0XWAUMsNEXIm2PhxAvTCl2VXg&s", // Cables/Chargers
    accent: "teal",
  },
  {
    id: 3,
    title: "Immersive Audio That Moves You",
    subtitle:
      "Find your rhythm with our collection of wireless earphones and headphones.",
    cta: "Shop Audio Gear",
    ctaTo: "/category/audio",
    image:
      "https://images-cdn.ubuy.com.sa/633b592a8533e3784d18e9d4-usb-c-headphones-usb-type-c-earphones.jpg", // Headphones
    accent: "purple",
  },
];

// Popular brands (using placeholder images or simple colored containers)
const POPULAR_BRANDS = [
  { name: "Oppo", logo: <Smartphone size={24} className="text-green-500" /> },
  { name: "Infinix", logo: <Smartphone size={24} className="text-red-500" /> },
  { name: "iPhone", logo: <Smartphone size={24} className="text-gray-900" /> },
  { name: "Samsung", logo: <Smartphone size={24} className="text-blue-500" /> },
  {
    name: "Realme",
    logo: <Smartphone size={24} className="text-yellow-500" />,
  },
  { name: "Redmi", logo: <Smartphone size={24} className="text-orange-500" /> },
  { name: "Tecno", logo: <Smartphone size={24} className="text-purple-500" /> },
  { name: "Vivo", logo: <Smartphone size={24} className="text-indigo-500" /> },
  { name: "ZTE", logo: <Smartphone size={24} className="text-indigo-500" /> },
];

// Sample trending products (static)
const TRENDING = [
  {
    id: "t1",
    name: "Tecno Spark 20 Pro",
    price: 18999,
    oldPrice: 20500,
    discount: 7,
    image:
      "https://d13pvy8xd75yde.cloudfront.net/global/phones/camon/video/camon40/pc.jpg", // Tecno lookalike
  },
  {
    id: "t2",
    name: "Vivo V40 5G (256GB)",
    price: 32900,
    oldPrice: 35000,
    discount: 6,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHwCDFX6krr8g7gLJiCqU6n9Vjyg5SaKFFeg&s", // Vivo lookalike
  },
  {
    id: "t3",
    name: "Infinix Note 40 Pro",
    price: 26999,
    oldPrice: 31000,
    discount: 13,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgQ8FuRJoRxwW6aMLcTdoVdoyxIEpNKC9Dvw&s", // Infinix lookalike
  },
  {
    id: "t4",
    name: "Redmi 13 Ultra",
    price: 15499,
    oldPrice: 17000,
    discount: 9,
    image:
      "https://i02.appmifile.com/541_operatorx_operatorx_opx/22/08/2025/c15b4756b67078d1129a0f13ecb9aff4.png?thumb=1&w=400&q=85", // Redmi lookalike
  },
];

// Sample loan phones promo items (Updated with better image URLs)
const LOAN_PHONES = [
  {
    id: "loan1",
    brand: "Oppo",
    name: "Oppo A18 Loan",
    price: 1500,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiBbZju83rc8oIv42V6uaGs82fxtP7iZ2Zgw&s", // Phone on stand
  },
  {
    id: "loan2",
    brand: "Redmi",
    name: "Redmi 12 Loan",
    price: 1200,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH2Uc57wWaLYl6y0qNA0eZ-K-pCjiSy0do5w&s", // Red phone in hand
  },
  {
    id: "loan3",
    brand: "Infinix",
    name: "Infinix Hot 30i",
    price: 1350,
    image:
      "https://www.phoneplacekenya.com/wp-content/uploads/2024/09/Oppo-A3x-4G-a.jpg", // Green phone
  },
];

const PERKS = [
  {
    icon: <Truck className="h-8 w-8 text-white" />,
    title: "Fast Delivery",
    description: "Reliable shipping across all 47 counties in Kenya.",
  },
  {
    icon: <Shield className="h-8 w-8 text-white" />,
    title: "Genuine Products",
    description:
      "100% authentic, warrantied devices and certified accessories.",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-white" />,
    title: "Flexible Payment",
    description: "Lipa Pole Pole and various M-Pesa payment options available.",
  },
  {
    icon: <PhoneCall className="h-8 w-8 text-white" />,
    title: "24/7 Support",
    description: "Get immediate help from our dedicated support team.",
  },
];
// --- END: Data Constants ---

function Home() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [index, setIndex] = useState(0);
  const slideRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });

    // Autoplay Carousel
    const slideId = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 5000);

    // Countdown Timer
    const timerId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(slideId);
      clearInterval(timerId);
    };
  }, []);

  const prev = () =>
    setIndex((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const next = () => setIndex((i) => (i + 1) % HERO_SLIDES.length);

 const { addToCart, cartItems } = useCart();


  const timerDisplay = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Mins" },
    { value: timeLeft.seconds, label: "Secs" },
  ];

  return (
    <>
      <Helmet>
        <title>TECHHUB — Premium Phones & Accessories | Lipa Pole Pole</title>
        <meta
          name="description"
          content="TECHHUB – Latest smartphones and accessories from Oppo, Redmi, Vivo, and Tecno. Flexible Lipa Pole Pole options available."
        />
      </Helmet>
      {fontLink}

      <main
        className="min-h-screen bg-gray-50 text-gray-900"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* --- BLACK FRIDAY PROMO (New Section) --- */}
        <section className="bg-gray-900 py-4 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between">
            <div className="flex items-center gap-4 mb-3 md:mb-0">
              <Zap
                size={30}
                className="text-yellow-400 fill-yellow-400 animate-pulse"
              />
              <h3 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wider">
                Black Friday Sale
              </h3>
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center space-x-3">
              <Clock size={20} className="text-blue-400" />
              {timerDisplay.map((t, i) => (
                <div
                  key={i}
                  className="text-center bg-gray-800 p-2 rounded-lg min-w-[50px]"
                >
                  <span className="text-xl font-bold text-yellow-400 leading-none">
                    {t.value.toString().padStart(2, "0")}
                  </span>
                  <p className="text-xs text-gray-400">{t.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- HERO SECTION --- */}
        <section className="relative overflow-hidden shadow-lg">
          <div className="relative h-[62vh] md:h-[72vh]">
            {/* Slides */}
            <div
              ref={slideRef}
              className="absolute inset-0 flex transition-transform duration-700"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {HERO_SLIDES.map((s) => (
                <div
                  key={s.id}
                  className="min-w-full h-full bg-cover bg-center relative flex items-center justify-start"
                  style={{
                    // Darker gradient for better text contrast
                    backgroundImage: `linear-gradient(to right, rgba(2,6,23,0.7), rgba(2,6,23,0.2)), url('${s.image}')`,
                  }}
                >
                  <div className="max-w-4xl px-6 md:px-12 text-left">
                    <h2
                      className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-xl"
                      data-aos="fade-up"
                    >
                      {s.title}
                    </h2>
                    <p
                      className="mt-4 text-lg md:text-xl text-blue-200 max-w-xl"
                      data-aos="fade-up"
                      data-aos-delay="80"
                    >
                      {s.subtitle}
                    </p>
                    <div
                      className="mt-8 flex justify-start gap-4"
                      data-aos="fade-up"
                      data-aos-delay="160"
                    >
                      <Link to={s.ctaTo}>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition transform hover:scale-105 shadow-xl">
                          {s.cta}{" "}
                          <ArrowRight className="inline ml-2" size={20} />
                        </button>
                      </Link>
                      <Link to="/contact">
                        <button className="bg-transparent border-2 border-white/50 text-white px-8 py-4 rounded-full hover:bg-white/10 transition font-semibold">
                          Contact Us
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* arrows */}
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full shadow-xl transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full shadow-xl transition"
            >
              <ChevronRight size={24} />
            </button>

            {/* small dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-3 h-3 rounded-full transition ${
                    i === index
                      ? "bg-blue-500 ring-2 ring-white"
                      : "bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
        {/* --- POPULAR BRANDS (MOVED TO TOP) --- */}
        <section className="py-16 px-6 bg-white shadow-md">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-extrabold text-gray-800 mb-10 text-center">
              Top Smartphone Brands
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-9 gap-4 md:gap-6">
              {POPULAR_BRANDS.map((brand, i) => (
                <Link
                  key={brand.name}
                  to={`/category/${brand.name.toLowerCase()}`}
                  className="group"
                  data-aos="fade-up"
                  data-aos-delay={i * 50}
                >
                  <div
                    className="bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center shadow-lg hover:shadow-xl hover:bg-blue-50 transition duration-300 transform hover:-translate-y-1 border-b-4 border-transparent hover:border-blue-600"
                    title={brand.name}
                  >
                    <div className="w-12 h-12 flex items-center justify-center mb-3 text-blue-600">
                      {brand.logo}
                    </div>
                    <div className="text-sm font-bold text-gray-800">
                      {brand.name}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        {/* --- TRENDING OFFERS --- */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-3xl font-extrabold text-gray-800 border-b-4 border-blue-600 pb-1">
                🔥 Hot Trending Offers
              </h3>
              <Link
                to="/shop"
                className="text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 transition"
              >
                View All Deals <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {TRENDING.map((p) => (
                <article
                  key={p.id}
                  className="relative group bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100"
                  data-aos="fade-up"
                >
                  {/* The main product area is wrapped in Link to enable redirection */}
                  <Link to={`/product/${p.id}`}>
                    {/* discount badge */}
                    <div className="absolute left-3 top-3 z-10">
                      <div className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">
                        SAVE {p.discount}%
                      </div>
                    </div>

                    {/* image area */}
                    <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full object-contain transform group-hover:scale-105 transition duration-500 p-4"
                      />
                    </div>

                    <div className="p-4 md:p-5 text-center">
                      <h4 className="font-bold text-base mb-1 truncate">
                        {p.name}
                      </h4>
                      <div className="flex flex-col items-center gap-1 mt-2">
                        <span className="text-red-600 font-extrabold text-xl">
                          KSh {p.price.toLocaleString()}
                        </span>
                        <span className="text-gray-400 text-xs line-through">
                          KSh {p.oldPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Add to Cart Button remains separate outside the main Link */}
                  {/* The hover overlay is replaced by a simple button for clarity */}
                  <div className="p-4 pt-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the parent link from firing
                        addToCart(p);
                      }}
                      className="w-full bg-blue-600 text-white px-6 py-2 rounded-full flex items-center justify-center gap-2 font-bold shadow-lg transform hover:bg-blue-700 transition"
                    >
                      <ShoppingCart size={18} /> Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* --- OPPO & REDMI LOAN PHONES (New Section - Lipa Mdogo Mdogo Style) --- */}
        <section className="py-16 px-6 bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-inner">
          <div className="max-w-7xl mx-auto">
            <h3
              className="text-3xl font-extrabold mb-4 text-yellow-300 border-b-2 border-yellow-300 pb-1 inline-block"
              data-aos="fade-right"
            >
              Lipa Mdogo Mdogo
            </h3>
            <p
              className="text-blue-100 text-lg mb-10"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              Get the latest **Oppo & Redmi** phones on flexible installment
              plans. Starting low, paying easy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {LOAN_PHONES.map((lp, i) => (
                <div
                  key={lp.id}
                  className="bg-white rounded-xl p-6 flex flex-col items-center text-center shadow-2xl hover:scale-[1.02] transition duration-300"
                  data-aos="zoom-in"
                  data-aos-delay={i * 150}
                >
                  <img
                    src={lp.image}
                    alt={lp.name}
                    className="w-36 h-36 object-cover rounded-full mb-4 ring-4 ring-blue-500 ring-offset-2 bg-gray-100"
                  />
                  <div className="text-gray-900">
                    <h4 className="font-extrabold text-xl mb-1">{lp.name}</h4>
                    <p className="text-sm text-gray-600">
                      **{lp.brand}** - Low deposit
                    </p>
                    <div className="mt-3">
                      <p className="text-3xl font-extrabold text-red-600">
                        KSh {lp.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Deposit</p>
                    </div>
                  </div>
                  <Link to="/lipa-pole-pole" className="mt-5 w-full">
                    <button className="bg-yellow-400 text-gray-900 font-bold py-3 rounded-full w-full hover:bg-yellow-500 transition">
                      Apply Now
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- VIVO LIPA POLE POLE BANNER (New Section) --- */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div
              className="bg-purple-600 text-white p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between shadow-2xl overflow-hidden"
              data-aos="fade-up"
            >
              <div className="md:w-1/2">
                <h3 className="text-4xl font-extrabold mb-3 leading-tight">
                  <span className="text-yellow-400">VIVO</span>: Lipa Pole Pole
                </h3>
                <p className="text-purple-100 text-lg mb-6">
                  Experience premium Vivo phones with easy weekly or monthly
                  installments. Get approval in minutes!
                </p>
                <Link to="/vivo-pole-pole">
                  <button className="bg-white text-purple-700 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition shadow-lg">
                    Check Eligibility{" "}
                    <ArrowRight className="inline ml-2" size={18} />
                  </button>
                </Link>
              </div>
              {/* Decorative Image */}
              <div className="md:w-1/2 mt-8 md:mt-0 flex justify-end">
                <img
                  src="https://i02.appmifile.com/541_operatorx_operatorx_opx/22/08/2025/c15b4756b67078d1129a0f13ecb9aff4.png?thumb=1&w=400&q=85" // Vivo phone example
                  alt="Vivo Lipa Pole Pole"
                  className="w-40 h-auto md:w-64 rotate-6 transform translate-x-4 shadow-2xl rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why TECHHUB (neon perks) */}
        <section className="py-12 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-extrabold text-white mb-6 text-center">
              Why Shop With TECHHUB?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {PERKS.map((perk, i) => (
                <div
                  key={i}
                  data-aos="fade-up"
                  className="bg-gradient-to-tr from-blue-700 to-indigo-700 p-6 rounded-2xl shadow-2xl transform hover:-translate-y-1 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-3 rounded-lg">
                      {perk.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold">{perk.title}</h4>
                      <p className="text-blue-100 text-sm mt-1">
                        {perk.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-3xl font-extrabold text-gray-800 border-b-4 border-blue-600 pb-1">
                CURVED DISPLAYS
              </h3>
              <Link
                to="/shop"
                className="text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 transition"
              >
                View All Deals <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {TRENDING.map((p) => (
                <article
                  key={p.id}
                  className="relative group bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100"
                  data-aos="fade-up"
                >
                  {/* The main product area is wrapped in Link to enable redirection */}
                  <Link to={`/product/${p.id}`}>
                    {/* discount badge */}
                    <div className="absolute left-3 top-3 z-10">
                      <div className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-md">
                        SAVE {p.discount}%
                      </div>
                    </div>

                    {/* image area */}
                    <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full object-contain transform group-hover:scale-105 transition duration-500 p-4"
                      />
                    </div>

                    <div className="p-4 md:p-5 text-center">
                      <h4 className="font-bold text-base mb-1 truncate">
                        {p.name}
                      </h4>
                      <div className="flex flex-col items-center gap-1 mt-2">
                        <span className="text-red-600 font-extrabold text-xl">
                          KSh {p.price.toLocaleString()}
                        </span>
                        <span className="text-gray-400 text-xs line-through">
                          KSh {p.oldPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Add to Cart Button remains separate outside the main Link */}
                  <div className="p-4 pt-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the parent link from firing
                        addToCart(p);
                      }}
                      className="w-full bg-blue-600 text-white px-6 py-2 rounded-full flex items-center justify-center gap-2 font-bold shadow-lg transform hover:bg-blue-700 transition"
                    >
                      <ShoppingCart size={18} /> Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        {/* --- TESTIMONIALS / CTA --- */}
        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center border-t border-gray-200 pt-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Rated Excellent by Our Customers
            </h3>
            <blockquote className="text-gray-600 max-w-3xl mx-auto italic border-l-4 border-blue-600 pl-4 py-2 my-6">
              “The service was incredible, and the Lipa Pole Pole option made my
              upgrade seamless. Fast shipping to Kisumu! I highly recommend
              TECHHUB.” —{" "}
              <cite className="font-semibold not-italic text-gray-800">
                Jane W., Verified Buyer
              </cite>
            </blockquote>
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 mt-4 text-blue-600 font-bold hover:text-blue-800 transition"
            >
              Read All Customer Reviews <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;