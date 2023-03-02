import React, { CSSProperties, useState } from 'react'
import HashLoader from 'react-spinners/HashLoader'
type Props = {
  loading: boolean
}

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
}

const Spinner = ({ loading }: Props) => {
  let [color, setColor] = useState('00008B')
  return (
    <div>
      {' '}
      <HashLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Spinner
