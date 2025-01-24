import React from "react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white py-32">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-6 tracking-wide">
          Discover Your Style with <span className="text-yellow-300">TrendAura</span>
        </h1>
        <p className="text-lg max-w-xl mx-auto mb-10">
          Shop the latest trends and elevate your wardrobe with our exclusive collection of clothing and accessories.
        </p>
        <a
          href="/products"
          className="bg-yellow-300 text-black px-8 py-4 rounded-md text-lg font-semibold hover:bg-yellow-400 transition-colors"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
