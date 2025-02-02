import React from "react";
import HeroSection from "../components/organism/HeroSection";
import ProductCard from "../components/molecule/ProductCard";

const HomePage = () => {
  
  const featuredProducts = [
    { id: 1, image: "https://via.placeholder.com/300", name: "T-Shirt", price: 29.99 },
    { id: 2, image: "https://via.placeholder.com/300", name: "Jeans", price: 49.99 },
    { id: 3, image: "https://via.placeholder.com/300", name: "Jacket", price: 69.99 },
    { id: 4, image: "https://via.placeholder.com/300", name: "Shoes", price: 89.99 },
  ];

  return (
    <div className="bg-background_primary">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products Section */}
      <section className="container mx-auto py-16 bg-background_primary">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-wide">
          Featured Products
        </h2>
        <p className="text-center text-gray-600 text-lg mb-12">
          Explore the latest trends with our handpicked collection
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </section>

      <div className="flex justify-center">
        <img src="https://res.cloudinary.com/dpxkotl1n/image/upload/v1738027918/TrendAura/dmysbdkeelzndlza9cjd.jpg" alt="feature image" className="rounded-2xl w-[1240px]  h-[600px] object-cover"/>
      </div>
    </div>
  );
};

export default HomePage;
