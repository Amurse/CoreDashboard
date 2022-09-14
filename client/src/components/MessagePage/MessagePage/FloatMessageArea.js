import React, {useEffect, useRef, useState} from 'react';
import { useSelector} from 'react-redux';
import {selectMessages} from '../../../redux/features/Messages/Messages';
import {selectUser} from '../../../redux/features/User/UserSlice';
import './FloatMessageArea.css'
import {Avatar} from 'antd';
import {ENDPOINT_MEDIA_DOWNLOAD} from '../../../helpers/routes';
import { UserOutlined } from '@ant-design/icons';
import { formattedWalletAddress } from '../../../helpers/functions/general';

const FloatMessageArea = () => {
  const floatArea = useSelector(selectMessages);
  const messages = floatArea.messages;
  const user = useSelector(selectUser);

  const [targetInfo, setTargetInfo] = useState('');

  useEffect(() => {
    floatArea.convo.recepientAddresses && setTargetInfo(floatArea.convo.recepientAddresses[0])
  }, [floatArea.convo])



  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

    const getFormattedMessage = (message, index) => {
        let messageAvatar;
        let displayName;
        if (message.address === (user.address)) {
            messageAvatar = user.profilePicture;
            displayName = formattedWalletAddress(user.address);
        }
        else {
            messageAvatar = targetInfo.user?.profilePicture;
            displayName = formattedWalletAddress(targetInfo);
        }
      let date = new Date(message.created_at).toLocaleTimeString('en-us', {hour: "2-digit", minute: '2-digit'});
        
      let previousMessageDate;
      let previousMessageSubject;
      if (index > 0) {
        previousMessageDate = new Date(messages[index - 1].created_at)
          .toDateString();
        previousMessageSubject = messages[index - 1].subject;
      }
      const thisMessageDate = message.created_at && new Date(message.created_at).toDateString();
      const thisMessageSubject = message.subject;

        return (
            <div className="messageContainer"  key={index}>
                {previousMessageDate !== thisMessageDate && <div className="dateDisplay unselectable">{thisMessageDate }</div>}
                {thisMessageSubject !== previousMessageSubject && <div className='amurse_blue amurse_width100 amurse_flex amurse_justifyCenter amurse_bold amurse_textCenter'>{thisMessageSubject}</div>}

                <div className="message">
                    <div className="messageAvatar">
                        <Avatar src={messageAvatar && ENDPOINT_MEDIA_DOWNLOAD+"t_"+messageAvatar} icon={<UserOutlined/>}/>
                    </div>
                    <div className="messageContent">
                        <div className="messageDivHeader">
                            <span className="messageDivHeaderName">{displayName}</span>
                            <span className="messageDivHeaderTime">{date}</span>
                        </div>
                        <div className="messageDivContent">
                            {/* {parse(message.text)} */}
                            {message.text}
                        </div>
                    </div>

                    
                </div>
            </div>
            
        )
    }
    

  return (
    <div className='floatMessageArea flex1 flex flexCol'>
      <div className='floatMessageAreaHeader'></div>
      <div className='flex1 flex flexCol justify-end'>
        {
          messages.map((message, index) => getFormattedMessage(message, index))
        }
        <AlwaysScrollToBottom/>
      </div>
    </div>
  );
};

export default FloatMessageArea;
