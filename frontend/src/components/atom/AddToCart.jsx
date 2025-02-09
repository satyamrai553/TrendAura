import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../store/cartSlice";
import { addToCartService, deleteProductService } from "../../services/index.js"; // Import API calls

function AddToCart({ productId }) {
  const dispatch = useDispatch();

  // Get cart data from Redux store
  const cartItems = useSelector((state) => state.cart?.cartData || []);
  const inCart = cartItems.some((item) => item.product._id === productId);

  const handleCartAction = async () => {
    try {
      if (inCart) {
        await deleteProductService(productId); // Remove from backend
      } else {
        await addToCartService(productId); // Add to backend
      }

      // Wait for Redux to fetch updated cart data before re-rendering
      await dispatch(fetchCart()).unwrap(); 
      
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <button
      onClick={handleCartAction}
      className={`w-full py-2 px-4 rounded-lg transition-all duration-300 mt-4 ${
        inCart
          ? "bg-red-500 hover:bg-red-600"
          : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
      } text-white`}
    >
      {inCart ? "Remove from Cart" : "Add to Cart"}
    </button>
  );
}

export default AddToCart;
