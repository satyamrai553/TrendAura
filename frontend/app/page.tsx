"use client";
import Hero from "@/components/heroSection/hero";
import { Star, TrendingUp, Gift, ShieldCheck } from "lucide-react";
import Link from "next/link";

const mockProducts = [
  { id: 1, name: "Classic White T-Shirt", price: "$29.99", rating: 4.5, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop" },
  { id: 2, name: "Denim Jacket", price: "$79.99", rating: 5, image: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop" },
  { id: 3, name: "Black Skinny Jeans", price: "$59.99", rating: 4.8, image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop" },
  { id: 4, name: "Summer Dress", price: "$49.99", rating: 4.6, image: "https://images.unsplash.com/photo-1595777707802-41d339d60280?w=500&h=500&fit=crop" },
];

const categories = [
  { name: "Men", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop" },
  { name: "Women", image: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&h=500&fit=crop" },
  { name: "Accessories", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&h=500&fit=crop" },
  { name: "Footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop" },
];

const testimonials = [
  { name: "Sarah Johnson", role: "Fashion Enthusiast", text: "TrendAura has the best collection! I love the quality and variety.", rating: 5 },
  { name: "Mike Chen", role: "Regular Customer", text: "Fast shipping and excellent customer service. Highly recommended!", rating: 5 },
  { name: "Emily Davis", role: "Style Blogger", text: "The latest trends are always available here. My go-to shopping destination!", rating: 5 },
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero />

      {/* Featured Products Section */}
      <section className="py-16 px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Collection</h2>
            <p className="text-gray-600">Discover our hand-picked selection of trending styles</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts.map((product) => (
              <Link key={product.id} href={`/shop/${product.id}`}>
                <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
                  <div className="relative h-64 overflow-hidden bg-gray-200">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-pink-600">{product.price}</span>
                      <div className="flex items-center gap-1">
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600">Find exactly what you're looking for</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={`/shop?category=${category.name.toLowerCase()}`}>
                <div className="relative h-64 rounded-lg overflow-hidden cursor-pointer group">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-24 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose TrendAura?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <TrendingUp size={48} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Latest Trends</h3>
              <p>Always updated with the newest fashion trends</p>
            </div>
            <div className="text-center">
              <Gift size={48} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Great Deals</h3>
              <p>Exclusive offers and discounts on premium brands</p>
            </div>
            <div className="text-center">
              <ShieldCheck size={48} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Secure Shopping</h3>
              <p>100% secure transactions with buyer protection</p>
            </div>
            <div className="text-center">
              <TrendingUp size={48} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
              <p>Quick delivery to your doorstep</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">&quot;{testimonial.text}&quot;</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-24 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-8">Get the latest updates on new products and exclusive offers!</p>
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
