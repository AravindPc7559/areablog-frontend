import { configureStore } from '@reduxjs/toolkit'
import SideBarSlice from '../features/SideBarSlice'
import ModalSlice from '../features/ModalSlice'

const store = configureStore({
  reducer: {
    sidebar: SideBarSlice,
    modal: ModalSlice
  },
})

export default store
