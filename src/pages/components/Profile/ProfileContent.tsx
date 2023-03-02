/* eslint-disable @next/next/no-img-element */
import { changeSideBarState } from '@/pages/Redux/features/SideBarSlice'
import React, { useEffect } from 'react'
import { AiFillDelete, AiFillEdit, AiFillHeart } from 'react-icons/ai'
import { FaRegHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { showDeleteModal } from '@/pages/Redux/features/ModalSlice'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USER, GET_ALL_BLOGS } from '../../Graphql/Query'
import { LIKE_BLOG, UNLIKE_BLOG } from '../../Graphql/Mutation'

type Props = {
  blogContent: String
  blogName: String
  category: String
  image?: {
    public_id: String
    url: String
  }
  userId: String
  _id: String
  Liked: String[]
}

const ProfileContent = ({
  blogContent,
  blogName,
  category,
  image,
  userId,
  _id,
  Liked,
}: Props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { data, loading, error } = useQuery(GET_USER)
  const [LikeBlog, { loading: LikeLoading, error: LikeError }] = useMutation(
    LIKE_BLOG,
  )
  const [
    UnLikeBlog,
    { loading: UnlikeLoading, error: UnlikeError },
  ] = useMutation(UNLIKE_BLOG)

  const user =
    !loading && data.getAllUsers.find((data: any) => data._id === userId)

  const handleLike = () => {
    LikeBlog({
      variables: {
        userId: localStorage.getItem('UserId'),
        blogId: _id,
      },
      refetchQueries: [{ query: GET_ALL_BLOGS }],
    }).then((res) => {})
  }

  const handleUnlike = () => {
    UnLikeBlog({
      variables: {
        userId: localStorage.getItem('UserId'),
        blogId: _id,
      },
      refetchQueries: [{ query: GET_ALL_BLOGS }, { query: GET_USER }],
    }).then((res) => {
      console.log(res)
    })
  }

  console.log(user)

  return (
    <div className=" mt-16  h-auto w-full relative overflow-hidden  rounded-2xl">
      <div className="min-w-[40%] bg-white">
        <div className="min-w-full h-[300px]">
          <img
            className="w-[100%] h-[100%] object-cover  rounded-tr-2xl"
            src={image.url !== null ? image.url : '/assets/noimage/NoImage.jpg'}
            alt="Card-Image"
          />
        </div>
        <div className="flex gap-4 py-2 justify-between mt-2 px-4 ">
          <div className="flex gap-4">
            <button className="font-semibold flex">
              <p className="mt-2 font-semibold">{Liked.length}</p>
              {Liked.includes(localStorage.getItem('UserId')) ? (
                <AiFillHeart
                  className="mt-1 text-3xl text-red-600 ml-3"
                  onClick={handleUnlike}
                />
              ) : (
                <FaRegHeart
                  className="mt-1 text-3xl ml-3"
                  onClick={handleLike}
                />
              )}
            </button>
            <button
              className="mt-1 font-semibold"
              onClick={() => {
                dispatch(
                  changeSideBarState({
                    type: 'comment',
                    id: _id,
                  }),
                )
              }}
            >
              Comments..
            </button>
          </div>
          {userId !== localStorage.getItem('UserId') && (
            <div
              className="mt-1 flex gap-1 cursor-pointer"
              onClick={() => router.push(`/profile/${userId}`)}
            >
              <img
                className="w-[30px] h-[30px] rounded-full"
                src={
                  user.image ? user.image.url : '/assets/noimage/NoImage.jpg'
                }
                alt=""
              />
              <p className="mt-1 text-sm font-medium">{user.fullName}</p>
            </div>
          )}
        </div>
        <div className="px-4 md:px-8 pb-10 mt-5 ">
          <h1 className="text-center font-semibold">
            {blogName.split('').slice(0, 25).join(' ')} ........
          </h1>
          <p className="text-xs text-center text-gray-400">{category}</p>
          <p className="text-center text-sm text-gray-500">
            {blogContent.split('').slice(0, 100).join(' ')}....
          </p>
        </div>
        {userId === localStorage.getItem('UserId') && (
          <div className="flex gap-2">
            <button
              onClick={() => {
                dispatch(
                  showDeleteModal({
                    type: 'profile-delete',
                    id: _id,
                    modalname: 'Delete Blog',
                    modalDescription:
                      'Are you sure you want to Delete your account? All of your data will be permanently removed. This action cannot be undone.',
                  }),
                )
              }}
              className="bg-red-400 p-2 font-semibold hover:text-white hover:bg-red-500"
            >
              <AiFillDelete />
            </button>
            <button
              onClick={() => {
                dispatch(
                  changeSideBarState({
                    type: 'profile-edit',
                    id: _id,
                  }),
                )
              }}
              className="bg-blue-500 p-2 font-semibold hover:text-white hover:bg-blue-600"
            >
              <AiFillEdit />
            </button>
          </div>
        )}
      </div>
      <div className="absolute right-0 bottom-0">
        <button
          onClick={() => router.push(`/blog/${_id}`)}
          className="bg-gradient-to-b from-[#00C6FB] to-[#005BEA] p-2 font-semibold hover:text-white hover:bg-blue-600"
        >
          Read More..
        </button>
      </div>
    </div>
  )
}

export default ProfileContent
