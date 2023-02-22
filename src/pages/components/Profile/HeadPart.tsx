/* eslint-disable @next/next/no-img-element */
import React from 'react'

type Props = {}

const HeadPart = (props: Props) => {
  return (
    <div className="w-full">
      <div className="grid place-content-center">
        <img
          className="w-[200px] h-[200px] ring-2 rounded-full p-2 ring-blue-900"
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt=""
        />
      </div>
      <div className="flex justify-center">
        <div>
          <div>
            <h1 className="mt-4 text-center font-semibold md:text-2xl">
              Aravind Pc
              <br />
              <span className="text-base text-gray-600">Tech</span>
            </h1>
          </div>
          <div className="max-w-[900px] mt-4">
            <p className="text-gray-700 text-center px-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              reprehenderit recusandae fugit fuga magni quis porro similique
              neque excepturi in! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Rerum reprehenderit recusandae fugit fuga magni
              quis ...
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-evenly mt-6 md:px-44">
        <button className="font-semibold text-lg hover:text-white hover:scale-105 transition-all">
          200 Followers
        </button>
        <button className="font-semibold text-lg hover:text-white hover:scale-105 transition-all">
          200 Following
        </button>
        <button className="font-semibold text-lg hover:text-green-700 hover:scale-105 transition-all">
          Create Blog
        </button>
      </div>
    </div>
  )
}

export default HeadPart
