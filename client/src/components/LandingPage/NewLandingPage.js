import React from 'react'
import ImageImporter from '../Helpers/ImageImporter'
import NewHeader from '../Header/NewHeader';
import illustration from '../../images/test/illustration.png'
import chatWindowPic from '../../images/test/chatWindow.svg'
import dashboardPic from '../../images/test/dashboard.svg'
import girlPad from '../../images/test/girlpad.png';
import teamDiscuss from '../../images/test/teamdiscuss.png'
import girlThink from '../../images/test/girlthink.png'
import { useSelector } from 'react-redux';
import { selectAppStatus } from '../../redux/features/App/AppStatus';
import { Button } from 'antd';
import { BiGroup, BiNetworkChart, BiSupport } from 'react-icons/bi';
import { Bounce, Fade, Flip, Slide, Zoom } from 'react-reveal';
import { BsLinkedin, BsTwitter } from 'react-icons/bs';
import { externalLinks, openInNewTab } from '../../helpers/functions/general';
import { useHistory } from 'react-router-dom';

const NewLandingPage = () => {
  const appStatus = useSelector(selectAppStatus);
  const mobileView = appStatus.mobileView;
  const history = useHistory();
  const smallScreen = appStatus.smallScreen;

  const Section1 = () => (
    <div className='flex flexWrapReverse width100 justifyEvenly marVerMed'
      style={{flex: '0.8'}}
    >
        <div className={`flex flexCol justifyCenter ${!mobileView && 'padHorHuge'} alignCenter marVerMed`}>
          <div className={`${mobileView? 'textBig' : 'textHuge'} bold`}>Wallet-to-Wallet Messaging API</div>
          <div className='textBig gray'>Connecting communities across web3.</div>
          {/* <div className='textMed bold blue'>Intercom, Peer-Peer, Group Chats</div> */}
        <div className={`${mobileView ? 'textMed' : 'textBig'} bold blue marVerMed`}>Integrate in 5 mins for React/NextJS</div>
        <div className='textMed gray'>**Only accepting select DApps</div>
    
        <div className='flex flexWrap justifyCenter width100'>

          <Button type='primary' onClick={()=>openInNewTab(externalLinks.docs)} className='marVerMed margin16 borderRadius yellowThemeButton' size='large' style={{ width: '200px'}}>Integrate</Button>
          <Button type='primary'  onClick={()=>history.push('/inquiry')} className='marVerMed margin16 borderRadius' size='large' style={{ width: '200px'}}>Get Token</Button>
        </div>
       
        
        
        </div>
      <div className='flex alignCenter flex1' style={{ maxWidth: '500px' }}>
        <Fade>
          <ImageImporter source={illustration} scale minWidth={300}></ImageImporter>
        </Fade>
          
        </div>
      </div>
  )

  const Section1Icons = () => (
    <div className='width100 flex alignCenter justifyEvenly  bold marVerHuge flexWrap textBigBig'>
      <div className={`flex flexCol alignCenter justifyCenter marVerMed ${mobileView && 'width100 marVerHuge'}`}>
        <BiSupport className='blue textHugeHuge'></BiSupport>
        <span>Intercom</span>
      </div>
      <div className={`flex flexCol alignCenter justifyCenter marVerMed ${mobileView && 'width100 marVerHuge'}`}>
        <BiNetworkChart className='blue textHugeHuge'></BiNetworkChart>
        <span>Peer-to-Peer</span>
      </div>
    </div>
  );

  const TextSection = (props) => {
    const { heading, text } = props;
    return (
      <div className='flex flexCol alignCenter justifyCenter marVerSection padHorMed textCenter'>
        <div className={`bold blue ${mobileView? 'textBig' : 'textHuge'}`}>{heading}</div>
        <div className='gray textBig'>{text}</div>
      </div>
    )
  }

  const CustomerValue = () => {
    return (
      <div className='width100 marVerSection padHorLarge textCenter'>
        
          <div className='width100 blueBackground maxWidth flex justifyCenter textCenter'>
            <span className={`white bold ${mobileView ? 'textMed' : 'textHuge'}`}>Enhance Your Website!!</span>
          </div>
        
        
        <div className='flex flexWrap width100 marVerHuge'>
          
            <div id="value1" className='flex justifyEvenly width100 alignCenter flexWrapReverse'>
              <Slide left>
                <div className={`${mobileView ? 'textBig' : 'textHuge'} bold`}>
                  <span className='blue'>Increase</span> Engagement
                </div>
              </Slide>
              <ImageImporter source={girlPad} scale maxWidth={500} />
            </div>
          
          
          <div id="sideByside" className='flex width100 justifyEvenly marVerMed flexWrapReverse'>
            
              <div id="value2" className='flex flexCol' style={{marginTop: !smallScreen &&'-64px'}}>
                <ImageImporter source={girlThink} scale maxWidth={500} />
                <Slide left>
                  <div className={`${mobileView ? 'textBig' : 'textHuge'} bold`}>
                    <span className='blue'>Add</span> Value
                  </div>
                </Slide>
              </div>
           
            
              <div id="value3" className='flex flexCol' style={{ flexDirection: smallScreen && 'column-reverse'}}>
                {/* {smallView && <ImageImporter source={teamDiscuss} scale maxWidth={500} />} */}
                <Slide right>
                  <div className={`${mobileView ? 'textBig' : 'textHuge'} bold`}>
                    <span className='blue'>Boost</span> Functionality
                  </div>
                </Slide>
                {<ImageImporter source={teamDiscuss} scale maxWidth={500} />}
              </div>
            
            
           

          </div>
        </div>
      
          <div className='width100 blueBackground maxWidth flex justifyCenter textCenter marVerHuge'>
            <span className={`white bold ${mobileView ? 'textMed' : 'textHuge'}`}>In Under 5 Minutes!</span>
          </div>

          
      </div>
    )
  }

  const FinalSection = () => {
    return (
      <div className='marVerSection flex alignCenter justifySpaced width100 borderRadius padHorMed' style={{height: '300px'}}>
        <div className='flex flexCol flex1 textCenter justifyCenter alignCenter blueBackground padVerLarge borderRadius'>
          <div className='width100 padHorMed'><ImageImporter scale maxHeight={48} maxWidth={300} /></div>
          
          
          <span className='white textBig marVerSmall'>Wallet-to-Wallet Messaging API</span>
          
            <Button type='default' onClick={()=>openInNewTab(externalLinks.docs)} size='large' className='marVerMed yellowThemeButton' style={{ width: '300px' }}>Integrate</Button>
            <Button onClick={()=>history.push('/inquiry')} type='default' size='large' className='marVerMed' style={{width: '300px'}}>Get Token</Button>
       
         
          <div className='flex justifyCenter textBig marVerMed'>
            <BsTwitter onClick={()=>openInNewTab('https://twitter.com/_amurse')} className='justifyItemMargin hover'/>
            {/* <BsLinkedin  className='justifyItemMargin hover'/> */}
          </div>
        </div>
      </div>
    )
  }

  

  

  return (
    <div className='width100 maxWidth' style={{paddingBottom: '64px'}}>
      <NewHeader />
      
      {/* <div className='padHorMed height100%'></div> */}
      <div className='padHorMed textCenter headerMargin flex flexCol justifyCenter'
        style={{minHeight: '90vh'}}
      >
        <Section1/>
        <Section1Icons />
        
      </div>

      <CustomerValue/>

      <Zoom>
        <TextSection
            heading="Chat Window For Your Website!"
            text="Out-of-the-box functionality for easy wallet-to-wallet messaging on your platform."
        />
      </Zoom>
      

      <Zoom>
        <div className='width100 flex justifyCenter'>
          <ImageImporter source={chatWindowPic} scale maxWidth={1000}></ImageImporter>
        </div>
      </Zoom>
     
    
      
      
      <Slide bottom>
        <div className=' width100 flex flexCol justifyCenter'>
          <TextSection
            heading="Streamlined Dashboard"
            text="Manage messages in one place and send new ones across any chain (coming soon)."
          />
        </div>
      </Slide>
     
      
      <Zoom>
      <div className='width100 flex justifyCenter marVerMed padHorMed'>
        <ImageImporter source={dashboardPic} scale maxWidth={1000}></ImageImporter>
      </div>
    </Zoom>
      

      {/* <div className=' width100 flex flexCol justifyCenter'>
        <TextSection
          heading="Demo Video"
          text="Watch the founders demo the current functionality..."
        />
      </div> */}

      
        <FinalSection/>
      

      
      
    </div>
  )
}

export default NewLandingPage