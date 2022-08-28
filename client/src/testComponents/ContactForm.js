import React from 'react';
import waitlist from '@zootools/waitlist-js'
import { Button } from 'antd';

const ContactForm = () => {
  const clickPopup = (event) => {
    event.preventDefault();
  
    // Pass your waitlist ID
    waitlist.openPopup("cBgEp90ue80FtvmazUkg")
  } 
  return (
    <Button onClick={clickPopup}>Enter Info</Button>
    )
}

export default ContactForm