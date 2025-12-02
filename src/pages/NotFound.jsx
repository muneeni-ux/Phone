import React, { useEffect } from 'react';
import { Terminal, ArrowLeft, Home, FileWarning, Search } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function NotFound() {
  // Initialize AOS for subtle scroll/load animations
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Theme Colors (Adapted for Dark Background)
  const primaryColor = "text-cyan-400"; // Brighter cyan/blue for glow
  const primaryBg = "bg-blue-600";
  const primaryHover = "hover:bg-cyan-500"; 
  const secondaryColor = "text-gray-400";
  const darkBg = "bg-gray-900";

  return (
    <div className={`min-h-screen ${darkBg} flex items-center justify-center p-4 sm:p-8 overflow-hidden font-sans mb-[-8rem] relative`}>
      {/* Background Grid/Noise for Tech Look */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMicgaGVpZ2h0PScxMicgdmlld0JveD0nMCAwIDEyIDEyJz48Y2lyY2xlIGN4PScxJyBjeT0nMTEnIHI9JzAuNScgZmlsbD0nY3lhbicvPjwvIHN2Zz4=')]"></div>

      <div 
        className="text-center max-w-2xl w-full bg-gray-800 p-8 sm:p-16 rounded-xl shadow-2xl border border-gray-700 relative z-10"
        data-aos="fade-zoom-in"
        data-aos-easing="ease-in-out"
        data-aos-duration="800"
      >
        
        {/* --- Animated 404 Code --- */}
        <div className="relative mb-8">
          <h1 
            className={`text-8xl sm:text-[180px] font-extrabold tracking-tighter ${primaryColor} opacity-50 text-shadow-glow`}
            data-aos="zoom-in"
            data-aos-duration="1200"
          >
            404
          </h1>
          {/* Overlay Icon - Pulsing Warning */}
          <FileWarning 
            size={56} 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 animate-pulse-slow`} 
          />
        </div>

        {/* --- Main Message (Simplified) --- */}
        <h2 
          className="text-3xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Lost in the Digital Cosmos 🌌
        </h2>
        <p 
          className={`text-lg ${secondaryColor} mb-6 max-w-md mx-auto leading-relaxed`}
          data-aos="fade-up"
          data-aos-delay="400"
        >
          The page you requested is currently unreachable or does not exist.
        </p>

        {/* --- Common Solutions / Help Section --- */}
        <div className="text-left text-sm text-gray-400 mb-10 border-t border-b border-gray-700 py-4 max-w-sm mx-auto"
             data-aos="fade-up" data-aos-delay="500">
            <p className="font-bold text-white mb-2">Try one of these options:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
                <li>Double-check the URL for typos.</li>
                <li>Go back to the previous page.</li>
                <li>Search the site for what you need.</li>
            </ul>
        </div>


        {/* --- Call to Action Buttons --- */}
        <div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          
          {/* Back Button (Immediate recovery) */}
          <button
            onClick={() => window.history.back()}
            className={`inline-flex items-center justify-center gap-3 text-white font-semibold py-3 px-8 rounded-full border border-gray-600 bg-gray-700 hover:bg-gray-600 transition duration-300 shadow-lg`}
          >
            <ArrowLeft size={20} /> Go Back
          </button>
          
          {/* Home Button (Primary Action) */}
          <a
            href="/" 
            className={`inline-flex items-center justify-center gap-3 ${primaryBg} text-white font-bold py-3 px-8 rounded-full ${primaryHover} transition duration-300 shadow-2xl shadow-cyan-500/50 transform hover:scale-[1.02]`}
          >
            <Home size={20} /> Back to Homepage
          </a>
        </div>
        
        {/* --- Animation & Styling Keyframes (CSS) --- */}
        <style jsx>{`
          /* Custom Neon Glow Effect */
          .text-shadow-glow {
            text-shadow: 0 0 5px rgba(0, 255, 255, 0.5), 
                         0 0 10px rgba(0, 255, 255, 0.3);
          }
          /* Custom Slow Pulse Animation for tech look */
          @keyframes pulse-slow {
            0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.05); }
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s infinite ease-in-out;
          }
        `}</style>
      </div>
    </div>
  );
}

export default NotFound;