/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { changeSideBarState } from '@/Redux/features/SideBarSlice'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

type Props = {}

const Navbar = ({}: Props) => {
  const [toogleOption, setToogleOption] = React.useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  let UserId: String | null

  // Elements

  const MenuOptions = (
    <>
      <li
        className="font-bold cursor-pointer text-base text-black hover:text-white"
        onClick={() => router.push('/homepage')}
      >
        Home
      </li>
      <li
        className="font-bold cursor-pointer text-base text-black hover:text-white"
        onClick={() => router.push('/profile/createblog')}
      >
        Create Blog
      </li>
      <li
        className="font-bold cursor-pointer text-base text-black hover:text-white"
        onClick={() => router.push(`/profile/${UserId}`)}
      >
        Profile
      </li>
      <li
        className="font-bold cursor-pointer text-base text-black hover:text-white"
        onClick={() =>
          dispatch(
            changeSideBarState({
              type: 'search',
              id: 0,
            }),
          )
        }
      >
        Search
      </li>
      <li className="font-bold cursor-pointer text-base text-black hover:text-white">
        About
      </li>
    </>
  )

  // Side-Effects

  useEffect(() => {
    UserId = localStorage.getItem('UserId')
  })

  return (
    <div className="w-full h-[50px] bg-blue-500 px-5 py-2 flex justify-between fixed top-0 z-50">
      <div className="flex gap-1 cursor-pointer">
        <img
          src="/assets/Navbar/logo.png"
          className="w-[30px] h-[30px]"
          alt="Logo"
        />
        <h1 className="mt-1 font-semibold">Area Blog</h1>
      </div>
      <div className="hidden md:flex">
        <ul className="flex gap-12 justify-center items-center">
          {MenuOptions}
        </ul>
      </div>
      <div className="relative">
        <div
          className="hover:scale-105 transition-all bg-red-700 px-4 py-1 rounded-xl shadow-2xl text-red-600 cursor-pointer font-semibold flex gap-2"
          onClick={() => {
            Cookies.remove('UserInfo')
            localStorage.removeItem('UserId')
            router.push('/')
          }}
        >
          <p className="text-white">Logout</p>
          <AiOutlineLogout className="mt-1 text-white" />
        </div>
      </div>
    </div>
  )
}

export default Navbar
