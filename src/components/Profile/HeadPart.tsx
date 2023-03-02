/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HiPencilSquare } from 'react-icons/hi2'
import { changeSideBarState } from '@/Redux/features/SideBarSlice'
import { ADD_FOLLOWER, REMOVE_FOLLOWER } from '../../Graphql/Mutation'
import { useMutation } from '@apollo/client'
import { GET_USER, GET_ALL_BLOGS } from '@/Graphql/Query'
type Props = {
  userId: string | string[] | undefined
  followingData: any
}

const HeadPart = ({ userId, followingData }: Props) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { User } = useSelector((state: any) => state.currentUser)

  const [following, { loading, error }] = useMutation(ADD_FOLLOWER)
  const [
    unFollowing,
    { loading: UnFollowLoading, error: UnFollowError },
  ] = useMutation(REMOVE_FOLLOWER)

  const handleFollow = () => {
    following({
      variables: {
        userId: localStorage.getItem('UserId'),
        followerID: userId,
      },
      refetchQueries: [{ query: GET_USER }, { query: GET_ALL_BLOGS }],
    })
  }

  const UnhandledFollow = () => {
    unFollowing({
      variables: {
        userId: localStorage.getItem('UserId'),
        followerID: userId,
      },
      refetchQueries: [{ query: GET_USER }, { query: GET_ALL_BLOGS }],
    })
  }

  return (
    <div className="w-full">
      <div className="grid place-content-center relative">
        <div className="relative w-[200px] h-[200px]">
          <img
            className="w-full h-full object-cover ring-2 rounded-full p-2 ring-blue-900"
            src={
              User.image.url ? User.image.url : '/assets/noimage/noProPic.png'
            }
            alt=""
          />
          {User._id === localStorage.getItem('UserId') && (
            <div
              onClick={() =>
                dispatch(
                  changeSideBarState({
                    type: 'user-edit',
                    id: User._id,
                  }),
                )
              }
              className="w-[40px] h-[40px] cursor-pointer hover:bg-gray-300 bg-gray-200 shadow-xl flex justify-center items-center rounded-full absolute bottom-3 right-4"
            >
              <HiPencilSquare className="text-2xl ml-1" />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div>
          <div>
            <h1 className="mt-4 text-center font-semibold md:text-2xl">
              {User.fullName}
              <br />
              <span className="text-base text-gray-600">{User.category}</span>
            </h1>
          </div>
          <div className="max-w-[900px] mt-4">
            <p className="text-gray-700 text-center px-5">{User.bio}...</p>
          </div>
        </div>
      </div>
      <div className="flex justify-evenly mt-6 md:px-44">
        <button className="font-semibold text-lg hover:text-white hover:scale-105 transition-all">
          {User.followers && User.followers.length} Followers
        </button>
        <button className="font-semibold text-lg hover:text-white hover:scale-105 transition-all">
          {User.following && User.following.length} Following
        </button>
        {User._id === localStorage.getItem('UserId') ? (
          <button
            onClick={() => router.push('/profile/createblog')}
            className="font-semibold text-lg hover:text-green-700 hover:scale-105 transition-all"
          >
            Create Blog
          </button>
        ) : (
          <button
            onClick={
              followingData.includes(localStorage.getItem('UserId'))
                ? UnhandledFollow
                : handleFollow
            }
            className="font-semibold text-lg  hover:scale-105 transition-all bg-blue-800 px-5 py-1 rounded-lg text-white"
          >
            {loading || UnFollowLoading
              ? 'Loading...'
              : followingData.includes(localStorage.getItem('UserId'))
              ? 'UnFollow'
              : 'Follow'}
          </button>
        )}
      </div>
    </div>
  )
}

export default HeadPart
