import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import HeadPart from '../components/Profile/HeadPart'
import ProfileContent from '../components/Profile/ProfileContent'
import SideBar from '../components/Sidebars/SideBar'
import CommanModal from '../components/Common/Modals/CommanModal'

type Props = {}

const Profile = (props: Props) => {
  return (
    <div className="bg-gradient-to-b w-full min-h-screen from-[#00C6FB] to-[#005BEA]">
      <Navbar />
      <SideBar />
      <div className="mt-12 py-7 container mx-auto w-full">
      <CommanModal />
        <HeadPart />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          <ProfileContent />
          <ProfileContent />
          <ProfileContent />
          <ProfileContent />
          <ProfileContent />
          <ProfileContent />
        </div>
      </div>
    </div>
  )
}

export default Profile
