import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sideBarState: {
    type: '',
    id: 0,
  },
}

let SlideBar = createSlice({
  name: 'SideBar',
  initialState,
  reducers: {
    changeSideBarState: (state, action) => {
      state.sideBarState.type = action.payload.type
      state.sideBarState.id = action.payload.id
    },
  },
})

export default SlideBar.reducer
export const { changeSideBarState } = SlideBar.actions
