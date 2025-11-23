// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Menu,
//   X,
//   Home,
//   ShoppingBag,
//   Info,
//   Phone,
//   ChevronDown,
//   ChevronUp,
//   ShoppingCart,
//   Search,
//   Shirt,
//   Sparkles,
//   Baby,
//   Box,
//   BriefcaseBusiness,
//   Footprints,
// } from "lucide-react";
// import SearchModal from "./SearchModal";
// import { useCart } from "../context/CartContext";

// function Navbar() {
//   const [isOpen, setIsOpen] = useState(false); // mobile sidebar
//   const [dropdownOpen, setDropdownOpen] = useState(false); // categories dropdown
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const { cartItems } = useCart();
//   const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const toggleSidebar = () => setIsOpen(!isOpen);
//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
//   const closeSidebar = () => {
//     setIsOpen(false);
//     setDropdownOpen(false);
//   };

//   return (
//     <>
//       {/* ---------- TOP NAV ----------- */}
//       <nav
//         className={`fixed w-full z-50 top-0 left-0 transition-shadow duration-300 ${
//           scrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-white"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
//           {/* logo + mobile toggle */}
//           <div className="relative flex flex-1 md:flex-none justify-center md:justify-start items-center">
//             {/* Mobile menu button - absolute on left */}
//             <button
//               onClick={toggleSidebar}
//               className="absolute left-0 md:hidden text-yellow-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
//             >
//               <Menu size={26} />
//             </button>

//             {/* Logo + Name */}
//             <Link
//               to="/"
//               className="flex items-center gap-2 md:gap-3 px-2 py-1 select-none focus:outline-none rounded-lg group"
//               aria-label="Homepage"
//             >
//               <img
//                 src="./PakFashions-logo.jpg"
//                 alt="PakFashion Logo"
//                 className="w-10 h-10 rounded-full border-2 border-yellow-500 object-cover shadow-md group-hover:scale-105 transition hidden md:block"
//               />
//               <span className="text-xl md:text-2xl font-extrabold text-black tracking-tight px-3 py-1 rounded-full shadow-sm text-center">
//                 PAK TECH
//               </span>
//             </Link>
//           </div>

//           {/* ----------- DESKTOP NAV ----------- */}
//           <div className="hidden md:flex items-center space-x-8 font-semibold text-black">
//             {/* <div className="hidden md:flex items-center space-x-8 font-semibold text-blue-700"> */}
//             <NavLink to="/" label="Home" icon={<Home size={18} />} />
//             <NavLink to="/shop" label="Oppo" icon={<ShoppingBag size={18} />} />

//             {/* categories dropdown */}
//             {/* <div
//               className="relative"
//               // onMouseLeave={() => setDropdownOpen(false)}
//             >
//               <button
//                 onClick={toggleDropdown}
//                 className="flex items-center gap-1 hover:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded transition"
//                 aria-haspopup="true"
//                 aria-expanded={dropdownOpen}
//                 aria-controls="categories-menu"
//               >
//                 Categories
//                 {dropdownOpen ? (
//                   <ChevronUp size={18} />
//                 ) : (
//                   <ChevronDown size={18} />
//                 )}
//               </button>

//               <div
//                 id="categories-menu"
//                 role="menu"
//                 onClick={() => setDropdownOpen(false)}
//                 className={`absolute bg-white shadow-lg border border-yellow-300 rounded-md w-64 mt-2 z-50 overflow-hidden
//                   transition-all duration-300 ease-in-out origin-top
//                   ${
//                     dropdownOpen
//                       ? "opacity-100 scale-100 pointer-events-auto"
//                       : "opacity-0 scale-95 pointer-events-none"
//                   }
//                 `}
//               >
//                 <DropdownLink
//                   to="/category/Men's Clothing"
//                   label="Men's Clothing"
//                   icon={<Shirt size={16} />}
//                 />
//                 <DropdownLink
//                   to="/category/Women's Clothing"
//                   label="Women's Clothing"
//                   icon={<Sparkles size={16} />}
//                 />
//                 <DropdownLink
//                   to="/category/Kids' Clothing"
//                   label="Kids' Clothing"
//                   icon={<Baby size={16} />}
//                 />
//                 <DropdownLink
//                   to="/category/Shoes"
//                   label="Shoes"
//                   icon={<Footprints size={16} />}
//                 />
//                 <DropdownLink
//                   to="/category/Bags & Accessories"
//                   label="Bags & Accessories"
//                   icon={<BriefcaseBusiness size={16} />}
//                 />
//                 <DropdownLink
//                   to="/category/Clearance Sale"
//                   label="Clearance Sale"
//                   icon={<Box size={16} />}
//                 />
//               </div>
//             </div> */}

