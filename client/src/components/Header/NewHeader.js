import { Button } from 'antd';
import React from 'react';
import { BiMenu, BiPackage } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { externalLinks, getStripeLink, openInNewTab } from '../../helpers/functions/general';
import { selectAppStatus } from '../../redux/features/App/AppStatus';
import { selectUser } from '../../redux/features/User/UserSlice';
import ConnectWallet from '../../web3/ConnectWallet';
import ImageImporter from '../Helpers/ImageImporter';

const NewHeader = ({boxShadow}) => {
  const appStatus = useSelector(selectAppStatus);
  const mobileView = appStatus.mobileView;
  const user = useSelector(selectUser);
  const history = useHistory();

  return (
    <div
      className='
      width100 whiteBackground 
      flex heightHeader alignCenter 
      justifyCenter padHorMed
      fixed fixedTop fixedLeft
      higherIndex
      '
      style={{ boxShadow: boxShadow && '0px 0px 10px 2px gray'}}
    >
      <div className='width100 flex alignCenter'>
        <div className='flex newHeaderLeft margin4'>
          {/* {mobileView && <BiMenu className='textLarge justifyItemMargin hover' style={{ fontSize:'xx-large'}} />} */}
          <ImageImporter redirectLink={'/'} mobileView={mobileView} enableHover></ImageImporter>
        </div>
        <div className='flex flex1 justify-end whiteBackground'>
          <div className='flex justifySpaced alignCenter width100' style={{ maxWidth: mobileView ? '100px' : '400px' }}>
            {!mobileView && user.address && user.admin && <div className='flex alignCenter bold textMed hover padHorMed' onClick={()=>history.push('/adminPanel')}>Admin</div>}
            {!mobileView && user.address && <div className='flex alignCenter bold textMed hover padHorMed' onClick={()=>history.push('/business')}>API</div>}
            {!mobileView && <div className='flex alignCenter bold textMed hover padHorMed'><ConnectWallet text={'Dashboard'}></ConnectWallet></div>}
            <Button onClick={()=>openInNewTab(externalLinks.docs)} type='primary' className='borderRadius'>Integrate</Button>
          </div>  
        </div>
      </div>
      
    </div>
  )
}

export default NewHeader