"use client";
import Hero from "@/components/heroSection/hero";
import { Star, TrendingUp, Gift, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addToCart } from "@/store/slices/cartSlice";

const mockProducts = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 29.99,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
  },
  {
    id: 2,
    name: "Denim Jacket",
    price: 79.99,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop",
  },
  {
    id: 3,
    name: "Black Skinny Jeans",
    price: 59.99,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop",
  },
  {
    id: 4,
    name: "Summer Dress",
    price: 49.99,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1595777707802-41d339d60280?w=500&h=500&fit=crop",
  },
];

const categories = [
  {
    name: "Men",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
  },
  {
    name: "Women",
    image:
      "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=500&fit=crop",
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&h=500&fit=crop",
  },
  {
    name: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fashion Enthusiast",
    text: "TrendAura has the best collection! I love the quality and variety.",
    rating: 5,
  },
  {
    name: "Mike Chen",
    role: "Regular Customer",
    text: "Fast shipping and excellent customer service. Highly recommended!",
    rating: 5,
  },
  {
    name: "Emily Davis",
    role: "Style Blogger",
    text: "The latest trends are always available here. My go-to shopping destination!",
    rating: 5,
  },
];

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (
    e: React.MouseEvent,
    product: (typeof mockProducts)[0]
  ) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    );
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero />

      {/* Featured Products Section */}
      <section className="py-12 md:py-16 px-4 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
              Featured Collection
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Discover our hand-picked selection of trending styles
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {mockProducts.map((product) => (
              <Link key={product.id} href={`/shop/${product.id}`}>
                <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <div className="relative h-48 md:h-64 overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Add to cart overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end justify-center">
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="mb-4 px-4 py-2 bg-white text-gray-900 text-xs md:text-sm font-semibold rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-100"
                      >
                        + Add to Cart
                      </button>
                    </div>
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="font-semibold text-sm md:text-base mb-1 md:mb-2 truncate">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        ${product.price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star
                          size={14}
                          className="fill-yellow-400 text-yellow-400"
                        />
                        <span className="text-xs md:text-sm font-medium text-gray-600">
                          {product.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 md:mt-12">
            <Link
              href="/shop"
              className="inline-flex items-center px-8 py-3 text-sm font-medium border border-gray-300 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16 px-4 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Find exactly what you&apos;re looking for
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/shop?category=${category.name.toLowerCase()}`}
              >
                <div className="relative h-48 md:h-64 rounded-xl md:rounded-2xl overflow-hidden cursor-pointer group">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all flex items-end justify-center pb-6">
                    <h3 className="text-white text-lg md:text-2xl font-bold">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 px-4 md:px-12 lg:px-24 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
              Why Choose TrendAura?
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center p-4 md:p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
              <TrendingUp
                size={40}
                className="mx-auto mb-3 md:mb-4"
                strokeWidth={1.5}
              />
              <h3 className="text-base md:text-xl font-bold mb-2">
                Latest Trends
              </h3>
              <p className="text-white/80 text-xs md:text-sm">
                Always updated with the newest fashion trends
              </p>
            </div>
            <div className="text-center p-4 md:p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
              <Gift
                size={40}
                className="mx-auto mb-3 md:mb-4"
                strokeWidth={1.5}
              />
              <h3 className="text-base md:text-xl font-bold mb-2">
                Great Deals
              </h3>
              <p className="text-white/80 text-xs md:text-sm">
                Exclusive offers and discounts on premium brands
              </p>
            </div>
            <div className="text-center p-4 md:p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
              <ShieldCheck
                size={40}
                className="mx-auto mb-3 md:mb-4"
                strokeWidth={1.5}
              />
              <h3 className="text-base md:text-xl font-bold mb-2">
                Secure Shopping
              </h3>
              <p className="text-white/80 text-xs md:text-sm">
                100% secure transactions with buyer protection
              </p>
            </div>
            <div className="text-center p-4 md:p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
              <Truck
                size={40}
                className="mx-auto mb-3 md:mb-4"
                strokeWidth={1.5}
              />
              <h3 className="text-base md:text-xl font-bold mb-2">
                Fast Shipping
              </h3>
              <p className="text-white/80 text-xs md:text-sm">
                Quick delivery to your doorstep
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 px-4 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-sm md:text-base leading-relaxed">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
