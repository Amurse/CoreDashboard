import React from 'react'
import ImageImporter from './ImageImporter'
import NewHeader from './NewHeader';
import sun from '../images/test/sun.jpg';
import { useSelector } from 'react-redux';
import { selectAppStatus } from '../redux/features/App/AppStatus';
import { Button } from 'antd';
import { BiGroup, BiNetworkChart, BiSupport } from 'react-icons/bi';
import { Zoom } from 'react-reveal';
import { BsLinkedin, BsTwitter } from 'react-icons/bs';

const NewLandingPage = () => {
  const appStatus = useSelector(selectAppStatus);
  const mobileView = appStatus.mobileView;

  const Section1 = () => (
    <div className='flex flexWrapReverse width100 justifyCenter marVerMed'
      style={{flex: '0.8'}}
    >
        <div className='flex flexCol justifyCenter alignCenter padHorHuge marVerMed'>
          <div className='textHuge bold'>Wallet-Wallet Messaging API</div>
          <div className='textBig gray'>Connecting communities across web3</div>
          {/* <div className='textMed bold blue'>Intercom, Peer-Peer, Group Chats</div> */}
          <div className='textMed bold blue marVerMed'>**Order now at 50% discount for first 3 months**</div>
          <Button type='primary' className='bold' size='large' style={{ width: '200px' }}>Pre-Order Now</Button>
        </div>
        <div className='flex alignCenter flex1' style={{maxWidth: '500px'}}>
          <ImageImporter source={sun} scale minWidth={300}></ImageImporter>
        </div>
      </div>
  )

  const Section1Icons = () => (
    <div className='width100 flex alignCenter justifyEvenly textBig bold marVerMed flexWrap'>
      <div className='flex flexCol alignCenter justifyCenter marVerMed'>
        <BiSupport className='blue textHuge'></BiSupport>
        <span>Intercom</span>
      </div>
      <div className='flex flexCol alignCenter justifyCenter marVerMed'>
        <BiNetworkChart className='blue textHuge'></BiNetworkChart>
        <span>Peer-to-Peer</span>
      </div>
      <div className='flex flexCol alignCenter justifyCenter marVerMed'>
        <BiGroup className='blue textHuge  '></BiGroup>
        <span>Group Chats</span>
      </div>
    </div>
  );

  const TextSection = (props) => {
    const { heading, text } = props;
    return (
      <div className='flex flexCol alignCenter justifyCenter marVerMed padHorMed textCenter'>
        <div className='bold blue textHuge'>{heading}</div>
        <div className='gray textBig'>{text}</div>
      </div>
    )
  }

  

  

  return (
    <div className='width100 maxWidth'>
      <NewHeader />
      
      {/* <div className='padHorMed height100%'></div> */}
      <div className='padHorMed textCenter headerMargin flex flexCol justifyCenter'
        style={{minHeight: '100vh'}}
      >
        <Section1/>
        <Zoom><Section1Icons /></Zoom>
        
      </div>
      <TextSection
          heading="Vision"
          text="To make web3 more accessible to the community"
      />

      <div className='marVerSection flex width100'>
        <div className=''>
          <TextSection
          text="Amurse provides a Dashboard to easily manage previous convos, and start new ones cross-chain"
        ></TextSection>
        </div>
        {/* <div className='flex1'>
          <ImageImporter source={sun} scale></ImageImporter>

        </div> */}

      
      </div>

      

      <div className='width100 flex justifyCenter'>
        <ImageImporter source={sun} height={500}></ImageImporter>
      </div>

      

      <div className='marVerSection flex alignCenter justifySpaced width100 borderRadius blueBackground padHorMed' style={{height: '300px'}}>
        <div className='flex flexCol flex1 textCenter justifyCenter alignCenter'>
          <ImageImporter height={48} />
          <span className='white textBig'>Building the future.</span>
          <Button type='default' size='large' className='marVerMed' style={{width: '300px'}}>Pre-Order Now.</Button>
          <div className='flex justifyCenter textBig'>
            <BsTwitter className='justifyItemMargin hover'/>
            <BsLinkedin className='justifyItemMargin hover'/>
          </div>
        </div>
        
      </div>

      
      
    </div>
  )
}

export default NewLandingPage