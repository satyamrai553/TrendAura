import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserCartService,
  deleteProductService,
  increaseQuantityService,
  decreaseQuantityService,
  deleteAllProductService,
} from "../services/index.js";
import { fetchCart } from "../store/cartSlice";
import { Link } from "react-router-dom";
import { Trash, Plus, Minus } from "lucide-react";

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.cartData || []);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let totalPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setTotal(totalPrice);
  }, [cartItems]);

  const fetchUpdatedCart = async () => {
    try {
      const updatedCart = await getUserCartService();
      if (updatedCart && updatedCart.data && Array.isArray(updatedCart.data.products)) {
        dispatch(fetchCart({ cartData: updatedCart.data.products }));
      }
    } catch (error) {
      console.error("❌ Failed to fetch updated cart:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProductService(productId);
      fetchUpdatedCart();
    } catch (error) {
      console.error("❌ Error deleting product:", error);
    }
  };

  const handleIncrease = async (productId) => {
    try {
      await increaseQuantityService(productId);
      fetchUpdatedCart();
    } catch (error) {
      console.error("❌ Error increasing quantity:", error);
    }
  };

  const handleDecrease = async (productId) => {
    try {
      await decreaseQuantityService(productId);
      fetchUpdatedCart();
    } catch (error) {
      console.error("❌ Error decreasing quantity:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await deleteAllProductService();
      fetchUpdatedCart();
    } catch (error) {
      console.error("❌ Error clearing cart:", error);
    }
  };

  return (
    <div className="bg-background_primary h-screen pt-12">
      <div className="max-w-4xl mx-auto p-6 bg-background_secondary shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🛒 Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.product._id} className="flex items-center justify-between p-4 border rounded-lg shadow-md">
                <div className="flex items-center space-x-4">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">{item.product.name}</h3>
                    <p className="text-gray-500">Rs.{item.product.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button onClick={() => handleDecrease(item.product._id)} className="bg-gray-300 p-2 rounded-lg hover:bg-gray-400">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button onClick={() => handleIncrease(item.product._id)} className="bg-gray-300 p-2 rounded-lg hover:bg-gray-400">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button onClick={() => handleDelete(item.product._id)} className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600">
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Order Total Section */}
        {cartItems.length > 0 && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-700">Total:</h3>
            <p className="text-xl font-bold text-gray-900">Rs.{total.toFixed(2)}</p>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-6 flex justify-between">
            <button onClick={handleClearCart} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Clear Cart
            </button>
            <Link to="/checkout" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
