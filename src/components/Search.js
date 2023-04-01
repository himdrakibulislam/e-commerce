import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { useProductsQuery } from '../api/appInfo';
import { setSearchDialog } from '../features/cart/cartSlice';

const Search = () => {
    const {searchDialog} =useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [searchResult,setSearchResult] = useState([]);
    const [searchPrompt,setSearchPrompt] = useState('');
    const {data} = useProductsQuery();
    const navigate = useNavigate();
    const searchRedirect =(url) =>{
      dispatch(setSearchDialog(false));
      navigate(url);
    }
    
    const searchProducts = (e) =>{
        const searchQuery = e.target.value;
        setSearchPrompt(searchQuery)
        if(!searchQuery){
         setSearchResult([]);
         return;
        }else{
          const filteredProducts = data.products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
          setSearchResult(filteredProducts);
        }
        
    }
   
    return (
        <div>
          
            {searchDialog? <>
        <div
        
              className="justify-center items-top flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-full lg:w-6/12 md:w-6/12 my-6 mx-auto max-w-full">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                  <div  className='w-full mx-6 mb-2'>
                    <input 
                    className='rounded-xl w-full'
                    onChange={searchProducts}
                    type="search"  placeholder='Search' />
                  </div>

                    <button
                      onClick={() => dispatch(setSearchDialog(false)) }
                      className="inline p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                     
                    >
                      <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/* <p className='mx-2 font-bold'>Trending Products </p>
                  <div className="overflow-x-auto flex">
                   
                  {
                    !data?.products?.length <= 0 ?
                        data?.products
                        ?.filter((product) => product.trending === 1)
                        ?.slice(0,3)
                        ?.map(sr => <div
                        
                        className='mx-2  border rounded-xl my-2 w-full'
                        key={sr.id}>
                            <Link
                            className='flex '
                            to={`/product/${sr.slug}`}>
                            <img
                            className='w-6 m-3'
                            src={
                                process.env.REACT_APP_SERVER_URL+
                                sr?.product_images[0]?.image} alt="" />
                              
                            <div>
                            <small className='font-sm'>{sr.name?.slice(0,20)}</small>
                           <br />
                            <small className='font-sm'>&#2547; {sr?.selling_price}</small>
                            </div>
                            </Link>
                        </div>)
                      : <p className='text-center font-bold my-10'>No results</p>
                  }
                  </div> */}
                 {!searchResult?.length <1 ?  <p className='mx-2 my-2'>Showing {searchResult?.length} results for <b>"{searchPrompt}"</b> </p> : null}

                  {
                    !searchResult?.length <= 0 ?
                        searchResult
                        ?.slice(0,8)
                        ?.map(sr => <div
                        
                        className='mx-2 hover:bg-cyan-500 hover:rounded hover:text-white border rounded-xl my-2'
                        key={sr.id}>
                        
                            <button
                            className='flex w-full'
                            onClick={()=>searchRedirect(`/product/${sr.slug}`)}
                            
                            >
                            <img
                            className='w-6 m-3'
                            src={
                                process.env.REACT_APP_SERVER_URL+
                                sr?.product_images[0]?.image} alt="" />
                              
                            <div>
                            <p className='font-sm'>{sr.name?.slice(0,20)}</p>
                          
                            <b className='font-sm'>&#2547; {sr?.selling_price}</b>
                            </div>
                            </button>
                        </div>)
                      : <p className='text-center font-bold my-10'>No results</p>
                  }
                 
                </div>
              </div>
            </div>
           
           
       </> : null} 
        </div>
    );
};

export default Search;