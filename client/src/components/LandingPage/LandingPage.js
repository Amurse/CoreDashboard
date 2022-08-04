import React, {useEffect} from 'react';
import { useSelector} from 'react-redux';
import {selectAppStatus} from '../../redux/features/App/AppStatus';
import Header from '../Header/Header';
import Lottie from 'react-lottie';
import './LandingPage.css';
import {Zoom} from 'react-reveal';
import {blockchain} from '../../Animations/Animations';

const LandingPage = () => {
  const appStatus = useSelector(selectAppStatus);
  const mobileView = appStatus.mobileView;


  useEffect(() => {
    document.title = 'Amurse';
  }, []);



  return (
    <div className="landingPage">
      <Header />


      <div className='landingPageContent headerMargin'>
        <div className='landingPageContentMsg'>
          <h2 className='blue'>Hey! Glad you're here!</h2>
          <h1 style={{fontSize: '72px'}} className='blue bold'>@Amurse</h1>
         
          <Zoom>
            <div>
              <h1>Communication ◾ Functionality ◾ Simplicity</h1>
              <h2 className='gray'>The Web3 Human Hub</h2>
              {/* <Button disabled loading={false} style={{marginTop: '32px'}} type='primary' size='large' onClick={createUser}>Create Workspace</Button> */}
            </div>
          </Zoom>
          {/* <h3>Connect Metamask to get started</h3> */}

        </div>
        {!mobileView && <div className='landingMascot'>
          <Lottie options={blockchain}
            height={600}
            // width={100}
          />
          {/* <div id="landingPagePicture" style={{
            height: '100%', width: '600px'
          }}></div> */}
        </div>}

      </div>

      <div className='landingPageFooter'>
        <div className='landingPageFooterLeft gray'>
                    Copyright © 2022 Amurse.
        </div>
        <div className='landingPageFooterRight blue'>
          
          {/* <SiDiscord className='icon hover' onClick={()=>openInNewTab('https://discord.gg/rcYNvfQy')}/>

          <InstagramFilled className='icon hover' onClick={()=>openInNewTab('https://www.instagram.com/officialrealtorpanel/')}/>
          <MessageFilled className='icon hover' onClick={()=>openInNewTab('https://forms.gle/Dq3A9vbN68MFLS397')} /> */}
        </div>

      </div>


    </div>
  );
};

export default LandingPage;
