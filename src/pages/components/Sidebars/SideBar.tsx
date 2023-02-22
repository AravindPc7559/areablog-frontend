import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { SideBarType } from '../Types'
import TrendingPost from '../Common/PostTag/PostTag'
import Spinner from '../Spinner/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { changeSideBarState } from '@/pages/Redux/features/SideBarSlice'
import Comments from '../Common/Comments/Comments'

type Props = {}

function SideBar({}: Props) {
  let [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { sideBarState } = useSelector((state: any) => state.sidebar)

  const searchSlide = (
    <div className="mt-10">
      <h1 className="text-center text-2xl font-semibold">Search Here</h1>
      <div className="mt-3">
        <input
          type="text"
          className="w-full p-3 border border-gray-400 focus:outline-none"
          placeholder="Enter your keywords"
        />
        <div className="">
          <label htmlFor="">Blog</label>
          <input type="checkbox" className="text-2xl mt-5 ml-2" value="blog" />
          <label htmlFor="" className="ml-5">
            User
          </label>
          <input
            type="checkbox"
            className="text-2xl mt-5 ml-2"
            value="User"
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-3 flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Search
        </button>
      </div>
      <div className="mt-10">{!loading && <TrendingPost />}</div>
    </div>
  )

  const commentSection = (
    <div className="overflow-auto">
      <h1 className="text-center text-2xl font-semibold mt-10">Comments</h1>
      <div className="mt-5">
        <textarea
          className="w-full p-3 border border-gray-400 focus:outline focus:outline-none"
          placeholder="Say something nice...."
          rows={6}
        />
        <div className="grid place-content-center">
          <button className="bg-blue-500 px-6 py-2 font-semibold text-lg hover:text-white hover:bg-blue-600">
            Submit
          </button>
        </div>
      </div>
      <div className="mt-10">
        {!loading && (
          <div className="overflow-auto">
            <Comments />
            <Comments />
            <Comments />
            <Comments />
            <Comments />
            <Comments />
          </div>
        )}
      </div>
    </div>
  )

  const ProfileEditSection = (
    <div className="flex justify-center items-center">
        <div className=" md:px-3 h-auto mt-12">
            <h1 className='text-center text-2xl font-semibold'>Edit Blog</h1>
        <div className="mt-5">
        <input
          type="text"
          className="w-full p-5 border border-gray-400 bg-white focus:outline-none"
          placeholder="Enter your blog name"
        />
        <select className='w-full border-gray-300 bg-white border mt-5 p-3 focus:outline-none'>
            <option value="">Category</option>
        </select>
        <textarea
          className="w-full p-3 border border-gray-400 focus:outline bg-white focus:outline-none mt-5"
          placeholder="Write your blog....."
          rows={20}
        />
        <input
          type="file"
          className="w-full p-5"
        />
        <div className="grid place-content-center mt-6">
          <button className="bg-green-500 px-6 rounded-2xl py-2 font-semibold text-lg hover:text-white hover:bg-green-600">
            Submit
          </button>
        </div>
      </div>
        </div>
      </div>
  )

  return (
    <div className="">
      {sideBarState.type !== '' && (
        <motion.div
          initial={{ x: 500, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
          }}
          className="w-full md:w-[40%] h-screen  top-5 right-0 shadow-2xl  bg-white fixed z-10  p-10 overflow-auto"
        >
          <div className="flex justify-end">
            <AiOutlineCloseCircle
              className="text-4xl cursor-pointer mt-6"
              onClick={() =>
                dispatch(
                  changeSideBarState({
                    type: '',
                    id: 0,
                  }),
                )
              }
            />
          </div>

          {sideBarState.type === 'search' && <>{searchSlide}</>}

          {sideBarState.type === 'comment' && <>{commentSection}</>}

          {sideBarState.type === 'profile-edit' && <>{ProfileEditSection}</>}

          <Spinner loading={loading} />
        </motion.div>
      )}
    </div>
  )
}

export default SideBar
