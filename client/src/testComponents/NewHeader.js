import { Button } from 'antd';
import React from 'react';
import { BiMenu, BiPackage } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { selectAppStatus } from '../redux/features/App/AppStatus';
import ImageImporter from './ImageImporter';

const NewHeader = () => {
  const appStatus = useSelector(selectAppStatus);
  const mobileView = appStatus.mobileView;

  return (
    <div
      className='
      width100 whiteBackground 
      flex heightHeader alignCenter 
      justifyCenter padHorMed
      fixed fixedTop fixedLeft
      higherIndex
      '
      
    >
      <div className='width100 maxWidth flex alignCenter'>
        <div className='flex newHeaderLeft margin4'>
          {/* {mobileView && <BiMenu className='textLarge justifyItemMargin hover' style={{ fontSize:'xx-large'}} />} */}
          <ImageImporter mobileView={mobileView} enableHover></ImageImporter>
        </div>
        <div className='flex flex1 justify-end whiteBackground'>
          <div className='flex justifyEvenly alignCenter width100' style={{maxWidth: '300px'}}>
            {<div className='flex alignCenter bold textMed hover'>Docs</div>}
            {<div className='flex alignCenter bold textMed hover'>Demo</div>}
            <Button type='primary' className='bold borderRadius'>Pre-Order</Button>
          </div>  
        </div>
      </div>
      
    </div>
  )
}

export default NewHeader