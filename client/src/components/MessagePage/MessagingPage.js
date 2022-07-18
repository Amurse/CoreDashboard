import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from '../../redux/features/User/UserSlice';
import axiosChat from '../../helpers/axiosChat';
import './MessagingPage.css';
import {setAppStatus} from '../../redux/features/App/AppStatus';
import {selectMessages, setFloatMessage} from '../../redux/features/Messages/Messages';
import MessagePage from './MessagePage/MessagePage';
import LeftPanel from './LeftPanel';
// import MessageArea from './MessageArea';
const MessagingPage = () => {

    const user = useSelector(selectUser);
    const floatMsg = useSelector(selectMessages);
    const dispatch = useDispatch();

    
    const getConversations = () => {
        axiosChat.post('/getConversations', { address: user.address, userId: user._id })
            .then(res => dispatch(setFloatMessage({ conversations: res.data })))
            .catch(err => console.log(err.data));
    }

    useEffect(() => {
        dispatch(setAppStatus({ leftPanelActive: false, mobileDrawerActive: false }));
      user && user.address && getConversations();
      // eslint-disable-next-line
    }, [user.address]);

    const unselectedConversation = () => (
        <div className='unselectedConvo width100 height100 bold flex flexCol align-center justify-center unselectable'>
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
