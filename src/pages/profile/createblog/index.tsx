import Navbar from '@/pages/components/Navbar/Navbar'
import React from 'react'

type Props = {}

const index = (props: Props) => {
  return (
    <div className="bg-gradient-to-b w-full min-h-screen from-[#00C6FB] to-[#005BEA]">
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="md:w-[50%] px-3 h-aut mt-12 md:mt-36">
            <h1 className='text-center text-2xl font-semibold'>Create Blog</h1>
        <div className="mt-5">
        <input
          type="text"
          className="w-full p-5 border border-gray-400 bg-gray-200 focus:outline-none"
          placeholder="Enter your blog name"
        />
        <select className='w-full border-gray-300 border mt-5 p-3 focus:outline-none'>
            <option value="">Category</option>
        </select>
        <textarea
          className="w-full p-3 border border-gray-400 focus:outline bg-gray-200 focus:outline-none mt-5"
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
    </div>
  )
}

export default index
