import React from 'react'
import ImageImporter from '../Helpers/ImageImporter'
import NewHeader from '../Header/NewHeader';
import illustration from '../../images/test/illustration.png'
import chatWindowPic from '../../images/test/chatWindow.svg'
import dashboardPic from '../../images/test/dashboard.svg'
import { useSelector } from 'react-redux';
import { selectAppStatus } from '../../redux/features/App/AppStatus';
import { Button } from 'antd';
import { BiGroup, BiNetworkChart, BiSupport } from 'react-icons/bi';
import { Slide, Zoom } from 'react-reveal';
import { BsLinkedin, BsTwitter } from 'react-icons/bs';
import { externalLinks, openInNewTab } from '../../helpers/functions/general';

const NewLandingPage = () => {
  const appStatus = useSelector(selectAppStatus);
  const mobileView = appStatus.mobileView;

  const Section1 = () => (
    <div className='flex flexWrapReverse width100 justifyEvenly marVerMed'
      style={{flex: '0.8'}}
    >
        <div className={`flex flexCol justifyCenter ${!mobileView && 'padHorHuge'} alignCenter marVerMed`}>
          <div className={`${mobileView? 'textBig' : 'textHuge'} bold`}>Wallet-to-Wallet Messaging API</div>
          <div className='textBig gray'>Connecting communities across web3.</div>
          {/* <div className='textMed bold blue'>Intercom, Peer-Peer, Group Chats</div> */}
        <div className={`${mobileView ? 'textMed' : 'textBig'} bold blue marVerMed`}>Join our exclusive partner list for $20</div>
        <div className='textMed gray'>**Only accepting 30 partnerships for initial phase</div>
        <Zoom>
          <div className='flex flexWrap justifyCenter width100'>

            <Button type='primary' onClick={()=>openInNewTab(externalLinks.stripe)} className='marVerMed margin16 borderRadius yellowThemeButton' size='large' style={{ width: '200px'}}>Pre-Order Now</Button>
            <Button type='primary'  onClick={()=>openInNewTab(externalLinks.calendlyJosh)} className='marVerMed margin16 borderRadius' size='large' style={{ width: '200px'}}>Talk to Founders</Button>
          </div>
        </Zoom>
        
        
        </div>
        <div className='flex alignCenter flex1' style={{maxWidth: '500px'}}>
          <ImageImporter source={illustration} scale minWidth={300}></ImageImporter>
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
      <div className={`flex flexCol alignCenter justifyCenter marVerMed ${mobileView && 'width100 marVerHuge'}`}>
        <BiGroup className='blue textHugeHuge'></BiGroup>
        <span>Group Chats</span>
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

  const FinalSection = () => {
    return (
      <div className='marVerSection flex alignCenter justifySpaced width100 borderRadius padHorMed' style={{height: '300px'}}>
        <div className='flex flexCol flex1 textCenter justifyCenter alignCenter blueBackground padVerLarge borderRadius'>
          <div className='width100 padHorMed'><ImageImporter scale maxHeight={48} maxWidth={300} /></div>
          
          
          <span className='white textBig marVerSmall'>Wallet-to-Wallet Messaging API</span>
          
            <Button type='default' onClick={()=>openInNewTab(externalLinks.stripe)} size='large' className='marVerMed yellowThemeButton' style={{ width: '300px' }}>Pre-Order Now.</Button>
            <Button onClick={()=>openInNewTab(externalLinks.calendlyJosh)} type='default' size='large' className='marVerMed' style={{width: '300px'}}>Talk to Founders</Button>
       
         
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