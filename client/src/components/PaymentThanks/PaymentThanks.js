import React from 'react'
import waitlist from '@zootools/waitlist-js'
import { Button } from 'antd';
import ImageImporter from '../Helpers/ImageImporter';
import NewHeader from '../Header/NewHeader';
const PaymentThanks = () => {

  const clickPopup = (event) => {
    event.preventDefault();
    // Pass your waitlist ID
    waitlist.openPopup("cBgEp90ue80FtvmazUkg")
  } 


  return (
    <div className='width100 flex flexCol alignCenter justifyCenter blueBackground'>
      <ImageImporter scale maxHeight={48} />
      <div className='blue marVerMed bold textBig white'>We've received your payment</div>

      <div className='textHugeHuge blue bold white'>Thank You!</div>
      <div className='textBig gray textCenter white'>Please fill the contact info:</div>
      <Button type="default" size='large' style={{ width: '200px'}} className='marVerMed padHorMed yellowThemeButton' onClick={clickPopup}>Enter Info</Button>
    </div>
  )
}

export default PaymentThanks