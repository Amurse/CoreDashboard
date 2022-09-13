import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '../../redux/features/User/UserSlice';
import './MessagingPage.css';
import {setAppStatus} from '../../redux/features/App/AppStatus';
import {selectMessages, setFloatMessage} from '../../redux/features/Messages/Messages';
import MessagePage from './MessagePage/MessagePage';
import LeftPanel from './LeftPanel';
import { getConversations } from '@amurse/chat_sdk'

//enable dev mode for chat sdk

const MessagingPage = () => {

    const user = useSelector(selectUser);
    const floatMsg = useSelector(selectMessages);
    const dispatch = useDispatch();

    
  const fetchConversations = async () => {
    let convos = await getConversations( { address: user.address, signature: user.signature }, (err)=>{console.log(err)})
    dispatch(setFloatMessage({ conversations: convos }));
  }

    useEffect(() => {
        dispatch(setAppStatus({ leftPanelActive: false, mobileDrawerActive: false }));
      user && user.address && fetchConversations();
      // eslint-disable-next-line
    }, [user.address]);

    const unselectedConversation = () => (
        <div className='unselectedConvo width100 height100 bold flex flexCol alignCenter justifyCenter unselectable'>
            <div className='blue textBig'>Select a conversation</div>
            <div className='blue textMed'>Or start a new one...</div>
        </div>
    )


    return (
        <div className="messagingPage">
        <div className='conversationList'>
                <LeftPanel/>
        </div>
        <div className='messageArea flex1'>
                {floatMsg.page === 'messagepage' ?
                    <MessagePage /> : unselectedConversation()}

      </div>
    </div>
  );
};

export default MessagingPage;
