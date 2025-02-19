import React, { useEffect, useState, useCallback } from 'react';
import { getProductsByTagService } from '../../services';
import { ProductCard } from '../index.js';

function ProductByCategory({ tags }) {
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    setError(false);
  }, [tags]);

  const fetchProducts = useCallback(async () => {
    try {
      setError(false);

      const response = await getProductsByTagService(tags, page);
      if (response && response.data) {
        setProducts(response.data);
        setHasMore(response.data.length > 0);

       
        const productsPerPage = 12; 
        const totalProducts = response.total || response.data.length; 
        setTotalPages(Math.ceil(totalProducts / productsPerPage));
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(true);
    }
  }, [page, tags]);

 
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, page, tags]);

 
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className='mt-2 ml-6'> 
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
            _id={product._id}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          Next
        </button>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 text-center mt-4">Error fetching products. Please try again later.</div>}
    </div>
  );
}

export default ProductByCategory;