//             <NavLink to="/about" label="Samsung" icon={<Info size={18} />} />
//             <NavLink to="/contact" label="Infinix" icon={<Phone size={18} />} />
//             <NavLink to="/contact" label="Tecno" icon={<Phone size={18} />} />
//             <NavLink to="/contact" label="Redmi" icon={<Phone size={18} />} />
//             <NavLink to="/contact" label="Contact" icon={<Phone size={18} />} />
//           </div>

//           {/* search + cart */}
//           <div className="flex items-center space-x-5">
//             <button
//               onClick={() => setIsSearchOpen(true)}
//               className="text-yellow-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded transition"
//               aria-label="Open search"
//             >
//               <Search size={22} />
//             </button>
//             <Link
//               to="/cart"
//               className="relative text-yellow-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded transition"
//               aria-label="Shopping cart"
//             >
//               <ShoppingCart size={24} />
//               {totalItems > 0 && (
//                 <span
//                   // className="absolute -top-1 -right-2 bg-black text-white rounded-full text-sm font-bold px-2 animate-pulse "
//                   className="absolute top-[-4px] right-[-6px] bg-black text-white rounded-full text-xs font-semibold flex items-center justify-center w-5 h-5 md:w-5 md:h-5 shadow-md animate-pulse"
//                   aria-live="polite"
//                   aria-atomic="true"
//                 >
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* ------------- MOBILE SIDEBAR ------------- */}
//       <aside
//         className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//         aria-label="Mobile menu"
//         role="menu"
//       >
//         <div className="flex justify-between items-center p-5 border-b border-yellow-300">
//           <span className="text-xl font-bold text-black select-none">Menu</span>
//           <button
//             onClick={closeSidebar}
//             className="text-yellow-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
//             aria-label="Close menu"
//           >
//             <X size={28} />
//           </button>
//         </div>

//         <nav className="flex flex-col p-6 space-y-5 text-black font-semibold">
//           <NavLinkMobile
//             to="/"
//             label="Home"
//             icon={<Home size={20} />}
//             onClick={closeSidebar}
//           />
//           <NavLinkMobile
//             to="/shop"
//             label="Oppo"
//             icon={<ShoppingBag size={20} />}
//             onClick={closeSidebar}
//           />

//           {/* mobile categories toggle */}
//           {/* <button
//             onClick={toggleDropdown}
//             className="flex items-center gap-2 text-black font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
//             aria-haspopup="true"
//             aria-expanded={dropdownOpen}
//           >
//             {dropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//             Categories
//           </button>

//           {dropdownOpen && (
//             <div className="ml-6 mt-2 flex flex-col space-y-3">
//               <NavLinkMobile
//                 to="/category/Men's Clothing"
//                 label="Men's Clothing"
//                 icon={<Shirt size={18} />}
//                 onClick={closeSidebar}
//               />
//               <NavLinkMobile
//                 to="/category/Women's Clothing"
//                 label="Women's Clothing"
//                 icon={<Sparkles size={18} />}
//                 onClick={closeSidebar}
//               />
//               <NavLinkMobile
//                 to="/category/Kids' Clothing"
//                 label="Kids' Clothing"
//                 icon={<Baby size={18} />}
//                 onClick={closeSidebar}
//               />
//               <NavLinkMobile
//                 to="/category/Shoes"
//                 label="Shoes"
//                 icon={<Footprints size={18} />}
//                 onClick={closeSidebar}
//               />
//               <NavLinkMobile
//                 to="/category/Bags & Accessories"
//                 label="Bags & Accessories"
//                 icon={<BriefcaseBusiness size={18} />}
//                 onClick={closeSidebar}
//               />
//               <NavLinkMobile
//                 to="/category/Clearance Sale"
//                 label="Clearance Sale"
//                 icon={<Box size={18} />}
//                 onClick={closeSidebar}
//               />
//             </div>
//           )} */}

//           <NavLinkMobile
//             to="/about"
//             label="Samsung"
//             icon={<Info size={20} />}
//             onClick={closeSidebar}
//           />
//           <NavLinkMobile
//             to="/contact"
//             label="Infinix"
//             icon={<Phone size={20} />}
//             onClick={closeSidebar}
//           />
//           <NavLinkMobile
//             to="/contact"
//             label="Tecno"
//             icon={<Phone size={20} />}
//             onClick={closeSidebar}
//           />
//           <NavLinkMobile
//             to="/contact"
//             label="Redmi"
//             icon={<Phone size={20} />}
//             onClick={closeSidebar}
//           />
//           <NavLinkMobile
//             to="/contact"
//             label="Contact"
//             icon={<Phone size={20} />}
//             onClick={closeSidebar}
//           />
//         </nav>
//       </aside>

