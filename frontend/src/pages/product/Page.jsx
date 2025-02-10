import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductByIdService } from '../../services/index.js'; // adjust path as needed
import AddToCart from '../../components/atom/AddToCart.jsx';
function ProductPage() {
  const { _id } = useParams(); // Get the product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductByIdService(_id);
        setProduct(response.data);
      } catch (err) {
        setError('Error fetching product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.image} alt={product.name} className="w-full h-auto" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl font-semibold text-gray-900 mt-4">Price: ${product.price}</p>
          <p className="text-sm text-gray-500 mt-2">Quantity Available: {product.quantity}</p>
          <AddToCart key ={_id} productId={_id}/>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
