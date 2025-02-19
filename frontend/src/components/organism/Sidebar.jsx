import React, { useState } from "react";
import { getProductsByFilterService } from "../../services/index.js";

function Sidebar({ setFilteredProducts }) {
  
  const [filters, setFilters] = useState({
    category: "",
    tag: "",
    minPrice: "",
    maxPrice: "",
  });

  
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  
  const applyFilters = async () => {
    try {
      const filteredProducts = await getProductsByFilterService(filters);
      setFilteredProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-200 rounded-md">
      <h2 className="text-lg font-bold mb-3">Filters</h2>

     
      <div className="mb-3">
        <label className="block font-semibold">Category:</label>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="">All</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="electronics">Electronics</option>
        </select>
      </div>

      {/* Tag Filter */}
      <div className="mb-3">
        <label className="block font-semibold">Tag:</label>
        <select
          name="tag"
          value={filters.tag}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="">All</option>
          <option value="new">New</option>
          <option value="trending">Trending</option>
          <option value="sale">On Sale</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-3">
        <label className="block font-semibold">Price Range:</label>
        <div className="flex space-x-2">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="Min"
            className="w-1/2 p-2 border rounded-md"
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="Max"
            className="w-1/2 p-2 border rounded-md"
          />
        </div>
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={applyFilters}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Apply Filters
      </button>
    </div>
  );
}

export default Sidebar;
