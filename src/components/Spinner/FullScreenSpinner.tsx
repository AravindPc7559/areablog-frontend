import React, { CSSProperties, useState } from 'react'
import HashLoader from 'react-spinners/HashLoader'
type Props = {}

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
}
const FullScreenSpinner = (props: Props) => {
  let [color, setColor] = useState('#00C6FB')
  return (
    <div className='absolute w-full min-h-screen bg-white z-50 opacity-75'>
     <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
     <HashLoader
        color={color}
        loading={true}
        cssOverride={override}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
     </div>
    </div>
  )
}

export default FullScreenSpinner
