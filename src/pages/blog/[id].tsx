import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Page from '../components/Blog/Page'

type Props = {}

const BlogPage = (props: Props) => {
  return (
    <div className="bg-gradient-to-b w-full min-h-[200px] from-[#00C6FB] to-[#005BEA]">
        <Navbar />
        <div className='w-full px-6'>
        <Page />
        </div>
    </div>
  )
}

export default BlogPage