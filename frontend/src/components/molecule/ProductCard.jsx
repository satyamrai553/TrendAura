import React from "react";
import {Button} from '../index.js'
import { Link } from "react-router-dom";

const ProductCard = ({ image, name, price, _id }) => {
  return (
   
    <Link to={`/product/${_id}`}>
    <div className="bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
      <img
        src={image}
        alt={name}
        className="w-full h-56 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-500 mt-1">Rs.{price.toFixed(2)}</p>
        <Button children="Add to Cart"/>
      </div>
    </div>
    </Link>
  );
};

export default ProductCard;
