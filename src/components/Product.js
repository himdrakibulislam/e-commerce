import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import ReactImageGallery from 'react-image-gallery';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductsQuery } from '../api/appInfo';
import Loading from '../progressbar/Loading';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import ProductNotFound from './ProductNotFound';
const Product = () => {
    const {slug} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError,isLoading,data} = useProductsQuery();
    const product = data?.products.find(pd => pd.slug === slug);
    
    const [sizes,setSize] = useState('');
    useEffect(()=>{
      if(product?.sizes){
        setSize(JSON.parse(product?.sizes)?.[0].value);
      }
 
        if(isError){
            toast.error('Something Went Wrong.');
            navigate('/');
        }
    },[isError,navigate,product?.sizes]);
    if(isLoading){
        return <Loading/>
    }
    document.title = product.name || 'product';
    const images = [];
    product?.product_images.forEach(pd => {
      const image = {
        original: process.env.REACT_APP_SERVER_URL+pd.image,
        thumbnail:process.env.REACT_APP_SERVER_URL+pd.image
      }
      images.push(image);
    });

    return (
        <div className='my-14 px-2'>

            {product ? <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 gap-4'>
              <div>
              <ReactImageGallery 
                items={images} 
                lazyLoad={true}
                showNav={false}
                showPlayButton={false}
                showFullscreenButton={false}
                thumbnailPosition="left"
                />
              </div>
              <div className='text-justify px-3'>
              <h1 className='font-normal text-2xl	'> {product.name} </h1>
              <span className="text-3xl font-bold text-gray-900 ">	
              <span className='font-bold'>&#2547;</span> {product.selling_price}</span>

              <br />
              <s >	
              <span className='font-bold'>&#2547;</span> {product.selling_price}</s>
              <br />



              
              {product?.sizes ?<div className=' overflow-x-auto'>
                <p className='font-bold'>Sizes</p>
                
                <div className='flex'>
                {
                  JSON.parse(product?.sizes).map((size,index)=> <button 
                  onClick={()=>setSize(size?.value)}
                  className={ 
                    `px-4 py-2 rounded border m-2 hover:bg-black
                    hover:text-white
                     ${size?.value === sizes ? "text-white bg-black":""}`}
                    key={index}
                  >
                    <p>{size.value}</p>
                  </button>)
                }
                </div>
              </div> 
              :null }

              {product.quantity < 1 ?<p className='text-red-500 my-4'>Out of Stock</p>:<button 
              onClick={()=>dispatch(addToCart({
                id:product?.id,
                name:product?.name,
                quantity:product?.quantity,
                price:product?.selling_price,
                size:sizes,
                image:product?.product_images[0]?.image,
                slug:product?.slug
              }))}
              className='border border-cyan-500 px-3 py-2 my-5 hover:bg-black hover:text-white rounded'><span className='font-bold'>Add To Cart</span> </button> }
              

              
              <p className='font-bold'>
              Specifications
              </p>
              <p className='my-2'>
                <span ><span className='font-bold'>Category : </span>{product?.category.name}</span>

                <br />
                <span ><span className='font-bold mt-4'>Brand : </span>{product?.brands.name}</span>
                
              
              </p>
                <div id='small_description' dangerouslySetInnerHTML={{__html:product?.small_description}}>
                 {/* {product?.small_description} */}
                </div>
              </div>

              <div className='my-8 px-2'>
                <p className='font-bold'>Description</p>
                <p className='text-justify'>{product.description}</p>
              </div>
            </div>:<ProductNotFound/>}




           
                
        </div>
    );
};

export default Product;