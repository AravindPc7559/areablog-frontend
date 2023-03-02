import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  deleteModal: {
    type: '',
    id: '',
    modalname: '',
    modalDescription: '',
  },
}

const ModalSlice = createSlice({
  name: 'ModalSlice',
  initialState,
  reducers: {
    showDeleteModal: (state, action) => {
      ;(state.deleteModal.type = action.payload.type),
        (state.deleteModal.id = action.payload.id),
        (state.deleteModal.modalname = action.payload.modalname),
        (state.deleteModal.modalDescription = action.payload.modalDescription)
    },
  },
})

export const { showDeleteModal } = ModalSlice.actions
export default ModalSlice.reducer
