import React from "react";

const CartPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-16 px-4">
        {/* Cart Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Your Shopping Cart
        </h1>

        {/* Cart Items */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Items in Your Cart
            </h2>
            {/* Placeholder for items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <img
                    src="https://via.placeholder.com/80"
                    alt="Product"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">T-Shirt</h3>
                    <p className="text-gray-600">Size: M</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-800 font-semibold">$29.99</p>
                  <button className="text-red-500 hover:underline mt-2 text-sm">
                    Remove
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <img
                    src="https://via.placeholder.com/80"
                    alt="Product"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Jeans</h3>
                    <p className="text-gray-600">Size: 32</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-800 font-semibold">$49.99</p>
                  <button className="text-red-500 hover:underline mt-2 text-sm">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal</p>
                <p className="text-gray-800 font-medium">$79.98</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Shipping</p>
                <p className="text-gray-800 font-medium">$5.00</p>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>$84.98</p>
              </div>
            </div>
            <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
