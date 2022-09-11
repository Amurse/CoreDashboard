import { Button } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { externalLinks, openInNewTab } from '../../helpers/functions/general';
import { selectAppStatus } from '../../redux/features/App/AppStatus';
import { selectUser } from '../../redux/features/User/UserSlice';
import ConnectWallet from '../../web3/ConnectWallet';
import NewHeader from '../Header/NewHeader';
import peopleChat from '../../images/test/peoplechat.svg'
import livecall from '../../images/test/livecall.svg'
import ImageImporter from '../Helpers/ImageImporter';
import { ChatWindow } from '@amurse/chatwindow';
const TokenPage = () => {
  const appStatus = useSelector(selectAppStatus);
  const mobileView = appStatus.mobileView;
  const user = useSelector(selectUser);

  const [customAddress, setCustomAddress] = useState('');
  const [refreshChat, setRefreshChat] = useState(true);
  const refresh = () => setRefreshChat(!refreshChat);

  return (
    <div className='width100 flex alignCenter'>
      <NewHeader />
      <div className='width100 headerMargin flex justifyEvenly flexWrap padHorMed' style={{marginBottom: '90px'}}>
        <div className='flex justifyCenter alignCenter textCenter flexCol'>
          <ImageImporter source={peopleChat} scale maxWidth={500}/>

          <div className={`${mobileView ? 'textBig' : 'textHuge'} blue bold marVerMed`}>Send Message</div>
          <div className={`${mobileView ? 'textMed' : 'textBig'} gray`}>Use our chat window</div>
          <div className='marVerMed'>
            {!user.address && <ConnectWallet buttonStyle={{width: '200px'}} buttonSize={'large'} button={true} text="Connect Wallet" />}
            {user.address && <Button type='primary' className='borderRadius' size='large' style={{ width: '200px' }}
              onClick={() => {
                setCustomAddress('0x2a91633434e9826900FC4e15A8598f4386e68CF0');
                refresh()
              }}
            >Message</Button>}
          </div>
          <div className='textMed gray marVerMed' style={{maxWidth: '400px'}}>
            Please tell us about yourself and what you are trying to use Amurse for. 
            Also give your contact details as we are still working on notifications for Amurse 😉
          </div>
        </div>

        <div className='flex justifyCenter alignCenter textCenter flexCol'>
        <ImageImporter source={livecall} scale maxWidth={500}/>

          <div className={`${mobileView ? 'textBig' : 'textHuge'} blue bold marVerMed`}>Live Call*</div>
          <div className={`${mobileView ? 'textMed' : 'textBig'} gray`}>Book call with the founders</div>
          <div className='marVerMed'>
          <Button type='primary'  onClick={()=>openInNewTab(externalLinks.calendlyJosh)} className='borderRadius' size='large' style={{ width: '200px'}}>Book Call!</Button>

          </div>
          <div className='textMed gray marVerMed' style={{maxWidth: '400px'}}>
            It'll be a fun informal call! We are happy to just have a casual conversation. 
            Just a couple of Canadian university students tryna make it in life. <span className='blue bold'>Oh btw, this is the ONLY way to get a token</span> 😎😊
          </div>
        </div>
       {<ChatWindow receiverToken={process.env.REACT_APP_AMURSE_ACCESS_TOKEN} interCom={false} customAddress={customAddress} refresh={refreshChat} tag={'Amurse Inquiry'}/>}
      </div>
    </div>
  )
}

export default TokenPage