//       {/* ------------- SEARCH MODAL ------------- */}
//       {/* {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />} */}
//       <SearchModal
//         isOpen={isSearchOpen}
//         onClose={() => setIsSearchOpen(false)}
//       />
//     </>
//   );
// }

// function NavLink({ to, label, icon }) {
//   return (
//     <Link
//       to={to}
//       className="flex items-center gap-1 text-yellow-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded transition relative group"
//     >
//       {icon}
//       <span>{label}</span>
//       <span
//         className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-yellow-500 transition-all group-hover:w-full"
//         aria-hidden="true"
//       />
//     </Link>
//   );
// }

// // function DropdownLink({ to, label, icon }) {
// //   return (
// //     <Link
// //       to={to}
// //       role="menuitem"
// //       className="flex items-center gap-2 px-4 py-2 hover:bg-yellow-100 focus:bg-yellow-100 focus:outline-none transition"
// //     >
// //       {icon}
// //       {label}
// //     </Link>
// //   );
// // }

// function NavLinkMobile({ to, label, icon, onClick }) {
//   return (
//     <Link
//       to={to}
//       onClick={onClick}
//       className="flex items-center gap-2 hover:text-black text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded transition"
//     >
//       {icon}
//       <span>{label}</span>
//     </Link>
//   );
// }

// export default Navbar;
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Smartphone,
  BatteryCharging,
  Cable,
  Headphones,
  ShoppingBag,
  PhoneCall,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
  Search,
  MonitorSmartphone,
  Mail,
  MapPin,
  HomeIcon,
} from "lucide-react";
import SearchModal from "./SearchModal";
import { useCart } from "../context/CartContext";

