/* eslint-disable @next/next/no-img-element */
import { changeSideBarState } from '@/pages/Redux/features/SideBarSlice'
import React from 'react'
import { AiFillDelete, AiFillEdit, AiFillHeart } from 'react-icons/ai'
import { FaRegHeart } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router';
import { showDeleteModal } from '@/pages/Redux/features/ModalSlice'

type Props = {}

const ProfileContent = (props: Props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  return (
    <div className=" mt-16  h-auto w-full relative">
        <div className="min-w-[40%] bg-white">
          <div className="min-w-full h-[300px]">
            <img
              className="w-[100%] h-[100%] object-cover"
              src="https://cdn.dribbble.com/users/901433/screenshots/6214144/red_path.jpg?compress=1&resize=400x300&vertical=top"
              alt=""
            />
          </div>
          <div className="flex gap-4 py-2 justify-between mt-2 px-4 ">
            <div className="flex gap-4">
              <button className="font-semibold flex">
                <p className='mt-2 font-normal'>200</p>
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
          <div className="px-4 md:px-8 pb-6 mt-5 ">
        <h1 className="text-center font-semibold">Post Name</h1>
        <p className="text-center text-sm text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          quae officia quam recusandae itaque optio accusantium rerum laboriosam
          amet aliquam ratione quidem obcaecati dolore, cumque iure laborum odio
          sunt veniam inventore cum. Architecto laboriosam voluptatem nostrum
          eligendi quos cum alias?....
        </p>
      </div>
      <div className="flex gap-2">
        <button
        onClick={() => {
          dispatch(showDeleteModal({
            type: 'profile-delete',
            id: 1,
            modalname:"Delete Blog",
            modalDescription:"Are you sure you want to Delete your account? All of your data will be permanently removed. This action cannot be undone."
          }))
        }}
        className="bg-red-400 p-2 font-semibold hover:text-white hover:bg-red-500">
          <AiFillDelete />
        </button>
        <button
        onClick={() => {
          dispatch(changeSideBarState({
            type: 'profile-edit',
            id: 1,
          }))
        }}
        className="bg-blue-500 p-2 font-semibold hover:text-white hover:bg-blue-600">
          <AiFillEdit />
        </button>
      </div>
      <div className="absolute right-0 bottom-0">
        <button
        onClick={() => router.push('/blog/1')}
        className="bg-gradient-to-b from-[#00C6FB] to-[#005BEA] p-2 font-semibold hover:text-white hover:bg-blue-600">
          Read More..
        </button>
      </div>
        </div>
      </div>
  )
}

export default ProfileContent
