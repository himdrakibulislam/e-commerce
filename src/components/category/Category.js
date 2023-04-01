import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProductsQuery } from '../../api/appInfo';
import Loading from '../../progressbar/Loading';
import ProductNotFound from '../ProductNotFound';

const Category = () => {
    const { category_id } = useParams();
    const { isLoading, data } = useProductsQuery();
    const categoryproduct = data?.products.filter(pd => pd.category_id === parseInt(category_id));
    
    if (isLoading) {
        return <Loading />
    }
    
    return (
        <div className='my-6 mx-2'>



            {
                !categoryproduct.length <= 0 ? <div className='mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                    {categoryproduct
                        // .sort( () => Math.random() - 15) 
                        ?.slice(0, 8)
                        .map((product) => (<div
                            key={product.id}
                            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow  dark:border-gray-700">
                            <Link to={`/product/${product.slug}`}

                            >
                                <img className="p-5 rounded-t-lg" src={process.env.REACT_APP_SERVER_URL + product?.product_images[0]?.image} alt='' />
                            </Link>
                            <div className="px-2 pb-5">
                                <Link to={`/product/${product.slug}`}>
                                    <h5 className="text-justify lg:text-xl font-semibold tracking-tight">{product?.name.slice(0, 40)}</h5>
                                </Link>


                                
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div>
                                        <span className="text-3xl font-bold text-gray-900 ">	<span className='font-bold'>&#2547;</span> {product.selling_price}</span>
                                        <br />
                                        <s><span className='font-bold'>&#2547;</span> {product.original_price}</s>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>

                        ))}
                </div> : <ProductNotFound />
            }

        </div>
    );
};

export default Category;