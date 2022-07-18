import {configureStore } from '@reduxjs/toolkit'
import userReducer from './features/User/UserSlice';
import appReducer from './features/App/AppStatus';
import messages from './features/Messages/Messages'

export default configureStore({
    reducer: {
        user: userReducer,
        app: appReducer,
        messages: messages
    }
})