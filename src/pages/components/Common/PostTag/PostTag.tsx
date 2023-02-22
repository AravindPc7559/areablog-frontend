/* eslint-disable @next/next/no-img-element */
import React from 'react'

type Props = {}

const TrendingPost = (props: Props) => {
  return (
    <div className="md:flex border-b border-gray-300 py-3 cursor-pointer mt-2">
      <div className="max-w-[40px] hidden lg:flex justify-center items-center">
        <img
          className="obje"
          src="https://img.freepik.com/free-photo/white-cloud-blue-sky_74190-7709.jpg"
          alt=""
        />
      </div>
      <div className="ml-2">
        <div className="flex justify-between">
          <h1>Blog Name</h1>
          <button className="text-xs">Read More..</button>
        </div>
        <p className="text-xs text-gray-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit, quis.
        </p>
      </div>
    </div>
  )
}

export default TrendingPost
