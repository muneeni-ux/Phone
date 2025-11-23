// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/scrollTop";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Categories from "./pages/Categories";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import { Toaster } from 'react-hot-toast';
import VisitorTracker from "./components/VisitorTracker";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Subscribed from "./components/Admin/Subscribed";
import AdminBlog from "./components/Admin/AdminBlog";
import AdminTestimonials from "./components/Admin/AdminTestimonials";
import ViewPayment from "./components/Admin/ViewPayment";
import ManageProducts from "./components/Admin/ManageProducts";
import UserDetails from "./components/Admin/UserDetails";
import AdminLogin from "./components/Admin/AdminLogin";
import ThankYouPage from "./pages/ThankYou";
import FAQs from "./pages/FAQs";
import Testimonials from "./pages/Testimonials";
import AdminFAQs from "./components/Admin/AdminFAQs";
import Comments from "./components/Admin/Comments";

// 👇 create a wrapper component to manage layout
function AppLayout() {
  const location = useLocation();

  // Check if current route starts with /admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {/* <Toaster
  position="top-right"
  toastOptions={{
    style: {
      background: 'linear-gradient(to right,rgb(243, 240, 68),rgb(214, 158, 36))', // dark slate to navy
      color: 'black', // light slate text
      borderRadius: '10px',
      padding: '14px 20px',
      fontWeight: '500',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.3)',
      border: '1px solid #334155',
    },
    success: {
      iconTheme: {
        primary: '#10b981', // emerald green
        secondary: 'white',
      },
    },
    error: {
      iconTheme: {
        primary: '#ef4444', // red-500
        secondary: 'white',
      },
    },
    duration: 4000,
  }}
/> */}

      <VisitorTracker />

      {/* 👇 Only show Navbar & Footer if NOT on admin routes */}
      {!isAdminRoute && <Navbar />}
      <div className="min-h-screen">
        <AppRoutes />
      </div>
      {!isAdminRoute && <Footer />}
    </>
  );
}

// 👇 split routes into a separate component
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      <Route path="/category/:categoryName" element={<Categories />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
      <Route path="*" element={<NotFound />} />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard/*"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="visitors" replace />} />
        <Route path="visitors" element={<UserDetails />} />
        <Route path="subscribed" element={<Subscribed />} />
        <Route path="blog" element={<AdminBlog />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="comments" element={<Comments />} />
        <Route path="products" element={<ManageProducts />} />
        <Route path="faqs" element={<AdminFAQs />} />
        <Route path="payments" element={<ViewPayment />} />
      </Route>
    </Routes>
  );
}

// 👇 Main App
function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
