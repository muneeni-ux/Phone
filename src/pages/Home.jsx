// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import axios from "axios";
// import { ArrowRight, Truck, Sparkles, Users, Gift } from "lucide-react";
// import { Helmet } from "react-helmet-async";

// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

// const fontLink = (
//   <link
//     href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap"
//     rel="stylesheet"
//   />
// );
// const perks = [
//   {
//     icon: <Truck className="h-8 w-8 text-yellow-500" />,
//     title: "Fast & Global Delivery",
//     description: "From Nanyuki to the world – get your order wherever you are!",
//   },
//   {
//     icon: <Sparkles className="h-8 w-8 text-yellow-500" />,
//     title: "New Styles Weekly",
//     description:
//       "Fresh drops every week. Follow us @pakfashions to stay trendy.",
//   },
//   {
//     icon: <Users className="h-8 w-8 text-yellow-500" />,
//     title: "Loved by Fashionistas",
//     description: "Hundreds of happy icons across Kenya and beyond!",
//   },
//   {
//     icon: <Gift className="h-8 w-8 text-yellow-500" />,
//     title: "Give the Gift of Style",
//     description: "We offer stylish gift cards for your loved ones.",
//   },
// ];
// function Home() {
//   const [featured, setFeatured] = useState([]);
//   // const [blogs, setBlogs] = useState([]);
//   // const [faq, setFaq] = useState([]);
//   const [testimonials, setTestimonials] = useState([]);
//   const [newArrivals, setNewArrivals] = useState([]);
//   const [bestSeller, setBestSeller] = useState([]);
//   useEffect(() => {
//     AOS.init({ duration: 1100, once: true });
//     // Fetch all dynamic content
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [
//         featuredRes,
//         // faqRes,
//         testimonialsRes,
//         newArrivalsRes,
//         bestSellerRes,
//       ] = await Promise.all([
//         axios.get(`${SERVER_URL}/api/products?category=Clearance Sale&limit=4`),
//         // axios.get(`${SERVER_URL}/api/blogs?limit=3`),
//         // axios.get(`${SERVER_URL}/api/faq`),
//         axios.get(`${SERVER_URL}/api/testimonials`),
//         axios.get(`${SERVER_URL}/api/products?tag=New Arrival&limit=4`),
//         axios.get(`${SERVER_URL}/api/products?tag=Bestseller&limit=4`),
//       ]);

//       setFeatured(featuredRes.data);
//       // setBlogs(blogsRes.data);
//       // setFaq(faqRes.data);
//       setTestimonials(testimonialsRes.data);
//       setNewArrivals(newArrivalsRes.data);
//       setBestSeller(bestSellerRes.data);
//     } catch (error) {
//       console.error("Failed to fetch homepage data:", error);
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Pak Fashions | Stylish, Affordable Clothing in Kenya</title>
//         <meta
//           name="description"
//           content="Shop Pak Fashions for elegant, affordable men's, women's, and kids' clothing, shoes, bags & accessories. Based in Nanyuki, Laikipia."
//         />
//         <meta
//           name="keywords"
//           content="pak fashions, stylish clothes, affordable fashion Kenya, Nanyuki fashion, Laikipia fashion, elegant wear, thrift fashion"
//         />
//         <meta name="author" content="Pak Fashions developer (~frank)" />
//         <meta name="robots" content="index, follow" />

//         {/* Open Graph for Facebook, WhatsApp */}
//         <meta
//           property="og:title"
//           content="Pak Fashions | Unleash Your Elegance"
//         />
//         <meta
//           property="og:description"
//           content="Affordable, trendy fashion for men, women, and kids. Located in Nanyuki 🌸 Fast delivery. 🌍"
//         />
//         <meta
//           property="og:image"
//           content="https://pakfashions.co.ke/PakFashions-logo.jpg"
//         />
//         <meta property="og:url" content="https://pakfashions.co.ke" />
//         <meta property="og:type" content="website" />

//         {/* Twitter Card (optional) */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content="Pak Fashions" />
//         <meta
//           name="twitter:description"
//           content="Affordable, sustainable fashion in Kenya. For men, women, and kids."
//         />
//         <meta
//           name="twitter:image"
//           content="https://pakfashions.co.ke/PakFashions-logo.jpg"
//         />

//         {/* JSON-LD Structured Data */}
//         <script type="application/ld+json">
//           {JSON.stringify({
//             "@context": "https://schema.org",
//             "@type": "ClothingStore",
//             name: "Pak Fashions",
//             image: "https://pakfashions.co.ke/PakFashions-logo.jpg",
//             description:
//               "Stylish and affordable clothing store for men, women, and kids. Based in Nanyuki, Laikipia, Kenya.",
//             address: {
//               "@type": "PostalAddress",
//               streetAddress: "237G+MQ6, Nanyuki",
//               addressLocality: "Nanyuki",
//               addressRegion: "Laikipia",
//               addressCountry: "KE",
//             },
//             telephone: "+254 726 329 260",
//             email: "info@pakfashion.co.za",
//             url: "https://pakfashions.co.ke",
//             sameAs: [
//               "https://web.facebook.com/PAKFASHIONSKE",
//               "https://www.instagram.com/pakfashionske?igsh=MXZsbXd3YnRhamltYg==",
//             ],
//             openingHours: "Mo-Su 07:00-21:00",
//           })}
//         </script>
//       </Helmet>
//       {fontLink}
//       <main
//         className="min-h-screen bg-white text-black"
//         style={{ fontFamily: "'Poppins', sans-serif" }}
//       >
//         {/* Hero Section */}
//         <section
//           className="relative flex flex-col justify-center items-center text-center px-6 h-[50vh] md:h-auto py-20 md:py-40 bg-cover bg-center bg-black text-white"
//           // style={{
//           //   backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.7), rgba(0,0,0,0.7)), url('./PakFashionslogo.jpg')`,
//           // }}
//         >
//           <h1
//             className="text-4xl md:text-6xl font-extrabold drop-shadow mt-8"
//             data-aos="fade-down"
//           >
//             <span className="text-yellow-600">Where style meets </span>{" "}
//             <br />
//             every generation{" "}
//           </h1>
//           <p
//             className="mt-4 md:mt-6 max-w-xl text-base md:text-xl text-yellow-100 font-medium"
//             data-aos="fade-up"
//           >
//             Fashion that fits you and your budget.
//           </p>
//           <Link to="/shop" className="mt-6 md:mt-10" data-aos="zoom-in">
//             <button className="bg-yellow-500 text-black font-semibold px-8 md:px-10 py-3 md:py-4 rounded-full shadow hover:brightness-110 transform hover:scale-105 transition">
//               Shop Now
//             </button>
//           </Link>
//         </section>

//         {/* About Section */}
//         {/* <section className="py-20 px-6 bg-white text-center">
//           <h2
//             className="text-4xl font-bold text-yellow-600 mb-6"
//             data-aos="fade-up"
//           >
//             Why Choose Pak Fashion?
//           </h2>
//           <p
//             className="text-lg max-w-3xl mx-auto text-gray-700 font-medium"
//             data-aos="fade-up"
//             data-aos-delay="150"
//           >
//             We believe in fashion that’s affordable, sustainable, and stylish.
//             Our carefully curated collection offers trendy options supporting
//             the community and making the world a beautiful place.
//           </p>
//         </section> */}

//         {/* New Arrivals*/}
//         <section className="bg-yellow-50 py-20 px-6">
//           <h2
//             className="text-4xl font-bold text-center text-black mb-14"
//             data-aos="fade-up"
//           >
//             New Arrivals
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
//             {newArrivals.map((item, index) => (
//               <Link to={`/product/${item._id}`}>
//                 <div
//                   key={item._id}
//                   className="bg-white rounded-lg p-6 shadow hover:shadow-xl hover:-translate-y-2 transition transform"
//                   data-aos="zoom-in"
//                   data-aos-delay={index * 150}
//                 >
//                   <div
//                     className="h-56 bg-cover bg-center rounded-lg mb-4"
//                     style={{ backgroundImage: `url(${item.image})` }}
//                   ></div>
//                   <h3 className="text-xl font-bold text-yellow-600 mb-2">
//                     {item.name}
//                   </h3>
//                   <p className="text-gray-600 mb-3 text-sm">
//                     {item.description}
//                   </p>
//                   <span className="text-black font-semibold">
//                     ksh {item.price}
//                   </span>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>

//         <section className="bg-yellow-50 py-20 px-6">
//           <h2
//             className="text-4xl font-bold text-center text-black mb-14"
//             data-aos="fade-up"
//           >
//             Sale upto 50% Off
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
//             {featured.map((item, index) => (
//               <Link to={`/product/${item._id}`}>
//                 <div
//                   key={item._id}
//                   className="bg-white rounded-lg p-6 shadow hover:shadow-xl hover:-translate-y-2 transition transform"
//                   data-aos="zoom-in"
//                   data-aos-delay={index * 150}
//                 >
//                   <div
//                     className="h-56 bg-cover bg-center rounded-lg mb-4"
//                     style={{ backgroundImage: `url(${item.image})` }}
//                   ></div>
//                   <h3 className="text-xl font-bold text-yellow-600 mb-2">
//                     {item.name}
//                   </h3>
//                   <p className="text-gray-600 mb-3 text-sm">
//                     {item.description}
//                   </p>
//                   <span className="text-black font-semibold">
//                     ksh {item.price}
//                   </span>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>

//         {/* Best Sellers */}
//         <section className="bg-yellow-50 py-20 px-6">
//           <h2
//             className="text-4xl font-bold text-center text-black mb-14"
//             data-aos="fade-up"
//           >
//             Best Seller
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
//             {bestSeller.map((item, index) => (
//               <Link to={`/product/${item._id}`}>
//                 <div
//                   key={item._id}
//                   className="bg-white rounded-lg p-6 shadow hover:shadow-xl hover:-translate-y-2 transition transform"
//                   data-aos="zoom-in"
//                   data-aos-delay={index * 150}
//                 >
//                   <div
//                     className="h-56 bg-cover bg-center rounded-lg mb-4"
//                     style={{ backgroundImage: `url(${item.image})` }}
//                   ></div>
//                   <h3 className="text-xl font-bold text-yellow-600 mb-2">
//                     {item.name}
//                   </h3>
//                   <p className="text-gray-600 mb-3 text-sm">
//                     {item.description}
//                   </p>
//                   <span className="text-black font-semibold">
//                     ksh {item.price}
//                   </span>
//                 </div>
//               </Link>
//             ))}
//           </div>
//           <div className="text-center mt-10">
//             <Link to="/shop">
//               <button className="bg-yellow-700 text-white px-6 py-2 rounded-lg hover:bg-yellow-800 transition">
//                 View All Products
//               </button>
//             </Link>
//           </div>
//         </section>
//         {/* Blog Section */}
//         {/* <section className="bg-white py-20 px-6">
//           <h2
//             className="text-4xl font-bold text-center text-yellow-600 mb-14"
//             data-aos="fade-up"
//           >
//             Style Tips & Stories from the Blog
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//             {blogs.map((blog, index) => (
//               <div
//                 key={blog._id}
//                 className="bg-yellow-50 p-6 rounded-lg shadow hover:shadow-lg transition"
//                 data-aos="fade-up"
//                 data-aos-delay={index * 100}
//               >
//                 <img
//                   src={`${blog.image}`}
//                   // src={`https://picsum.photos/600/600?random=${index + 1}`}
//                   alt={`Blog ${blog.title}`}
//                   className="rounded mb-4"
//                 />
//                 <h3 className="text-xl font-bold text-black mb-2">
//                   {blog.title}
//                 </h3>
//                 <p className="text-sm text-gray-700 mb-3">{blog.description}</p>
//                 <Link
//                   to={`/blog/${blog._id}`}
//                   className="text-yellow-500 font-medium hover:underline"
//                 >
//                   Read More →
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </section> */}
//         <section className="bg-yellow-50 py-20 px-6">
//           <h2
//             className="text-4xl font-bold text-center text-black mb-12"
//             data-aos="fade-up"
//           >
//             Why Shop With Us?
//           </h2>

