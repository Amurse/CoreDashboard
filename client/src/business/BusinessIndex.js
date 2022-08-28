import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {selectAppStatus} from '../redux/features/App/AppStatus';
import Header from './Header/Header';

import ChatWindow from '@amurse/chatwindow';
import ConnectWallet from '../web3/ConnectWallet';
import { selectUser } from '../redux/features/User/UserSlice';
import TokenGenrator from './TokenGenerator/TokenGenrator';
import NewHeader from '../components/Header/NewHeader';

const BusinessPage = () => {

  const appStatus = useSelector(selectAppStatus);
  const mobileView = appStatus.mobileView;
  const user = useSelector(selectUser);

  useEffect(() => {
    document.title = 'Amurse';
  }, []);

  
  return (
    <div className="width100">
      <NewHeader/>
      <div className='headerMargin flex flexWrapReverse width100' style={{height: '80vh'}}>
        <div className=' flex flexCol justifyCenter textCenter padHorMed alignCenter'> 
          <h1 className='blue'>Generate API Access Token</h1>
          <h3>Integrate Amurse API onto your website for an easy doorstep to your end users.</h3>
          {!user.address && <h3>Connect wallet & try the chat window below!</h3>}
          <br/>
          {!user.address && <ConnectWallet text={'Connect Wallet'}  button/>}
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
        <ChatWindow receiverToken={process.env.REACT_APP_AMURSE_ACCESS_TOKEN} />
      </div>
    </div>
  );
};

export default BusinessPage;