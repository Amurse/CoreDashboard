import {UserOutlined} from '@ant-design/icons';
import {Avatar} from 'antd';
import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import { formattedWalletAddress } from '../../../helpers/functions/general';
import {setFloatMessage} from '../../../redux/features/Messages/Messages';
import {ENDPOINT_MEDIA_DOWNLOAD} from '../../../helpers/routes';

const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const ConversationCard = ({convo, index}) => {
  const dispatch = useDispatch();
  const [convoTarget, setConvoTarget] = useState('');

  useEffect(() => {
    convo.recepientAddresses && setConvoTarget(convo.recepientAddresses[0])
  }, [convo])
  const date = new Date(convo.recentUpdateTime);
  const displayName = formattedWalletAddress(convoTarget);

    return (
        <div className="floatConvocardItem unselectable" onClick={e=>dispatch(setFloatMessage({ address: convoTarget.address, page: 'messagepage', convo: {...convo, index} }))}>
            <div className="flex width100 hover">
                <div className="convoCardAvatar">
                    <Avatar style={{ backgroundColor: 'white' }} size={32} icon={<UserOutlined style={{ color: 'black'}}/>} src={convoTarget && convoTarget.profilePicture && ENDPOINT_MEDIA_DOWNLOAD+"t_"+convoTarget.profilePicture}/>
                </div>
                <div className="floatConvocardContent hover width100">
                    <div className="flex justify-spaced align-center">
                        <span className='textMed text500'>{displayName}</span>
                        <span className="textMed gray">{month[date.getMonth()]} {date.getDate() }</span>
                    </div>
                    <div className="floatConvocardAddress gray">{convoTarget.address}</div> 
                    <div className="textSmall text500 gray">{convo.recentMessage}</div>   
                </div>
            </div>
        </div>
        
  );
};

export default ConversationCard;
