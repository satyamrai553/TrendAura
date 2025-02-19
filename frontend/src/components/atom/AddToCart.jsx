import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../store/cartSlice";
import { addToCartService, deleteProductService, getUserCartService } from "../../services/index.js"; // Import API calls
import { useNavigate } from "react-router-dom";


function AddToCart({ productId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  // Get cart data from Redux store
  const cartItems = useSelector((state) => state.cart?.cartData || []);
  const inCart = cartItems.some((item) => item.product._id === productId);

  const handleCartAction = async () => {
    if (!authStatus) {
      navigate("/login"); 
      return;
    }
    try {
      if (inCart) {
        await deleteProductService(productId); // Remove from backend
      } else {
        await addToCartService(productId); // Add to backend
      }

      // Fetch updated cart data immediately
      const updatedCart = await getUserCartService();

      if (updatedCart && updatedCart.data && Array.isArray(updatedCart.data.products)) {
        console.log("🚀 Dispatching updated cart data:", updatedCart.data.products);
        dispatch(fetchCart({ cartData: updatedCart.data.products })); // Ensure Redux updates properly
      } else {
        console.error("❌ Unexpected API response structure:", updatedCart);
      }

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
