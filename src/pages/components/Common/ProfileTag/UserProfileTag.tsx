/* eslint-disable @next/next/no-img-element */
import React from 'react'

type Props = {}

const UserProfileTag = (props: Props) => {
  return (
    <div className="flex py-3 cursor-pointer min-w-full">
      <div className=" flex justify-center items-center">
        <img
          className="rounded-full w-[40px] h-[40px]"
          src="https://img.freepik.com/free-photo/white-cloud-blue-sky_74190-7709.jpg"
          alt=""
        />
      </div>
      <div className="ml-2">
        <div className='flex justify-between'>
        <h1>Aravind Pc </h1>
        <button className='text-sm text-blue-600'>Follow +</button>
        </div>
        <p className='text-xs text-green-700'><span className='text-gray-500'>Category</span> Entertainment</p>
    <p className="text-xs text-gray-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit, ....
        </p>
        
      </div>
    </div>
  )
}

export default UserProfileTag
