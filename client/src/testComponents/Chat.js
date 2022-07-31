import React from 'react';
import ChatWindow from 'amurse-chatwindow-basic';
import Header from '../components/Header/Header';
import { Link } from 'react-router-dom';

const Chat= () => {
  return (
    <div className='flex flexCol align-center justify-center'>
      <Header />
  
      <h1 className='blue'>Chat Window Demo Page</h1>
      <h2>Close browser to logout of the chat</h2>
         <h3>Click <Link to='/'>here</Link> to return to homepage</h3>
      
 
      <ChatWindow receiverAddress="0x434a8f1B7112e065CA52A133cF632135Eeb9d806"/>
    </div>
    
  )
}

export default Chat