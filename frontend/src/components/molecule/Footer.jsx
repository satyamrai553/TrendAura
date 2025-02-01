import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 TrendAura. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="text-white hover:text-indigo-600">Facebook</a>
          <a href="#" className="text-white hover:text-indigo-600">Instagram</a>
          <a href="#" className="text-white hover:text-indigo-600">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
