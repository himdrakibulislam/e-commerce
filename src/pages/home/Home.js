import React from 'react';
import HomeCarousel from './Carousel';
import HomeCategory from './HomeCategory';
import HomeProducts from './HomeProducts';
const Home = () => {
    document.title = 'ekantomart';
    return (
    <div className="bg-white">
      <HomeCarousel/>
      <HomeCategory/>
      <HomeProducts/>
    </div>
    );
};

export default Home;
















