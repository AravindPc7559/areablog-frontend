import { showDeleteModal } from '@/pages/Redux/features/ModalSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {}

const CommanModal = (props: Props) => {
  const { deleteModal } = useSelector((state: any) => state.modal)
  const dispatch = useDispatch()

  return (
    <>
      {deleteModal.type !== '' && (
        <div className="max-w-[700px] max-h-[400px] bg-gray-100 fixed top-[50%] left-[50%] z-50 p-10 rounded-2xl -translate-x-[50%] -translate-y-[50%]">
          <h1 className="text-xl font-medium">{deleteModal.modalname}</h1>
          <p className="text-sm">{deleteModal.modalDescription}</p>
          <div className="flex gap-5 justify-end mt-2">
            <button
              onClick={() => {
                dispatch(
                  showDeleteModal({
                    type: '',
                    id: '',
                    modalname: '',
                    modalDescription: '',
                  }),
                )
              }}
              className="px-8 py-2 rounded-lg font-semibold text-md hover:bg-gray-200 border border-gray-300 bg-gray-100"
            >
              No
            </button>
            <button className="px-8 py-2 rounded-lg font-semibold text-md hover:bg-red-700 hover:text-white bg-red-600">
              Yes
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default CommanModal
