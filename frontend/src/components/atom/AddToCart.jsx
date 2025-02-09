import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, fetchCart } from "../../store/cartSlice";

function AddToCart({ _id }) {
  const dispatch = useDispatch();

  // Get cart data from Redux store
  const cartItems = useSelector((state) => state.cart?.cartData || []);
  const inCart = cartItems.some((item) => item.product.id === _id);

  // Fetch cart data when the component loads
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleCartAction = async () => {
    if (inCart) {
      await dispatch(removeFromCart(_id)).unwrap(); // Ensure state updates
    } else {
      await dispatch(addToCart(_id)).unwrap(); // Ensure state updates
    }
    dispatch(fetchCart()); // Fetch updated cart after change
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
