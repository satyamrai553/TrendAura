import React from "react";

const NotificationBanner = ({ message, type, onClose }) => {
  return (
    <div className="fixed top-4 right-4 w-full max-w-sm z-50">
      <div
        className={`flex items-center justify-between p-4 rounded-md shadow-md text-white ${
          type === "error" ? "bg-red-600" : "bg-green-600"
        }`}
      >
        {/* Icon (using Unicode characters) */}
        <div className="flex items-center">
          {type === "error" ? (
            <span className="text-2xl mr-2">⚠️</span> 
          ) : (
            <span className="text-2xl mr-2">✔️</span> // Checkmark Icon
          )}
          <span>{message}</span>
        </div>

        {/* Close Button (using Unicode character) */}
        <button onClick={onClose} className="text-white hover:text-gray-300">
          <span className="text-xl">&times;</span> {/* Close "X" icon */}
        </button>
      </div>
    </div>
  );
};

export default NotificationBanner;
