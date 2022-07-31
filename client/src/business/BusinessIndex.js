import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header/Header';
// import TokenGenrator from './TokenGenerator/TokenGenrator';

const BusinessIndex = () => {
  return (
    <div className='flex flexCol align-center justify-center'>
      <Header />
      <div className='headerMargin'></div>
   
        <h1 className='blue'>Coming Soon!</h1>
      <h2>A streamlined way for your business to connect with end users!</h2>
      <h3>Click <Link to="/">here</Link> to return to homepage</h3>
    </div>
   
  )
}

export default BusinessIndex