import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import SlideOne from '../components/Hompage/Slides/First/SlideOne'
import SlideTwo from '../components/Hompage/Slides/First/SlideTwo'
import BlogCard from '../components/Hompage/Slides/Middle/BlogCard'
import SideBar from '../components/Sidebars/SideBar'
import Filter from '../components/Hompage/Slides/Third/Filter'


type Props = {}

const Homepage = (props: Props) => {
  return (
    <div className="bg-gradient-to-b from-[#00C6FB] to-[#005BEA]">
      <SideBar />
      <Navbar />
      <div className="p-8 grid grid-cols-1 md:grid-cols-3 ">
        <div className="hidden md:flex w-[80%] min-h-screen relative pt-12">
        <Filter />
        </div>
        <div className="w-full md:min-w-[50%] min-h-screen">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
        <div className="hidden md:flex min-w-[20%] justify-end min-h-screen">
        <div className="z-0 fixed  w-[22%] min-h-auto overflow-x-auto mr-12">
            <SlideOne />
            <SlideTwo />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
