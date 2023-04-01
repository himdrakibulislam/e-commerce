import React from 'react';
import notFound from '../img/ProducNotFound.png';
const ProductNotFound = () => {
    return (
        <div className='my-14 text-center'>
              <img className='w-6/12 mx-auto' src={notFound} 
              alt="notfound" />
              <p className='font-bold my-10'>No Product Found</p>
    </div>
    );
};

export default ProductNotFound;