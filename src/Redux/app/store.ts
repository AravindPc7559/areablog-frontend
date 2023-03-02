import { configureStore } from '@reduxjs/toolkit'
import SideBarSlice from '../features/SideBarSlice'
import ModalSlice from '../features/ModalSlice'
import CurrentUserSlice from '../features/CurrentUserSlice'

const store = configureStore({
  reducer: {
    sidebar: SideBarSlice,
    modal: ModalSlice,
    currentUser: CurrentUserSlice
  },
})

export default store
