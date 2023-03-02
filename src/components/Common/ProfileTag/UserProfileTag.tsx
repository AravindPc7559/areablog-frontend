/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useMutation } from '@apollo/client'
import { ADD_FOLLOWER, REMOVE_FOLLOWER } from '@/Graphql/Mutation'
import { GET_ALL_BLOGS, GET_USER } from '@/Graphql/Query'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { changeSideBarState } from '@/Redux/features/SideBarSlice'

type Props = {
  image: string
  category: string
  description: string
  userId: string
  name: string
  followingData: any
}

const UserProfileTag = ({
  image,
  category,
  description,
  userId,
  name,
  followingData,
}: Props) => {
  const router = useRouter()
  const dispatch = useDispatch()

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
    <div className="flex py-3 cursor-pointer min-w-full">
      <div
        className=" flex justify-center items-center"
        onClick={() => {
          router.replace(`profile/${userId}`)
          dispatch(
            changeSideBarState({
              type: '',
              id: 0,
            }),
          )
        }}
      >
        <img
          className="rounded-full w-[40px] h-[40px]"
          src={
            image
              ? image
              : '/assets/noimage/noProPic.png'
          }
          alt=""
        />
      </div>
      <div className="ml-2">
        <div className="flex justify-between">
          <h1 onClick={() => router.replace(`profile/${userId}`)}>{name}</h1>
          {loading ? (
            'Loading...'
          ) : (
            <button
              className="text-sm text-blue-600"
              onClick={
                followingData.includes(localStorage.getItem('UserId'))
                  ? UnhandledFollow
                  : handleFollow
              }
            >
              {' '}
              {loading || UnFollowLoading
                ? 'Loading...'
                : followingData.includes(localStorage.getItem('UserId'))
                ? 'UnFollow'
                : 'Follow'}
            </button>
          )}
        </div>
        <p className="text-xs text-green-700">
          <span className="text-gray-500">Category:</span> {category}
        </p>
        <p className="text-xs text-gray-500">
          {description.split(' ').slice(0, 10).join(' ')}....
        </p>
      </div>
    </div>
  )
}

export default UserProfileTag
