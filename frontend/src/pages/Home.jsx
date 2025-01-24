import React from "react";
import HeroSection from "../components/HeroSection";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const featuredProducts = [
    { id: 1, image: "https://via.placeholder.com/300", name: "T-Shirt", price: 29.99 },
    { id: 2, image: "https://via.placeholder.com/300", name: "Jeans", price: 49.99 },
    { id: 3, image: "https://via.placeholder.com/300", name: "Jacket", price: 69.99 },
    { id: 4, image: "https://via.placeholder.com/300", name: "Shoes", price: 89.99 },
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products Section */}
      <section className="container mx-auto py-16">
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
    </div>
  );
};

export default HomePage;
