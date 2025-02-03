import React, { useEffect, useState } from "react";
import { getProductsByTagService } from "../../services/index.js";
import {ProductCard} from "../index.js"; // Ensure this is correctly imported

function FeatureSection() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                setError(false);
                setLoading(true);

                // Fetch products with "featured" tag
                const response = await getProductsByTagService(["new"]);

                if (response && response.data) {
                    setProducts(response.data);
                } else {
                    setProducts([]);
                }

            } catch (error) {
                console.error("Error fetching products:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <section className="container mx-auto py-16 bg-background_primary">
            <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10 tracking-wide">
                Featured Products
            </h2>
            <p className="text-center text-gray-600 text-lg mb-12">
                Explore the latest trends with our handpicked collection
            </p>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">Failed to load products.</p>
            ) : products.length === 0 ? (
                <p className="text-center text-gray-500">No featured products found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            _id ={product._id}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default FeatureSection;
