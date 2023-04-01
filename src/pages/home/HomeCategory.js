import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import { useCategoriesQuery } from '../../api/appInfo';
import Loading from '../../progressbar/Loading';
import shuffleArray from '../../utils/functions';
const HomeCategory = () => {
  const { isLoading, data } = useCategoriesQuery();
 
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
  if (isLoading) {
    return <div className="my-14"><Loading /></div>
  }
  const categories = shuffleArray([...data?.categories]);
  
  return (
    <div className="mx-auto max-w-2xl py-4 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">

      <h3 className='text-sm md:text-2xl lg:text-2xl font-bold tracking-tight text-gray-900 mb-3 inline'>Shop by Category</h3>

      <Link to="categories"
        className='float-right text-sm md:text-lg lg:text-lg inline text-indigo-800 font-bold'>Browese all categories <AiOutlineArrowRight className='inline' /></Link>

      <Carousel className='mt-4' responsive={responsive}>

        {categories?.length < 0 ? <p>Empty</p> : null}
        {
         categories
            ?.slice(0, 5)
            .map(ct => <div
              key={ct.id}
              style={{
                backgroundImage: `url(${process.env.REACT_APP_SERVER_URL + ct.image})`
              }}
              className="w-full h-[20vh] md:h-[50vh] lg:h-[50vh] bg-cover bg-center  rounded-lg">
              <div className="w-full h-full flex justify-center items-center backdrop-blur-sm ">
                <Link to={`category/products/${ct.id}`} 
                className="cursor-pointer"
                > 
                <span className="text-dark-800 border rounded-lg
                    border-rose-800 font-bold text-sm md:text-2xl lg:text-2xl w-1/2 text-center">{ct.name} </span>
                </Link>
              </div>
            </div>)
        }


      </Carousel>


    </div>
  );
};

export default HomeCategory;