//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
//             {perks.map((perk, idx) => (
//               <div
//                 key={idx}
//                 className="bg-black p-6 rounded-2xl shadow hover:shadow-xl text-center transition duration-600 transform hover:-translate-y-1"
//                 data-aos="fade-up"
//                 data-aos-delay={idx * 150}
//               >
//                 <div className="flex justify-center mb-4">{perk.icon}</div>
//                 <h3 className="text-lg font-semibold text-yellow-600 mb-2">
//                   {perk.title}
//                 </h3>
//                 <p className="text-gray-200 text-sm">{perk.description}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Testimonials */}
//         <section className="bg-white py-20 px-6">
//           <h2
//             className="text-4xl font-bold text-center text-yellow-600 mb-12"
//             data-aos="fade-up"
//           >
//             What Our Customers Say
//           </h2>

//           <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//             {testimonials.slice(0, 2).map((testimonial, index) => (
//               <div
//                 key={testimonial._id}
//                 className="bg-yellow-50 p-6 rounded shadow"
//                 data-aos="fade-up"
//                 data-aos-delay={index * 150}
//               >
//                 <p className="italic text-gray-700 mb-3">
//                   "{testimonial.message}"
//                 </p>
//                 <div className="font-semibold text-black">
//                   –{testimonial.name}
//                 </div>
//                 <span className="text-gray-500 text-xs">Verified Buyer</span>
//               </div>
//             ))}
//           </div>
//           <Link
//             to={`/testimonials`}
//             className="text-yellow-500 font-medium hover:underline flex items-center justify-center mt-6"
//           >
//             Read More <ArrowRight className="ml-2" size={18} />
//           </Link>
//         </section>

