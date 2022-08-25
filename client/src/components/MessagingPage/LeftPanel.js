import React, { useEffect, useState } from 'react'

import { Input } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import {  contactButtonClicked } from '../../helpers/helpers';
import web3 from 'web3';
import { useDispatch, useSelector } from 'react-redux';
import { selectMessages, setFloatMessage } from '../../redux/features/Messages/Messages';
import { selectUser } from '../../redux/features/User/UserSlice';

import Conversations from '../FloatingMessageArea/Mainpage/Conversations';

const LeftPanel = () => {
    const [address, setAddress] = useState('');
    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    // const floatMessage = useSelector(selectMessages)
    
    const sendMessage = async () => {
        contactButtonClicked({ senderAddress: user.address, receiverAddress: address }, dispatch, user);
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
            <div className='recentConvos' style={{height: '80vh'}}>
                <Conversations/>
            </div>
        </div>
  )
}

export default LeftPanel