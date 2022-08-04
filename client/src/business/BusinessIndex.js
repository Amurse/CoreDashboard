import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {selectAppStatus} from '../redux/features/App/AppStatus';
import Header from './Header/Header';
import ChatWindow from 'amurse-chatwindow-basic';


import ConnectWallet from '../web3/connectWallet/ConnectWallet';
import { selectUser } from '../redux/features/User/UserSlice';
import TokenGenrator from './TokenGenerator/TokenGenrator';

const BusinessPage = () => {

  const appStatus = useSelector(selectAppStatus);
  const mobileView = appStatus.mobileView;
  const user = useSelector(selectUser);

  useEffect(() => {
    document.title = 'Amurse';
  }, []);


  return (
    <div className="landingPage">
      <Header />
      <div className='landingPageContent headerMargin'>
        <div className='landingPageContentMsg'> 
          <h1 className='blue'>Generate API Access Token</h1>
          <h3>Integrate Amurse API onto your website for an easy doorstep to your end users.</h3>
          {!user.address && <h3>Connect wallet & try the chat window below!</h3>}
          <br/>
          {!user.address && <ConnectWallet />}
          {user.address && <TokenGenrator/>}
          <br/>
          <h2 className='blue'>It's Simple. Conventient. Anonymous.</h2>
          <h4>*Chat window remains connected until browser is closed (beta).</h4>

        </div>
        {!mobileView && <div className='landingMascot flex1'>
          
          <div id="businessPagePicture" style={{
            height: '100%', width:'100%'
          }}></div>
        </div>}
        <ChatWindow receiverAddress="0xCB2F82eB852D4746e744168DC5D5B2a49b524A3c"/>
      </div>
    </div>
  );
};

export default BusinessPage;