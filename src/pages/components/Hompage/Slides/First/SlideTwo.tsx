import React from 'react'
import UserProfileTag from '@/pages/components/Common/ProfileTag/UserProfileTag'

type Props = {}

const SlideTwo = (props: Props) => {
  return (
    <div className="lg:flex justify-center hidden ">
      <div className="mt-10  shadow-lg min-h-[100px] px-10 border-y bg-gray-100 rounded-2xl border-gray-300 p-3 ">
        <h1 className="text-center font-semibold -tracking-tighter">Suggested Profile</h1>
        <div>
          <UserProfileTag />
          <UserProfileTag />
          <UserProfileTag />
          <UserProfileTag />
        </div>
      </div>
    </div>
  )
}

export default SlideTwo
