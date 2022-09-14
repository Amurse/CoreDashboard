import React, {useState} from 'react';

import {Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '../../redux/features/User/UserSlice';
import Conversations from './Mainpage/Conversations';
import { setFloatMessage } from '../../redux/features/Messages/Messages';
import { appError } from '../../helpers/functions/general';
import { chatSDK } from '../../helpers/functions/chat';


const LeftPanel = () => {
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  // const floatMessage = useSelector(selectMessages)

  const sendMessage = async () => {
    let convo = await chatSDK.getConversation({ address: user.address, receiverAddress: address, signature: user.signature }, (err)=>{console.log(err)});
    if (convo) dispatch(setFloatMessage({ address: address, convo: {...convo}, page: 'messagepage', open: true }))
    else appError('Something went wrong')
    setAddress('');
  };

  return (
    <div className='floatMessage'>

      <div className='addressInput'>
        <Input
          value={address}
          block="true"
          onChange={(e)=>setAddress(e.target.value)}
          onPressEnter={sendMessage}
          suffix={<SearchOutlined className='hover' onClick={sendMessage} style={{color: address && 'var(--blue)'}}/>}
          placeholder="Enter wallet address..."
        />


      </div>
      <div className='recentConvos' style={{height: '80vh'}}>
        <Conversations/>
      </div>
    </div>
  );
};

export default LeftPanel;
