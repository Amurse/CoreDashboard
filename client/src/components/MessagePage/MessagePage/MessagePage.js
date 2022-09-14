import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addFloatMessage, selectMessages, setFloatMessage} from '../../../redux/features/Messages/Messages';
import './MessagePage.css';
import {BiArrowBack} from 'react-icons/bi';
import {Input, Popover} from 'antd';
import {SendOutlined, SmileOutlined} from '@ant-design/icons';
import {selectUser} from '../../../redux/features/User/UserSlice';
import {pusher} from '../../../pusher/features/PusherChat';
import FloatMessageArea from './FloatMessageArea';
import {appMessage} from '../../../helpers/functions/general';
import Picker from 'emoji-picker-react';
import { chatSDK } from '../../../helpers/functions/chat';



const MessagePage = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const user = useSelector(selectUser);
  const floatMessage = useSelector(selectMessages);

  const fetchMessages = async () => {
    const messages = await chatSDK.getMessages({ convoId: floatMessage.convo._id });
    dispatch(setFloatMessage({messages: messages}));
  };

  // EXISTING MESSAGES
  useEffect(() => {
    fetchMessages();

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
    let messageCre  = await chatSDK.createMessage({
      address: user.address, text: message,
      convoId: floatMessage.convo._id,
      convoIndex: floatMessage.convo.index || 0,
    }, (err) => {console.log(err)});
    console.log('messsage creted: ', messageCre)
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

  const MessageInput = () => {
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
      {MessageInput()}
    </div>

  );
};

export default MessagePage;