//         {/* FAQ */}
//         {/* <section className="bg-white py-20 px-6 max-w-4xl mx-auto">
//           <h2
//             className="text-4xl font-bold text-center text-black mb-10"
//             data-aos="fade-up"
//           >
//             Frequently Asked Questions
//           </h2>
//           <div className="space-y-6">
//             {faq.slice(0, 3).map((faq, index) => (
//               <div
//                 key={faq._id}
//                 className="p-5 border border-yellow-600 rounded-lg"
//                 data-aos="fade-up"
//                 data-aos-delay={index * 150}
//               >
//                 <h3 className="text-lg font-bold text-yellow-600 mb-2">
//                   {faq.question}
//                 </h3>
//                 <p className="text-gray-800">{faq.answer}</p>
//               </div>
//             ))}
//             <Link
//               to={`/faqs`}
//               className="text-yellow-500 font-medium hover:underline flex items-center justify-end"
//             >
//               Read More <ArrowRight className="ml-2" size={18} />
//             </Link>
//           </div>
//         </section> */}
//       </main>
//     </>
//   );
// }

// export default Home;

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
  const targetDate = new Date("2025-11-29T00:00:00").getTime(); // Example date: Black Friday
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

  // Cart simulation (frontend-only)
  const [cartCount, setCartCount] = useState(0); // Using this for visual feedback only
  const addToCart = (product) => {
    setCartCount((c) => c + 1);
    // In a real app, you would dispatch an action here.
  };

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
                  to={`/phones/${brand.name.toLowerCase()}`}
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

                  {/* hover overlay action */}
                  <div className="absolute inset-0 bg-blue-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <button
                      onClick={() => addToCart(p)}
                      className="bg-white text-blue-700 px-6 py-3 rounded-full flex items-center gap-2 font-bold shadow-xl transform hover:scale-110 transition"
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

                  {/* hover overlay action */}
                  <div className="absolute inset-0 bg-blue-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <button
                      onClick={() => addToCart(p)}
                      className="bg-white text-blue-700 px-6 py-3 rounded-full flex items-center gap-2 font-bold shadow-xl transform hover:scale-110 transition"
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
