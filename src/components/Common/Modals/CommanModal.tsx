import { showDeleteModal } from '@/Redux/features/ModalSlice'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { DELETE_BLOG } from '../../../Graphql/Mutation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { GET_ALL_BLOGS } from '../../../Graphql/Query'

type Props = {}

const CommanModal = (props: Props) => {
  const { deleteModal } = useSelector((state: any) => state.modal)
  const [
    DeleteBlog,
    { loading: deletBlogLoading, error: deletBlogError },
  ] = useMutation(DELETE_BLOG)
  const router = useRouter()

  const HandleDelete = () => {
    if (deleteModal.type === 'profile-delete') {
      DeleteBlog({
        variables: {
          id: deleteModal.id,
        },
        refetchQueries: [{ query: GET_ALL_BLOGS }],
      }).then((res) => {
        dispatch(
          showDeleteModal({
            type: '',
            id: '',
            modalname: '',
            modalDescription: '',
          }),
        )
        if (res.data.DeleteBlog.status === 'success') {
          toast.success(res.data.DeleteBlog.message, {
            position: 'top-right',
          })
        }
        if (res.data.DeleteBlog.status === 'error') {
          toast.error(res.data.DeleteBlog.message, {
            position: 'top-right',
          })
        }
      })
    }
  }

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
            <button
              onClick={HandleDelete}
              className="px-8 py-2 rounded-lg font-semibold text-md hover:bg-red-700 hover:text-white bg-red-600"
            >
              {deletBlogLoading ? 'Deleting...' : 'Yes'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default CommanModal
