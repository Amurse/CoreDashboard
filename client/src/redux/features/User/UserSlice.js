import { createSlice } from '@reduxjs/toolkit';



const _initialState = {
    loaded: false, //by default, user is not loaded
    workspaces: [],
    conversations: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState: _initialState,
    reducers: {
        setUserData: (state = [], action) => {
            const keys = Object.keys(action.payload)
            keys.forEach((key) => {
                state[key] = action.payload[key]
            })    
        },
      logoutUser: (state) => {
          const keys = ['address', 'userId', 'username', '_id']
          keys.forEach((key) => state[key] ='')
        },
        addUserWorkspace: (state = {}, action) => {
            const { workspace } = action.payload;
            if (state.workspaces)state.workspaces.push(workspace)
        },
        changeWorkspaceName: (state = {}, action) => {
            const { spaceId, name } = action.payload;
            const index = state.workspaces.findIndex(space => space._id === spaceId);
            state.workspaces[index].name = name;
        }
    }
});

export const { setUserData, logoutUser,
    addUserWorkspace, changeWorkspaceName
} = userSlice.actions;

export const selectUser = state => state.user;
export const selectUserExists = state => state.user && state.user.username;
export const selectUserLoaded = state => state.user.loaded;

export default userSlice.reducer;
