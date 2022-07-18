import { createSlice } from '@reduxjs/toolkit';

const _initialState = {
    open: false,
    page: 'mainpage',
    address: '',
    messages: [],
    conversations: [],
    userConversation: {
        conversation: {}
    },
}

export const messageSlice = createSlice({
    name: 'messages',
    initialState: _initialState,
    reducers: {
        
        setFloatMessage: (state = {}, action) => {
            const keys = Object.keys(action.payload)
            keys.forEach((key) => {
                state[key] = action.payload[key]
            })  
        },
        addFloatMessage: (state = {}, action) => {
            const { message } = action.payload;
            state.messages.push(message);
        },
        shiftFloatConversation: (state = {}, action) => {
            let { conversation } = action.payload;
            let convos = [...state.conversations];
            let convoIndex = convos.findIndex(_convo => _convo._id === conversation._id);
            if (state.conversations[convoIndex]) {
                // conversation.addresses = state.conversations[convoIndex].addresses;
                // conversation.target = state.conversations[convoIndex].target;
                let updatedConvo = {...state.conversations[convoIndex], ...conversation};
                state.conversations.splice(convoIndex, 1);
                state.conversations.unshift(updatedConvo);
            } else {
                state.conversations.unshift(conversation);
            }
        },
        addNewConversation: (state = {}, action) => {
            const { userConversation } = action.payload;
            state.conversations.unshift(userConversation)
        },
    }
});

export const { setUserData, logoutUser,
    setFloatMessage, addFloatMessage, addNewConversation,
     shiftFloatConversation, updateFloatConversation

} = messageSlice.actions;

export const selectMessages = state => state.messages;
export const selectConversations = state => state.messages.conversations;

export default messageSlice.reducer;