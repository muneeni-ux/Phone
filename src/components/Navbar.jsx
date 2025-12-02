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
  Watch,
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
            <NavItem to="/category/oppo" label="Oppo" active={isActive("/category/oppo")} />
            <NavItem to="/category/tecno" label="Tecno" active={isActive("/category/tecno")} />
            <NavItem to="/category/samsung" label="Samsung" active={isActive("/category/samsung")} />
            <NavItem to="/category/infinix" label="Infinix" active={isActive("/category/infinix")} />
            <NavItem to="/category/redmi" label="Redmi" active={isActive("/category/redmi")} />

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
                <DropdownLink
                  to="/category/cases"
                  label="Phone Cases"
                  icon={<Smartphone size={16} />}
                  close={() => setDropdownOpen(false)}
                />
                <DropdownLink
                  to="/category/wearables"
                  label="Wearables"
                  icon={<Watch size={16} />}
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
        className={`fixed top-0 left-0 h-[3/4] w-72 bg-white shadow-xl z-50 transition-transform duration-300 rounded-b-2xl ${
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
          <NavItemMobile to="/category/oppo" label="Oppo" icon={<Smartphone />} close={closeAllMenus} />
          <NavItemMobile to="/category/tecno" label="Tecno" icon={<Smartphone />} close={closeAllMenus} />
          <NavItemMobile to="/category/samsung" label="Samsung" icon={<Smartphone />} close={closeAllMenus} />
          <NavItemMobile to="/category/infinix" label="Infinix" icon={<Smartphone />} close={closeAllMenus} />
          <NavItemMobile to="/category/redmi" label="Redmi" icon={<Smartphone />} close={closeAllMenus} />
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