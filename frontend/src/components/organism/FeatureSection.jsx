import React, { useEffect, useState, useCallback, useRef } from "react";
import { getProductsByTagService } from "../../services/index.js";
import { ProductCard } from "../index.js"; // Ensure this is correctly imported

function FeatureSection() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1); // Track current page
    const [hasMore, setHasMore] = useState(true); // Flag to check if more products are available

    const scrollContainerRef = useRef(null); // Ref for the scrollable container

    const fetchProducts = useCallback(async () => {
        try {
            setError(false);
            setLoading(true);

            // Fetch products with the "new" tag, adding pagination
            const response = await getProductsByTagService(["new"], page);

            if (response && response.data) {
                setProducts((prevProducts) => [
                    ...prevProducts,
                    ...response.data, // Append new products to the list
                ]);

                // If less than 10 products are returned, there are no more products
                setHasMore(response.data.length === 10);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        fetchProducts(); // Load initial products
    }, [fetchProducts]);

    // Function to scroll left
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -300, // Adjust scroll distance as needed
                behavior: "smooth",
            });
        }
    };

    // Function to scroll right
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 300, // Adjust scroll distance as needed
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="container mx-auto py-16 bg-background_primary relative">
            <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-wide">
                Featured Products
            </h2>
            <p className="text-center text-gray-600 text-lg mb-12">
                Explore the latest trends with our handpicked collection
            </p>

            {loading && page === 1 ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">Failed to load products.</p>
            ) : products.length === 0 ? (
                <p className="text-center text-gray-500">No featured products found.</p>
            ) : (
                <>
                    <div className="relative">
                        {/* Left Scroll Button */}
                        <button
                            onClick={scrollLeft}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 shadow-lg z-10 hover:bg-opacity-100 transition-all"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-700"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>

                        {/* Horizontal Scroll Container */}
                        <div
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto space-x-4 py-4 px-4 scrollbar-hide" // Hide scrollbar for cleaner look
                        >
                            {products.map((product) => (
                                <div key={product._id} className="flex-shrink-0">
                                    <ProductCard
                                        image={product.image}
                                        name={product.name}
                                        price={product.price}
                                        _id={product._id}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Right Scroll Button */}
                        <button
                            onClick={scrollRight}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 shadow-lg z-10 hover:bg-opacity-100 transition-all"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-700"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Load More Section */}
                    {hasMore && !loading && (
                        <div className="text-center py-4">
                            <p className="text-gray-500">Loading more products...</p>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

export default FeatureSection;