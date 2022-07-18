import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  selectUser } from '../../redux/features/User/UserSlice';
import Pusher from 'pusher-js';
import { shiftFloatConversation, addNewConversation } from '../../redux/features/Messages/Messages';

export const pusher = new Pusher("97f25cbcbd8b4a017e8c", {
    cluster: 'us2',
});
  

const PusherLoader = () => {
    //  DATA NEEDED
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    

    //Conversations and Messages live time
    const [updatedConversation, setUpdatedConversation] = useState({});
    const [newConversation, setNewConversation] = useState({});

    useEffect(() => {
      if (newConversation._id) dispatch(addNewConversation({ userConversation: newConversation }))
      // eslint-disable-next-line
    }, [newConversation])

    useEffect(() => {
      if (updatedConversation._id) dispatch(shiftFloatConversation({ conversation: updatedConversation }))
      // eslint-disable-next-line
    }, [updatedConversation])


    useEffect(() => {
        if (user.address) {
            let channel = pusher.subscribe(user.address);
            channel.bind('new-conversation', (response) => setNewConversation(response.data));
            channel.bind('update-conversation', (response) => setUpdatedConversation(response.data));      
        }

        return () => {
                pusher.unsubscribe(user.address);
        };
    }, [user.address])


    //DISCONNECT********************************************
    useEffect(() => {

        return () => {
            pusher.unbind_all();
            pusher.disconnect()
        };
    }, [])
    
  return <span></span>;
};

export default PusherLoader;
