import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
    name: 'appStatus',
    initialState: {
        screenSize: 'xl',
        mobileView: false,
        smallScreen: false, //medium or less
        activeLocation: 'messages',
        leftPanelActive: true,
        setupState: 'loading',
        mobileDrawerActive: true,
        postCreationActive: false,
        floatMessage: {
            
        }
    },
    reducers: {
        setScreenSize: (state=[], action) => {
            // console.log(action.payload)
            state.screenSize = action.payload.screenSize;
            switch (action.payload.screenSize) {
                case 'sm':
                case 'xs':
                case 'md':
                    state.mobileView = true
                    state.smallScreen = true;
                    break;
                
                case 'lg':
                    state.mobileView = false
                    state.smallScreen = true;
                    break;
                default:
                    state.mobileView = false
                    state.smallScreen = false;
            }
        },
        setActiveLocation: (state = {}, action) => {
            state.activeLocation = action.payload.activeLocation;
        },
        setAppStatus: (state, action) => {
            // state.floatingMessageAreaOpen = action.payload.floatingMessageAreaOpen
            const keys = Object.keys(action.payload)
            keys.forEach((key) => {
                state[key] = action.payload[key]
            })    
        }
    }
});

export const { setScreenSize, setAppStatus,
    setActiveLocation,
    
} = userSlice.actions;

export const selectAppStatus = state => state.app;
export const selectMobileView = state => state.app.mobileView;
export const selectActiveLocation = state => state.app.activeLocation;
export const selectLeftPanelActive = state => state.app.leftPanelActive;


export default userSlice.reducer;
