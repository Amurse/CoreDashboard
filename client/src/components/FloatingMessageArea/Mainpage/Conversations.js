import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectConversations } from '../../../redux/features/Messages/Messages'

import ConversationCard from './ConversationCard';
const Conversations = () => {
    const conversations = useSelector(selectConversations);

    const noConversations = () => (
        <div className='blue bold textMed'>
            No Conversations
        </div>
    )

    return (
        <div className='floatConversations'>
            {conversations && conversations[0] ? conversations.map((convo, index) => convo && convo._id && <ConversationCard key={index} index={index} userConversation={convo} />)
                : noConversations()
            }
        </div>
    )
}

export default Conversations