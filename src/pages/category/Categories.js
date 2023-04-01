import React from 'react';
import { Link } from 'react-router-dom';
import { useCategoriesQuery } from '../../api/appInfo';
import Spinner from '../../progressbar/Spinner';
import shuffleArray from '../../utils/functions';

const Categories = () => {
    const {isLoading,data} = useCategoriesQuery();
   

    if(isLoading){
        return <div className='my-14'>
            <Spinner />
        </div> 
    }
    
    
    const shuffledItems = shuffleArray([...data?.categories]);
    return(
        <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-4 sm:py-24 lg:max-w-none lg:py-4">
            <h2 className="text-2xl font-bold text-gray-900">All Categories</h2>
  
         <div className="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {shuffledItems
              ?.map((callout) => (
                <div key={callout.name} className="group relative">
                  <div className="relative h-50 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                    <Link to={`/category/products/${callout.id}`}>
                    <img
                      src={process.env.REACT_APP_SERVER_URL +callout.image}
                      alt={process.env.REACT_APP_SERVER_URL +callout.image}
                      className="h-full w-full object-cover object-center"
                    />
                    </Link>
                  </div>
                  {/* <h3 className="mt-6 text-sm text-gray-500">
                    <a href={callout.href}>
                      <span className="absolute inset-0" />
                      {callout.name}
                    </a>
                  </h3> */}
                   <p className="my-6 text-base font-semibold text-gray-900">{callout.name}</p>
                </div>
              ))}


            </div> 

          </div>
        </div>
      </div>);
};

export default Categories;