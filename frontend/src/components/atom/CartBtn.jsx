import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCartFromLocalStorage } from '../../helper/index.js';

function CartBtn() {
  const [cartData, setCartData] = useState([]);

  // Function to update cartData from local storage
  const updateCartData = () => {
    const storedCart = getCartFromLocalStorage();
    setCartData(storedCart);
  };

  // Load cart data on mount and add event listener for cart updates
  useEffect(() => {
    updateCartData();

    // Define the event handler
    const handleCartUpdate = () => {
      updateCartData();
    };

    // Listen for the custom 'cartUpdated' event
    window.addEventListener('cartUpdated', handleCartUpdate);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  return (
    <Link to="/cart" className="relative group">
      <div className="relative inline-block ml-4 sm:mt-4">
        <ShoppingCart className="w-8 h-8 text-gray-700 group-hover:translate-x-1 transition-transform duration-300" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {cartData.length}
        </span>
      </div>
    </Link>
  );
}

export default CartBtn;
