import React, { useState, useEffect } from "react";
import { addToCartService, deleteProductService, getUserCartService } from "../../services/index.js";

function AddToCart({ _id }) {
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const checkCart = async () => {
      try {
        const cart = await getUserCartService();
        setInCart(cart.products.some((item) => item.product.id === _id));
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    checkCart();
  }, [_id]);

  const handleCartAction = async () => {
    try {
      if (inCart) {
        await deleteProductService(_id);
      } else {
        await addToCartService(_id);
      }
      setInCart(!inCart);
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
