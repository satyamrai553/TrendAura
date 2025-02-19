import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; // for auth status
import { useNavigate } from "react-router-dom";
import {
  addToCartService,
  deleteProductService,
  getUserCartService,
} from "../../services/index.js";
import {
  saveCartToLocalStorage,
  getCartFromLocalStorage,
} from "../../helper/index.js";

function AddToCart({ productId }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  // Manage cart state locally instead of Redux
  const [cartItems, setCartItems] = useState([]);

  // Load cart data from local storage on mount
  useEffect(() => {
    const localCart = getCartFromLocalStorage();
    setCartItems(localCart);
  }, []);

  // Determine if product is already in the cart using local state
  const inCart = cartItems.some((item) => item.product._id === productId);

  const handleCartAction = async () => {
    if (!authStatus) {
      navigate("/login");
      return;
    }
    try {
      if (inCart) {
        // Remove product from backend
        await deleteProductService(productId);
      } else {
        // Add product to backend
        await addToCartService(productId);
      }

      // Fetch the updated cart from the backend
      const updatedCart = await getUserCartService();
      // After fetching the updated cart from the backend:
      if (
        updatedCart &&
        updatedCart.data &&
        Array.isArray(updatedCart.data.products)
      ) {
        console.log("Updated cart data:", updatedCart.data.products);
        // Save updated cart in local storage
        saveCartToLocalStorage(updatedCart.data.products);
        // Dispatch a custom event to notify other components
        window.dispatchEvent(new Event("cartUpdated"));
        // Also update local state if you're using it in this component
        setCartItems(updatedCart.data.products);
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
