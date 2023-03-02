/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { GET_ALL_COMMENTS, GET_USER } from '../../../Graphql/Query'
import { useQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { AiOutlineDelete } from 'react-icons/ai'
import { DELETE_COMMENT } from '../../../Graphql/Mutation'
import { toast } from 'react-toastify'

type Props = {
  _id: String
  comment: String
  commenterID: String
  blogID: String
  createdAt: String
  updatedAt: String
}

const Comments = ({
  comment,
  commenterID,
  createdAt,
  blogID,
  updatedAt,
  _id,
}: Props) => {
  const router = useRouter()
  const { data, loading: AllUserLoading, error: AllUserError } = useQuery(
    GET_USER,
  )
  const [DeleteComment, { loading, error }] = useMutation(DELETE_COMMENT)

  const mongoDate = new Date(parseInt(createdAt))
  const istDate = new Date(mongoDate.getTime() + 5.5 * 60 * 60 * 1000)
  const options = { timeZone: 'Asia/Kolkata' }
  const dateString = istDate.toLocaleString('en-IN', options)

  const getUser = () => {
    return data.getAllUsers.find((data: any) => data._id === commenterID)
  }

  const handleDeleteComment = () => {
    DeleteComment({
      variables: {
        id: _id,
      },
      refetchQueries: [{ query: GET_ALL_COMMENTS }],
    }).then((res) => {
      console.log(res)
      if (res.data.DeleteComment.status === 'success') {
        toast.success(res.data.DeleteComment.message, {
          position: 'top-right',
        })
      }
      if (res.data.DeleteComment.status === 'error') {
        toast.error(res.data.DeleteComment.message, {
          position: 'top-right',
        })
      }
    })
  }

  return (
    <div className="mt-5">
      <div className="flex gap-3 cursor-pointer">
        <img
          onClick={() => router.push(`/profile/${commenterID}`)}
          className="rounded-full w-[40px] h-[40px]"
          src={
            !AllUserLoading && getUser()
              ? getUser().image.url
              : 'https://i.pinimg.com/originals/a6/3b/d8/a63bd8280f1534119f9ed77108a550bf.jpg'
          }
          alt=""
        />
        <div className="flex">
          <div>
            <h1
              className="-mt-1"
              onClick={() => router.push(`/profile/${commenterID}`)}
            >
              {getUser().fullName}
            </h1>
            <span className="text-xs">Poster On: {dateString}</span>
          </div>
          {commenterID === localStorage.getItem('UserId') && (
            <div>
              <AiOutlineDelete
                className="text-xl text-red-600"
                onClick={handleDeleteComment}
              />
            </div>
          )}
        </div>
      </div>
      <div className="px-12 mt-3">
        <p>{comment}</p>
      </div>
    </div>
  )
}

export default Comments
