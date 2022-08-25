import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../../redux/features/User/UserSlice'
import axios from '../../axios'

import './MessagingPage.css';
import ConvoList from './ConvoList'
import MainPage from '../FloatingMessageArea/Mainpage/MainPage'
import { setAppStatus } from '../../redux/features/App/AppStatus';
import { selectMessages, setFloatMessage } from '../../redux/features/Messages/Messages';
import MessagePage from '../FloatingMessageArea/MessagePage/MessagePage';
import LeftPanel from './LeftPanel';
import MessageArea from './MessageArea';
const MessagingPage = () => {

    const user = useSelector(selectUser);
    const floatMsg = useSelector(selectMessages);
    const [convos, setConvos] = useState(null); //the convos of the user
    const [activeConvo, setActiveConvo] = useState(null);
    const changeActiveConvo = (convo) => setActiveConvo(convo);

    const mobileView = window.innerWidth < 900;
    const dispatch = useDispatch();

    
    const getConversations = () => {
        axios.post('/api/convo/getConversations', { address: user.address, signature: user.signature })
            .then(res => dispatch(setFloatMessage({ conversations: res.data })))
            .catch(err => console.log(err.data));
    }

    useEffect(() => {
        dispatch(setAppStatus({ leftPanelActive: false, mobileDrawerActive: false }));
        user && user.address && getConversations();
    }, [user.address]);

    const unselectedConversation = () => (
        <div className='unselectedConvo width100 height100 bold flex flexCol align-center justifyCenter'>
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
    )
}

export default MessagingPage
