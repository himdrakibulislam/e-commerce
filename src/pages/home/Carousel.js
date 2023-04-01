import React from 'react';
import { Carousel } from 'flowbite-react';
import { useSlidersQuery } from '../../api/appInfo';
import Spinner from '../../progressbar/Spinner';
const HomeCarousel = () => {
    const {data,isLoading} = useSlidersQuery();
    if(isLoading){
      return <div className='my-14'>
        <Spinner/>
      </div>
    }
    
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel 
        slideInterval={10000}
        >
          {data?.sliders.map((sl,index)=><img
           key={index}
           className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            src={process.env.REACT_APP_SERVER_URL+sl.image}
            alt="..."
          />)}
        </Carousel>
      </div>
    );
};

export default HomeCarousel;