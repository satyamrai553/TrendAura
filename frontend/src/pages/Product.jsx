import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">All Products</h1>
        <p>Coming soon...</p>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
