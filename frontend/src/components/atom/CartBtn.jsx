import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../store/cartSlice.js";
import { ShoppingCart } from "lucide-react";

function CartBtn() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.cartData || []);

  useEffect(() => {
    dispatch(fetchCart()); // Fetch cart when component loads
  }, [dispatch]);

  return (
    <Link to="/cart" className="relative group">
      <div className="relative inline-block ml-4">
        <ShoppingCart className="w-8 h-8 text-gray-700 group-hover:translate-x-1 transition-transform duration-300" />
        {cartItems.length >= 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {cartItems.length}
          </span>
        )}
      </div>
    </Link>
  );
}

export default CartBtn;
