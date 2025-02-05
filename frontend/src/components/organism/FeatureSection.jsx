import React, { useEffect, useState, useCallback } from "react";
import { getProductsByTagService } from "../../services/index.js";
import { ProductCard } from "../index.js"; // Ensure this is correctly imported

function FeatureSection() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);  // Track current page
    const [hasMore, setHasMore] = useState(true);  // Flag to check if more products are available

    const fetchProducts = useCallback(async () => {
        try {
            setError(false);
            setLoading(true);

            // Fetch products with the "new" tag, adding pagination
            const response = await getProductsByTagService(["new"], page);

            if (response && response.data) {
                setProducts((prevProducts) => [
                    ...prevProducts,
                    ...response.data,  // Append new products to the list
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

    // IntersectionObserver callback to trigger when user reaches the bottom
    const loadMoreRef = React.useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    setPage((prevPage) => prevPage + 1); // Load next page of products
                }
            },
            { rootMargin: "100px" }  // Start loading when user is near the bottom
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [hasMore, loading]);

    return (
        <section className="container mx-auto py-16 bg-background_primary">
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
                        {/* Horizontal Scroll Container */}
                        <div className="flex overflow-x-auto space-x-4 py-4 px-4">
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
                        {hasMore && !loading && (
                            <div ref={loadMoreRef} className="text-center py-4">
                                <p className="text-gray-500">Loading more products...</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </section>
    );
}

export default FeatureSection;
