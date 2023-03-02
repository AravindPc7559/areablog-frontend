import React from 'react'

type Props = {}

const Filter = (props: Props) => {
  return (
    <div className='w-[25%] h-auto bg-gray-100 rounded-2xl shadow-xl p-6 fixed'>
        <h1 className='text-center font-semibold text-xl'>Filter Blog</h1>
        <select className='w-full border-gray-300 border mt-5 p-3 focus:outline-none'>
            <option value="">Type</option>
        </select>
        <select className='w-full border-gray-300 border mt-5 p-3 focus:outline-none'>
            <option value="">Relavence</option>
        </select>
        <div className='mt-6 flex gap-3'>
        <div className='flex gap-2'>
        <label htmlFor="">With image</label>
            <input type="checkbox" />
        </div>
        <div className='flex gap-2'>
        <label htmlFor="">Without image</label>
            <input type="checkbox" />
        </div>
        </div>
        <div className='flex justify-center mt-5'>
        <button className='px-16 rounded-xl hover:bg-blue-600 hover:text-white font-semibold py-2 bg-blue-500'>Filter</button>
        </div>
    </div>
  )
}

export default Filter