import React, { useEffect, useState } from 'react'
import './MainPage.css'

import { Input } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { appError, appMessage, contactButtonClicked } from '../../../helpers/helpers';
import web3 from 'web3';
import { useDispatch, useSelector } from 'react-redux';
import { selectMessages, setFloatMessage } from '../../../redux/features/Messages/Messages';
import { selectUser } from '../../../redux/features/User/UserSlice';
import axios from '../../../axios';
import Conversations from './Conversations';

const MainPage = () => {
    const [address, setAddress] = useState('');
    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    // const floatMessage = useSelector(selectMessages)
    
    const sendMessage = async () => {
        contactButtonClicked({ senderAddress: user.address, receiverAddress: address }, dispatch);
    }

    return (
        <div className='floatMessage'>
            
            <div className='addressInput'>
                <Input
                    value={address}
                    block="true"
                    onChange={(e)=>setAddress(e.target.value)}
                    onPressEnter={sendMessage}
                    suffix={<SendOutlined className='hover' onClick={sendMessage} style={{color: address && 'var(--blue)'}}/>}
                    placeholder="Enter wallet address..."
                 />
                    
                  
            </div>
            <div className='recentConvos' style={{maxHeight: '500px'}}>
                <Conversations/>
            </div>
        </div>
  )
}

export default MainPage