import React from 'react';
import { Sidebar, ProductByCategory } from '../components';
import { useParams } from 'react-router-dom';

function ProductsByCategory() {
  
  const { category } = useParams();
  
 
  const tags = category ? [category] : ['new'];

  return (
    <div className='grid grid-cols-12'>
      <div className='bg-background_secondary hidden md:block md:col-span-2'>
        <Sidebar />
      </div>
      <div className='bg-background_primary col-span-12 md:col-span-10'>
    
        <ProductByCategory tags={tags} />
      </div>
    </div>
  );
}

export default ProductsByCategory;
