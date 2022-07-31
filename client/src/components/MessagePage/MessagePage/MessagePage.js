import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addFloatMessage, selectMessages, setFloatMessage} from '../../../redux/features/Messages/Messages';
import './MessagePage.css';
import {BiArrowBack} from 'react-icons/bi';
import {Input, Popover} from 'antd';
import {SendOutlined, SmileOutlined} from '@ant-design/icons';
import {selectUser} from '../../../redux/features/User/UserSlice';
import axios from '../../../helpers/axios/axiosChat';
import {pusher} from '../../../pusher/features/PusherChat';
import FloatMessageArea from './FloatMessageArea';
import {appMessage} from '../../../helpers/functions/general';
import Picker from 'emoji-picker-react';

const MessagePage = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const user = useSelector(selectUser);
  const floatMessage = useSelector(selectMessages);

  const getMessages = async () => {
    const messages = (await axios.post('/getMessages', {convoId: floatMessage.convo._id})).data;
    dispatch(setFloatMessage({messages: messages}));
  };

  // EXISTING MESSAGES
  useEffect(() => {
    getMessages();

    return () => dispatch(setFloatMessage({ messages: [], conversation: {} }));
    // eslint-disable-next-line
  }, [floatMessage.convo._id]);

  // PUSHER - NEW MESSAGES
  const [newMessage, setNewMessage] = useState({});
  useEffect(() => {
    newMessage.message && newMessage.message._id && dispatch(addFloatMessage(newMessage));
    // eslint-disable-next-line
  }, [newMessage]);

  useEffect(() => {
    if (floatMessage.convo._id) {
      const channel = pusher.subscribe(floatMessage.convo._id);
      channel.bind('new-message', (response) => setNewMessage(response.data));
    }
    return () => {
      floatMessage.convo._id && pusher.unsubscribe(floatMessage.convo._id);
    };
  }, [floatMessage.convo]);
  // ______________________________________________________________________


  const returnToMain = () => dispatch(setFloatMessage({page: 'mainpage'}));


  const header = () => {
    return (
      <div className='flex'>
        <div onClick={returnToMain} className='flex align-center hover blue bold unselectable'><BiArrowBack className='margin4right'/> Return</div>
      </div>
    );
  };

  const submitMessage = async () => {
    if (!message) return appMessage('No Content');
    await axios.post('/createMessage', {
      address: user.address, text: message,
      convoId: floatMessage.convo._id,
      convoIndex: floatMessage.convo.index,
    });
    setMessage('');
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessage(message+emojiObject.emoji);
  };


  const inputSuffix = () => (
    <div className='flex alignCenter' style={{color: 'var(--blue)', fontSize: 'medium'}}> 
      <Popover 
        placement='topRight'
        content={<Picker native onEmojiClick={onEmojiClick} preload disableSearchBar/>}
        trigger='click'
      >
        <SmileOutlined className='hover margin4' style={{marginRight: '12px'}} />
      </Popover>
      
      <SendOutlined className='hover margin4' onClick={submitMessage} />
    </div>
  )

  const createMessage = () => {
    return (
      <div className='floatCreateMessage'>
        <Input
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          onPressEnter={submitMessage}
          block="true"
          suffix={inputSuffix()}
          placeholder={`Send new message`}
        />
      </div>
    );
  };

  return (
    <div className='floatMessagePage flex flexCol'>
      {header()}
      <FloatMessageArea/>
      {createMessage()}
    </div>

  );
};

export default MessagePage;
