/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { changeSideBarState } from '@/pages/Redux/features/SideBarSlice'

type Props = {
  image: string
  name: string
  description: string
  blogID?: string
  userID?: string
  category: string
}

const TrendingPost = ({
  image,
  name,
  description,
  blogID,
  userID,
  category,
}: Props) => {
  const router = useRouter()
  const dispatch = useDispatch()

  return (
    <div className="md:flex border-b border-gray-300 py-3 cursor-pointer mt-2">
      <div className="max-w-[40px] hidden lg:flex justify-center items-center">
        <img
          className="obje"
          src={image ? image : '/assets/noimage/noProPic.png'}
          alt=""
        />
      </div>
      <div className="ml-2">
        <div className="flex justify-between">
          <h1>{name && name.split(' ').slice(0, 4).join(' ')}.....</h1>
          <button
            className="text-xs"
            onClick={() => {
              router.push(`/blog/${blogID}`)
              dispatch(
                changeSideBarState({
                  type: '',
                  id: 0,
                }),
              )
            }}
          >
            Read More..
          </button>
        </div>
        <p className="text-xs text-gray-500">
          {description && description.split(' ').slice(0, 14).join(' ')}....
        </p>
      </div>
    </div>
  )
}

export default TrendingPost
