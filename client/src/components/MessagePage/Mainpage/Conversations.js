import React from 'react';
import {useSelector} from 'react-redux';
import {selectConversations} from '../../../redux/features/Messages/Messages';

import ConversationCard from './ConversationCard';
const Conversations = () => {
  const conversations = useSelector(selectConversations);

  const noConversations = () => (
    <div className='blue bold textMed'>
            No Conversations
    </div>
  );

  return (
    <div className='floatConversations'>
      {conversations && conversations[0] ? conversations.map((convo, index) => convo && convo._id && <ConversationCard key={index} index={index} convo={convo} />) :
                noConversations()
      }
    </div>
  );
};

export default Conversations;
