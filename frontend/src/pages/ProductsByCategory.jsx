import React from 'react';
import { Sidebar, ProductByCategory } from '../components/index.js';

function ProductsByCategory() {
  return (
    <>
      <div className='grid grid-cols-12'>
        <div className='bg-background_secondary hidden md:block md:col-span-2'>
          <Sidebar />
        </div>
        <div className='bg-background_primary col-span-12 md:col-span-10'>
          {/* Pass the tags prop to ProductByCategory */}
          <ProductByCategory tags={['new', 'trending']} />
        </div>
      </div>
    </>
  );
}

export default ProductsByCategory;