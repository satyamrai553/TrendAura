import React from "react";
import { Button } from "../index.js";
import { Link } from "react-router-dom";

const ProductCard = ({ image, name, price, _id, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl w-full sm:w-64">
      {/* Product Image */}
     
      <div className="relative h-64 w-full overflow-hidden">
      <Link
          to={`/product/${_id}`}
          className="text-blue-500 hover:underline block mt-2"
        >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-fill  transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            e.target.src = "/path/to/fallback-image.jpg"; // Fallback image
          }}
        />
        </Link>
        {/* Overlay for hover effect */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300" style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}></div>
      </div>

      {/* Product Details */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
          {name}
        </h3>
        <p className="text-lg font-bold text-gray-900">Rs. {price.toFixed(2)}</p>

        {/* Link around name and price (but NOT the Add to Cart button) */}
        
          
        

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(_id)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 mt-4"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};


export default ProductCard;
