import React from 'react';

import { Link } from 'react-router-dom';

const App = () => {
  document.title = 'Ekantomart';
  return (
    <div className='my-10'>
     
      <h3>Ekantomart </h3>
      <Link to="/login" className='m-12 border border-cyan-500 p-3  block'>Login</Link>

      <Link to="/profile" className='m-12 border border-cyan-500 p-3  block'>Profile</Link>
     
    </div>
  );
};

export default App;