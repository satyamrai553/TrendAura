import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-indigo-600">
          TrendAura
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="text-gray-700 hover:text-indigo-600">
            Home
          </a>
          <a href="/about" className="text-gray-700 hover:text-indigo-600">
            About
          </a>
          <a href="/contact" className="text-gray-700 hover:text-indigo-600">
            Contact
          </a>
          <a href="/products" className="text-gray-700 hover:text-indigo-600">
            Shop
          </a>
          <a href="/cart" className="text-gray-700 hover:text-indigo-600">
            Cart
          </a>
          <a href="/login" className="text-gray-700 hover:text-indigo-600">
            Login
          </a>
          <a href="/signup" className="text-gray-700 hover:text-indigo-600">
            Signup
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col space-y-4 p-4">
            <a href="/" className="text-gray-700 hover:text-indigo-600">
              Home
            </a>
            <a href="/about" className="text-gray-700 hover:text-indigo-600">
              About
            </a>
            <a href="/contact" className="text-gray-700 hover:text-indigo-600">
              Contact
            </a>
            <a href="/products" className="text-gray-700 hover:text-indigo-600">
              Shop
            </a>
            <a href="/cart" className="text-gray-700 hover:text-indigo-600">
              Cart
            </a>
            <a href="/login" className="text-gray-700 hover:text-indigo-600">
              Login
            </a>
            <a href="/signup" className="text-gray-700 hover:text-indigo-600">
              Signup
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
