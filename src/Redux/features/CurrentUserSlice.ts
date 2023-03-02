import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    User: {},
    stateUpdate: false,
}


const currentUserSlice = createSlice({
    name:'currentUser',
    initialState,
    reducers: {
        getCurrentUser: (state, action) => {
            state.User = action.payload.user
        },
        refreshState:(state) => {
            state.stateUpdate = !state.stateUpdate
        }
    }
})


export default currentUserSlice.reducer

export const {getCurrentUser, refreshState} = currentUserSlice.actions