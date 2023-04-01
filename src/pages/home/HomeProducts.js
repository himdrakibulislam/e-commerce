import React, { useState } from 'react';
import { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { Link, useLocation } from 'react-router-dom';
import { useProductsPaginateQuery, useProductsQuery } from '../../api/appInfo';
import Loading from '../../progressbar/Loading';
import shuffleArray from '../../utils/functions';

const HomeProducts = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };

  const [activePage,setActivePage] = useState(1);
  const { isLoading, data,isError } = useProductsQuery();
  const { isLoading:paginateLoading, data:paginateProdicts,isError:pError } = useProductsPaginateQuery(activePage);

  const [totalPage,setTotalPage] = useState();
 
  useEffect(()=>{
    setTotalPage([...Array(paginateProdicts?.products?.last_page).keys()]);
  
  },[paginateProdicts?.products?.last_page])
  // const dispatch = useDispatch();
  const { pathname } = useLocation();

  if (isLoading || paginateLoading) {
    return <div className="my-14"><Loading /></div>
  }
  if(isError || pError){
    return <p className='my-14'>Something Went Wrong !!!</p>
  }
  const products = shuffleArray([...data?.products]);
  return (
    <>
    {/* products page  */}
      {
        pathname.includes('products') && ( <><div className="mt-6 grid grid-cols-2 gap-y-5 gap-x-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mb-6">

        {paginateProdicts?.products?.data
          ?.map((product) => (<div
            key={product.id}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow  dark:border-gray-700">
            <Link to={`/product/${product.slug}`}

            >
              <img className="p-5 rounded-t-lg" src={process.env.REACT_APP_SERVER_URL + product?.product_images[0]?.image} alt='' />
            </Link>
            <div className="px-2 pb-5">
              <Link to={`/product/${product.slug}`}>
                <h5 className="text-xl md:text-xl lg:text-xl font-thick lg:font-semibold tracking-tight text-justify">{product?.name.slice(0, 40)}</h5>
              </Link>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  <span className="text-xl md:text-3xl lg:text-3xl font-bold text-gray-900 ">	<span className='font-bold'>&#2547;</span> {product.selling_price}</span>
                  <br />
                  <s><span className='font-bold'>&#2547;</span> {product.original_price}</s>
                </div>
               
              </div>
            </div>
          </div>

          ))}
          





      </div>
     <div className="text-center my-4">
     <nav aria-label="Page navigation example">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <button 
          onClick={()=>{
            setActivePage(activePage - 1);
          }}
          disabled={activePage === 1}
          className={`block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white  ${activePage === 1 ? 'cursor-not-allowed bg-gray-400':null}`}>
            <span className="sr-only">Previous</span>
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" ></path></svg>
          </button>
        </li>
        {
          totalPage?.map((page,index) => 
         
          {
            ++index
            return(<li
            key={index}
            >
             <button 
             onClick={()=>setActivePage(index)}
             className={`px-3 py-2 leading-tight text-gray-500 hover:bg-green-400 hover:text-white border border-gray-300 hover:bg-gray-100  ${index === activePage ? 'bg-green-400 text-white':null}`}>{index}</button>
           </li>)})
        }
        
        
        <li>
          <button 
           onClick={()=>{
             setActivePage(activePage + 1);
          }}
           disabled={totalPage?.length === activePage}
           className={`block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${totalPage?.length === activePage ? 'cursor-not-allowed bg-gray-400':null}`}>
            <span className="sr-only">Next</span>
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path></svg>
          </button>
        </li>
      </ul>
    </nav>
     </div>
      </>)
      }
      {/* homepage  */}
      
      {
        !pathname.includes('products') && (<div>
          <div className="mx-auto max-w-2xl py-4 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
            <h4 className='text-2xl font-bold tracking-tight text-gray-900 mb-3'> <span
              className='text-fuchsia-700	'
            >Trending</span>  Products</h4>
            <Carousel responsive={responsive}>
              {products?.length < 0 ? <p>Empty</p> : null}
              {
                products
                  ?.filter((product) => product.trending === 1)
                  .sort((product) => Math.random() - product.id)
                  ?.slice(0, 8)
                  .map(product => <div
                    key={product.id}
                    className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow  dark:border-gray-700">
                    <Link to={`product/${product.slug}`}

                    >
                      <div className="my-2">
                        <img className="p-5 rounded-t-lg" src={process.env.REACT_APP_SERVER_URL + product?.product_images[0]?.image} alt='imgage' />
                      </div>

                    </Link>
                    <div className="px-2 pb-5">
                      <Link to={`product/${product.slug}`}>
                        <h5 className="text-sm md:text-lg lg:text-xl font-semibold tracking-tight">{product?.name.slice(0, 35)}</h5>
                      </Link>



                      <div className="grid grid-cols-1 md:grid-cols-2">
                        <div>
                          <span className="text-lg md:text-2xl lg:text-2xl font-bold text-gray-900 ">	
                          <span className=''>&#2547;</span> {product.selling_price}</span>
                          <br />
                          <s><span className='font-bold'>&#2547;</span> {product.original_price}</s>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  )}

            </Carousel>

          </div>
          <div className="mx-auto max-w-2xl py-4 px-4 sm:py-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">All <span
              className='text-green-900	'
            >Products</span> </h2>

            <div className="mt-6 grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

              {products 
                ?.slice(0, 8)
                .map((product) => (<div
                  key={product.id}
                  className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow  dark:border-gray-700">
                  <Link to={`product/${product.slug}`}

                  >
                    <img className="p-5 rounded-t-lg"
                    src={process.env.REACT_APP_SERVER_URL + product?.product_images[0]?.image} alt='product_image' />
                  </Link>

                  <div className="px-1 pb-5 ">
                    <Link to={`product/${product.slug}`}>
                      <h5 className="text-sm lg:text-xl md:text-xl font-semibold tracking-tight text-justify">{product?.name.slice(0, 40)}</h5>
                    </Link>


                    {/* <div className="flex items-center mt-2.5 mb-5">
           
        <svg aria-hidden="true" className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
        </div> */}
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div>
                        <span className="text-lg lg:text-2xl lg:text-2xl font-bold text-gray-900 ">	<span className='font-bold'>&#2547;</span> {product.selling_price}</span>
                        <br />
                        <s><span className='font-bold'>&#2547;</span> {product.original_price}</s>
                      </div>


                      {/* <div className='my-3 md:my-3 lg:my-3'>
                        <button
                          onClick={() => dispatch(addToCart({
                            id: product?.id,
                            name: product?.name,
                            quantity: product?.quantity,
                            price: product?.selling_price,
                            image: product?.product_images[0]?.image,
                            slug: product.slug
                          }))}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 float-left md:float-right lg:float-right">Add to cart</button>
                      </div> */}


                    </div>
                  </div>
                </div>

                ))}


            </div>

          </div>
        </div>)
      }
    </>
  );
};

export default HomeProducts;