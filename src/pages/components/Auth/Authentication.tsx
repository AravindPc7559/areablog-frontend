/* eslint-disable @next/next/no-img-element */
import React from 'react'

type Props = {}

const Authentication = (props: Props) => {
  const [toggleAuth, setToggleAuth] = React.useState(true)

  const registerElement = (
    <>
      {!toggleAuth && (
        <input
          type="text"
          className="mt-3 w-[100%] p-3 rounded-xl focus:outline-none"
          placeholder="Enter your name..."
        />
      )}
      <input
        type="email"
        className="mt-3 w-[100%] p-3 rounded-xl focus:outline-none"
        placeholder="Enter your email..."
      />
      {!toggleAuth && (
        <>
          <input
            type="number"
            className="mt-3 w-[100%] p-3 rounded-xl focus:outline-none"
            placeholder="Enter your mobile number..."
          />
          <select
            className="mt-3 w-[100%] p-3 rounded-xl focus:outline-none"
            placeholder="Enter your name..."
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <select
            className="mt-3 w-[100%] p-3 rounded-xl focus:outline-none"
            placeholder="Enter your name..."
          >
            <option value="">Category</option>
            <option value="Male">Entertainment</option>
            <option value="Female">Tech</option>
            <option value="Other">Food</option>
            <option value="Other">Custom</option>
          </select>
          <input
            type="date"
            className="mt-3 w-[100%] p-3 rounded-xl focus:outline-none"
            placeholder="Enter your name..."
          />
        </>
      )}

      <input
        type="password"
        className="mt-3 w-[100%] p-3 rounded-xl focus:outline-none"
        placeholder="Enter your password..."
      />
      {!toggleAuth && (
        <input
          type="password"
          className="mt-3 w-[100%] p-3 rounded-xl focus:outline-none"
          placeholder="Confirm password..."
        />
      )}
    </>
  )

  return (
    <div className="bg-gradient-to-b from-[#00C6FB] to-[#005BEA] min-h-screen grid grid-cols-1 md:grid-cols-2 place-content-center">
      <div className='grid place-content-center'>
        <img src="./assets/Auth/AuthBg.png" alt="" />
      </div>
      <div className="py-3 px-3 md:px-10 flex justify-center items-center">
        <div className="shadow-md px-6 md:px-14 py-10 w-full">
          <img
            src="./assets/gif/199-attribution-solid.gif"
            alt=""
            className="w-[60px] mx-auto cursor-pointer"
          />
          <h1 className="text-center font-bold text-2xl ">Authentication</h1>
          {registerElement}
          <div className="flex justify-center items-center mt-5 relative">
            <div className="">
              <button className="bg-green-400 px-10 py-2 rounded-md font-semibold hover:text-white hover:bg-green-500">
                Submit
              </button>
              <p
                className={`mt-1 ${!toggleAuth && "-ml-4"} hover:text-white cursor-pointer`}
                onClick={() => setToggleAuth(!toggleAuth)}
              >
                {
                  toggleAuth ?
                  "Create an account" 
                  :
                  "Already have an account"
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Authentication
