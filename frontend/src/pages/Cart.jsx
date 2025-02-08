import React, { useEffect, useState } from "react";
import {
  getUserCartService,
  deleteProductService,
  increaseQuantityService,
  decreaseQuantityService,
  deleteAllProductService,
} from "../services/index.js";

function Cart() {
  const [cart, setCart] = useState({ products: [] }); // Initialize with empty products array
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await getUserCartService();
      console.log("Fetched Cart Response:", response); // Debugging line

      // Extract the cart data from the response
      const cartData = response?.data || { products: [] };
      setCart(cartData);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart({ products: [] }); // Fallback to empty cart on error
    } finally {
      setLoading(false);
    }
  };

  const handleIncrease = async (productId) => {
    try {
      await increaseQuantityService(productId);
      fetchCart(); // Refresh the cart after increasing quantity
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const handleDecrease = async (productId) => {
    try {
      await decreaseQuantityService(productId);
      fetchCart(); // Refresh the cart after decreasing quantity
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await deleteProductService(productId);
      fetchCart(); // Refresh the cart after removing a product
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await deleteAllProductService();
      setCart({ products: [] }); // Clear the cart in the UI
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading cart...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      {cart.products?.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.products?.map(({ product, quantity }) => (
              <div key={product._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1 ml-4">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600">Rs. {product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                  <button onClick={() => handleDecrease(product._id)} className="px-3 py-1 bg-gray-300 rounded-l">
                    -
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button onClick={() => handleIncrease(product._id)} className="px-3 py-1 bg-gray-300 rounded-r">
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(product._id)}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleClearCart}
            className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;