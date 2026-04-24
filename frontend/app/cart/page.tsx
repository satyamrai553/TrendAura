"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/store/slices/cartSlice";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Package,
  Truck,
  ShieldCheck,
} from "lucide-react";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, totalItems, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

  const shippingCost = totalPrice > 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const orderTotal = totalPrice + shippingCost + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* Empty cart illustration */}
          <div className="relative w-40 h-40 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <ShoppingBag
                size={64}
                className="text-gray-300"
                strokeWidth={1.5}
              />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Your cart is empty
          </h1>
          <p className="text-gray-500 mb-8 text-sm md:text-base">
            Looks like you haven&apos;t added anything to your cart yet. Start
            shopping and find something you love!
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl hover:shadow-lg hover:shadow-pink-500/25 hover:-translate-y-0.5 transition-all duration-200"
            id="start-shopping-btn"
          >
            <ShoppingBag size={18} />
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-2"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Shopping Cart
              <span className="ml-2 text-base md:text-lg font-normal text-gray-500">
                ({totalItems} {totalItems === 1 ? "item" : "items"})
              </span>
            </h1>
          </div>
          <button
            onClick={() => dispatch(clearCart())}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            id="clear-cart-btn"
          >
            <Trash2 size={16} />
            Clear Cart
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex gap-4 md:gap-6">
                  {/* Image */}
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                          {item.name}
                        </h3>
                        {item.size && (
                          <span className="text-xs text-gray-500 mt-0.5 block">
                            Size: {item.size}
                          </span>
                        )}
                        {item.color && (
                          <span className="text-xs text-gray-500 block">
                            Color: {item.color}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity - 1,
                              })
                            )
                          }
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center text-sm font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-lg font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-400">
                            ${item.price.toFixed(2)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Mobile clear cart */}
            <button
              onClick={() => dispatch(clearCart())}
              className="md:hidden w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
            >
              <Trash2 size={16} />
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:w-[380px] flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Subtotal ({totalItems} items)
                  </span>
                  <span className="font-medium text-gray-900">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span
                    className={`font-medium ${shippingCost === 0 ? "text-green-600" : "text-gray-900"}`}
                  >
                    {shippingCost === 0
                      ? "FREE"
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Estimated Tax</span>
                  <span className="font-medium text-gray-900">
                    ${tax.toFixed(2)}
                  </span>
                </div>

                {shippingCost > 0 && (
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-3">
                    <p className="text-xs text-purple-700 font-medium">
                      🎉 Add ${(100 - totalPrice).toFixed(2)} more for free
                      shipping!
                    </p>
                    <div className="mt-2 h-1.5 bg-purple-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (totalPrice / 100) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-100 pt-4 flex justify-between">
                  <span className="text-base font-bold text-gray-900">
                    Total
                  </span>
                  <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    ${orderTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-400 transition-all"
                />
                <button className="px-5 py-2.5 text-sm font-semibold text-pink-600 border border-pink-200 rounded-xl hover:bg-pink-50 transition-colors">
                  Apply
                </button>
              </div>

              {/* Checkout Button */}
              <button
                className="w-full py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl hover:shadow-lg hover:shadow-pink-500/25 hover:-translate-y-0.5 transition-all duration-200"
                id="checkout-btn"
              >
                Proceed to Checkout
              </button>

              {/* Trust badges */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50">
                  <Truck size={18} className="text-gray-500" />
                  <span className="text-[10px] text-gray-500 font-medium text-center">
                    Free Shipping
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50">
                  <Package size={18} className="text-gray-500" />
                  <span className="text-[10px] text-gray-500 font-medium text-center">
                    Easy Returns
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50">
                  <ShieldCheck size={18} className="text-gray-500" />
                  <span className="text-[10px] text-gray-500 font-medium text-center">
                    Secure Pay
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
