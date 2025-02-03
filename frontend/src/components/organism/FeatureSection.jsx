import React, {useEffect, useState} from 'react'
import {getProductsByTagService} from '../../services/index.js'




function FeatureSection() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
    

    useEffect(()=>{
        ;(async()=>{
            try {
                setError(false)
                const getProduct = await getProductsByTagService([featured])
                const products = await JSON.parse(getProduct).data;
                setProduct(products)
                setLoading(false)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        })()
    }, [])

  return (
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
  )
}

export default FeatureSection