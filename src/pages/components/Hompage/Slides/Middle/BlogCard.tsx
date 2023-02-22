/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { FaRegHeart } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { changeSideBarState } from '@/pages/Redux/features/SideBarSlice'
import { useRouter } from 'next/router';

type Props = {}

const BlogCard = (props: Props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 100 }}
      transition={{
        duration: 0.3,
        type: 'keyframes',
      }}
      className="min-w-full shadow-2xl  bg-white relative rounded-2xl  mt-12"
    >
      <div className="">
        <img
          className="max-w-[100%] max-h-[100%] rounded-tr-2xl"
          src="https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.jpg"
          alt=""
        />
        <div className="flex gap-4 py-2 justify-between mt-2 px-4">
          <div className="flex gap-4">
            <button className="font-semibold flex">
              <AiFillHeart className="mt-1 text-3xl text-red-600" />
              <FaRegHeart className="mt-1 text-3xl hidden" />
            </button>
            <button
              className="mt-1"
              onClick={() => {
                dispatch(
                  changeSideBarState({
                    type: 'comment',
                    id: 1,
                  }),
                )
              }}
            >
              330 Comments..
            </button>
          </div>
          <div className="mt-1 flex gap-1">
            <img
              className="w-[30px] h-[30px] rounded-full"
              src="https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.jpg"
              alt=""
            />
            <p className="mt-1 text-sm font-medium">Aravind Pc</p>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-8 pb-6 mt-5">
        <h1 className="text-center font-semibold">Post Name</h1>
        <p className="text-center text-sm text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          quae officia quam recusandae itaque optio accusantium rerum laboriosam
          amet aliquam ratione quidem obcaecati dolore, cumque iure laborum odio
          sunt veniam inventore cum. Architecto laboriosam voluptatem nostrum
          eligendi quos cum alias?....
        </p>
      </div>
      <div className="grid place-content-end">
        <button
        onClick={() => router.push('/blog/1')}
        className="bg-gradient-to-b from-[#00C6FB] to-[#005BEA] p-2 font-semibold hover:text-white hover:bg-blue-600">
          Read More..
        </button>
      </div>
    </motion.div>
  )
}

export default BlogCard
