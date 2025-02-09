import React from 'react';
import { useSelector } from 'react-redux';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

function CartBtn() {
    const cartData = useSelector((state) => {
        console.log("🛒 Redux State in CartBtn:", state.cart);
        return state.cart?.cartData || [];
      });
     
      

  return (
    <Link to="/cart" className="relative group">
      <div className="relative inline-block ml-4">
        <ShoppingCart className="w-8 h-8 text-gray-700 group-hover:translate-x-1 transition-transform duration-300" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {cartData.length}
        </span>
      </div>
    </Link>
  );
}

export default CartBtn;