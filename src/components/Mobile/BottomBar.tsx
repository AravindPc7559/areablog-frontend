import React from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { BsSearch } from 'react-icons/bs'
import { TfiWrite } from 'react-icons/tfi'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { changeSideBarState } from '@/Redux/features/SideBarSlice'

type Props = {}

const BottomBar = (props: Props) => {
  const router = useRouter()
  const dispatch = useDispatch()

  return (
    <div className="w-[90%]  h-[50px] bg-blue-400 shadow-2xl  rounded-xl p-2 fixed bottom-3 left-[50%] -translate-x-[50%] md:hidden ">
      <div className="grid place-content-center">
        <div className="flex justify-evenly gap-20 mt-2">
          <AiOutlineHome
            onClick={() => router.push('/homepage')}
            className="text-xl font-semibold "
          />
          <BsSearch
          onClick={() =>
            dispatch(
              changeSideBarState({
                type: 'search',
                id: 0,
              }),
            )
          }
          className="text-xl font-semibold " />
          <TfiWrite
            onClick={() => router.push('/profile/createblog')}
            className="text-xl font-semibold "
          />
          <CgProfile
          onClick={() => router.push(`/profile/${localStorage.getItem('UserId')}`)}
          className="text-xl font-semibold " />
        </div>
      </div>
    </div>
  )
}

export default BottomBar
