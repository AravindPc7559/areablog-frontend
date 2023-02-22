import React from 'react'
import TrendingPost from '../../../Common/PostTag/PostTag'

type Props = {}

const SlideOne = (props: Props) => {
  return (
    <div className="flex justify-center ">
      <div className="mt-12  shadow-lg min-h-[100px] px-10 border-y border-gray-100 p-3 bg-gray-100 rounded-2xl ">
        <h1 className="text-center font-semibold -trac">Trending Blogs</h1>
        <div>
          <TrendingPost />
          <TrendingPost />
          <TrendingPost />
          <TrendingPost />
          <TrendingPost />
        </div>
      </div>
    </div>
  )
}

export default SlideOne
