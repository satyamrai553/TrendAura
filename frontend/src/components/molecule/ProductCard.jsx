import React from "react";
import {Button} from '../index.js'

const ProductCard = ({ image, name, price }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
      <img
        src={image}
        alt={name}
        className="w-full h-56 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-500 mt-1">${price.toFixed(2)}</p>
        <Button children="Add to Cart"/>
      </div>
    </div>
  );
};

export default ProductCard;
