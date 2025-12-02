// Toast.js
import React, { useEffect } from "react";
import { CheckCircle, Trash2, Info } from "lucide-react";

const Toast = ({ message, type = "info", onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, onClose, duration]);

  if (!message) return null;

  let icon, bgClass;
  switch (type) {
    case "success":
      icon = <CheckCircle size={20} />;
      bgClass = "bg-green-600 text-white";
      break;
    case "error":
      icon = <Trash2 size={20} />;
      bgClass = "bg-red-600 text-white";
      break;
    default:
      icon = <Info size={20} />;
      bgClass = "bg-blue-600 text-white";
  }

  return (
    <div
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-xl flex items-center gap-3 shadow-lg ${bgClass} animate-slide-up`}
    >
      {icon}
      <span>{message}</span>
    </div>
  );
};

export default Toast;
