import React from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar, ProductByCategory } from '../components';

function ProductsByCategory() {
  const { tag } = useParams(); // tag will be 'new', 'women', or 'men'
  
  // You can now use this value to determine what tags to pass.
  // For example, if you want to support multiple tags or provide defaults:
  let tags = [];
  if (tag === 'new') {
    tags = ['new'];
  } else if (tag === 'women') {
    tags = ['new','women'];
  } else if (tag === 'men') {
    tags = ['new','men'];
  } else {
    // default to all tags or a specific default behavior
    tags = ['new', 'trending', 'women', 'men'];
  }

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
