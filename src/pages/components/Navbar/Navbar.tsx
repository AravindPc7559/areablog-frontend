/* eslint-disable @next/next/no-img-element */
import { changeSideBarState } from '@/pages/Redux/features/SideBarSlice'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useDispatch } from 'react-redux'

type Props = {}

const Navbar = ({}: Props) => {
  const [toogleOption, setToogleOption] = React.useState(false)
  const dispatch = useDispatch()
  const router = useRouter()




  // Elements
  const MenuOptions = (
    <>
    <li className="font-bold cursor-pointer text-base text-black hover:text-white"
          onClick={() => router.push('/homepage')}
          >
            Home
          </li>
          <li className="font-bold cursor-pointer text-base text-black hover:text-white"
          onClick={() => router.push('/profile/createblog')}
          >
            Create Blog
          </li>
          <li className="font-bold cursor-pointer text-base text-black hover:text-white"
          onClick={() => router.push('/profile/1')}
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
  return (
    <div className="w-full h-[50px] bg-blue-500 px-5 py-2 flex justify-between fixed top-0 z-50">
      <div className="flex gap-1 cursor-pointer">
        <img
          src='/assets/Navbar/logo.png'
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
        <img
          src={`/assets/Navbar/user.gif`}
          className="w-[35px] h-[35px] cursor-pointer hover:scale-105 transition-all"
          alt="Logo"
          onClick={() => setToogleOption(!toogleOption)}
        />
        {toogleOption && (
          <div className="bg-white py-2 absolute right-0 shadow-lg mt-3 border border-gray-200">
            <ul className='grid gap-5 px-16'>
             {MenuOptions}
             <li className="md:mt-1 text-red-600 cursor-pointer font-semibold flex gap-2">
                <p>Logout</p>
                <AiOutlineLogout className="mt-1" />
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