// Height of the Top Info Bar (40px: py-2 = 16px, text-sm line-height approx 20px, total ~40px)
const TOP_BAR_HEIGHT = "40px"; // Used for positioning the main navbar

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to close both the mobile menu and the dropdown
  const closeAllMenus = () => {
    setIsOpen(false);
    setDropdownOpen(false);
  };

  return (
    <>
      {/* ------------------- TOP INFO BAR ------------------- */}
      {/* FIX: Removed 'hidden md:flex' to make it visible on mobile. Adjusted z-index to z-40. */}
      {/* FIX: Replaced 'md:flex' with 'flex' for visibility on all screen sizes. */}
      <div className="flex w-full bg-blue-900 text-white text-xs md:text-sm py-2 px-6 justify-between items-center shadow-md fixed top-0 left-0 z-40">
        <div className="flex items-center gap-4 md:gap-6">
          <span className="flex items-center gap-1">
            <PhoneCall size={14} /> +254 712 345 678
          </span>
          {/* Hide secondary info on smaller mobile screens for space */}
          <span className="flex items-center gap-1">
            <Mail size={14} /> support@techhub.co.ke
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={14} /> Nairobi, Kenya
          </span>
        </div>
      </div>

      {/* ------------------- MAIN NAVBAR ------------------- */}
      {/* FIX: Removed mt-[40px] and used 'top' with the constant height to stack it correctly without a gap. Adjusted z-index to z-30. */}
      <nav
        className={`fixed w-full z-30 left-0 transition-all duration-300`}
        style={{ top: TOP_BAR_HEIGHT }}
      >
        <div
          className={`max-w-7xl mx-auto px-6 py-3 flex items-center justify-between  rounded-2xl ${
            scrolled
              ? "bg-white/90 backdrop-blur-md shadow-lg"
              : "bg-white border-b border-blue-200"
          }`}
        >
          {/* Logo */}
          <div className="relative flex flex-1 md:flex-none justify-center md:justify-start items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="absolute left-0 md:hidden text-blue-600"
            >
              <Menu size={28} />
            </button>

            <Link to="/" className="flex items-center gap-2">
              <MonitorSmartphone size={34} className="text-blue-700 drop-shadow" />
              <span className="text-2xl font-extrabold text-black tracking-tight">
                TECH<span className="text-blue-700">HUB</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 font-semibold text-black">
            <NavItem to="/" label={<HomeIcon />} active={isActive("/")} />
            <NavItem to="/phones/oppo" label="Oppo" active={isActive("/phones/oppo")} />
            <NavItem to="/phones/tecno" label="Tecno" active={isActive("/phones/tecno")} />
            <NavItem to="/phones/samsung" label="Samsung" active={isActive("/phones/samsung")} />
            <NavItem to="/phones/infinix" label="Infinix" active={isActive("/phones/infinix")} />
            <NavItem to="/phones/redmi" label="Redmi" active={isActive("/phones/redmi")} />

            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 text-blue-700 hover:text-black transition"
              >
                More {dropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              <div
                className={`absolute bg-white shadow-lg border border-blue-200 rounded-md w-48 mt-2 transition-all duration-300 ${
                  dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                }`}
              >
                {/* FIX: Passed setDropdownOpen(false) to close the dropdown on link click */}
                <DropdownLink
                  to="/category/accessories"
                  label="Accessories"
                  icon={<ShoppingBag size={16} />}
                  close={() => setDropdownOpen(false)}
                />
                <DropdownLink
                  to="/category/audio"
                  label="Audio"
                  icon={<Headphones size={16} />}
                  close={() => setDropdownOpen(false)}
                />
                <DropdownLink
                  to="/category/chargers"
                  label="Chargers"
                  icon={<BatteryCharging size={16} />}
                  close={() => setDropdownOpen(false)}
                />
                <DropdownLink
                  to="/category/cables"
                  label="Cables"
                  icon={<Cable size={16} />}
                  close={() => setDropdownOpen(false)}
                />
              </div>
            </div>

            {/* Contact Vibrating 🔥 */}
            <NavItem
              to="/contact"
              label={<PhoneCall className="animate-vibrate text-blue-700" />}
              active={isActive("/contact")}
            />
          </div>

          {/* Search + Cart */}
          <div className="flex items-center space-x-5">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-blue-700 hover:text-black"
            >
              <Search size={22} />
            </button>

            <Link to="/cart" className="relative text-blue-700 hover:text-black">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-black text-white rounded-full text-xs font-semibold w-5 h-5 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems} {/* Added limit check */}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {/* FIX: Adjusted z-index to z-50 (highest). Added backdrop/overlay. */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b border-blue-300">
          <span className="text-xl font-bold">Menu</span>
          <button onClick={closeAllMenus} className="text-blue-600">
            <X size={28} />
          </button>
        </div>

        <nav className="flex flex-col p-6 space-y-5 text-black font-semibold">
          {/* FIX: Passed closeAllMenus to close the mobile menu on link click */}
          <NavItemMobile to="/" label="Home" icon={<HomeIcon />} close={closeAllMenus} />
          <NavItemMobile to="/phones/oppo" label="Oppo" icon={<Smartphone />} close={closeAllMenus} />
          <NavItemMobile to="/phones/tecno" label="Tecno" icon={<Smartphone />} close={closeAllMenus} />
          <NavItemMobile to="/phones/samsung" label="Samsung" icon={<Smartphone />} close={closeAllMenus} />
          <NavItemMobile to="/phones/infinix" label="Infinix" icon={<Smartphone />} close={closeAllMenus} />
          <NavItemMobile to="/phones/redmi" label="Redmi" icon={<Smartphone />} close={closeAllMenus} />
          <NavItemMobile to="/category/accessories" label="Accessories" icon={<ShoppingBag />} close={closeAllMenus} />
          <NavItemMobile to="/category/audio" label="Audio" icon={<Headphones />} close={closeAllMenus} />
          <NavItemMobile to="/category/chargers" label="Chargers" icon={<BatteryCharging />} close={closeAllMenus} />
          <NavItemMobile to="/category/cables" label="Cables" icon={<Cable />} close={closeAllMenus} />
          <NavItemMobile to="/contact" label="Contact" icon={<PhoneCall />} close={closeAllMenus} />
        </nav>
      </aside>
      
      {/* Overlay to close sidebar when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeAllMenus}
        />
      )}

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      {/* Add padding to the top of your page content to prevent it from being hidden behind the fixed navbars */}
      <div className="pt-[calc(40px+60px)]" />
    </>
  );
}

/* ---------- Reusable Components ---------- */
function NavItem({ to, label, active }) {
  return (
    <Link
      to={to}
      className={`relative pb-1 ${
        active ? "text-black font-bold border-b-2 border-blue-700" : "text-blue-700"
      } hover:text-black hover:border-b-2 hover:border-black transition`}
    >
      {label}
    </Link>
  );
}

// Added 'close' prop
function DropdownLink({ to, label, icon, close }) {
  return (
    <Link
      to={to}
      // Call the close function when the link is clicked
      onClick={close}
      className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 text-black transition-colors"
    >
      {icon} {label}
    </Link>
  );
}

// Added 'close' prop
function NavItemMobile({ to, label, icon, close }) {
  return (
    <Link 
      to={to} 
      // Call the close function when the link is clicked
      onClick={close}
      className="flex items-center gap-3 text-blue-700 hover:text-black transition-colors"
    >
      {icon} {label}
    </Link>
  );
}

export default Navbar;