import React, { useContext } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import HeadPart from '../../components/Profile/HeadPart'
import ProfileContent from '../../components/Profile/ProfileContent'
import SideBar from '../../components/Sidebars/SideBar'
import CommanModal from '../../components/Common/Modals/CommanModal'
import { GetServerSideProps } from 'next'
import { requireAuthentication } from '../../Utils/requireAuthentification'
import { useQuery } from '@apollo/client'
import { GET_USER, GET_ALL_BLOGS } from '../../Graphql/Query'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../../Redux/features/CurrentUserSlice'
import FullScreenSpinner from '../../components/Spinner/FullScreenSpinner'
import { useEffect } from 'react'
import BottomBar from '../../components/Mobile/BottomBar'

type Props = {}

const Profile = (props: Props) => {
  const router = useRouter()
  const dipatch = useDispatch()

  const { id } = router.query

  const { loading, data, error } = useQuery(GET_USER)
  const {
    data: GetAllBlog,
    loading: GetAllBlogLoading,
    error: GetAllBlogError,
  } = useQuery(GET_ALL_BLOGS)

  const OurData =
    !GetAllBlogLoading &&
    GetAllBlog.getAllBlogs.filter((blog: any) => blog.userId === id)

  const userData =
    !loading &&
    data.getAllUsers.find(
      (obj: {
        fullName: String
        email: String
        mobile: String
        gender: String
        dob: String
        bio: String
        followers: [String]
        following: [String]
        category: String
        _id: String
      }) => obj._id === id,
    )

  userData &&
    dipatch(
      getCurrentUser({
        user: userData,
      }),
    )

  return (
    <>
      <div className="bg-gradient-to-b w-full min-h-screen from-[#00C6FB] to-[#005BEA] pb-10 md:pb-0">
        {loading || GetAllBlogLoading ? (
          <FullScreenSpinner />
        ) : (
          <>
            <Navbar />
            <SideBar />

            <div className="mt-12 py
            -7 container mx-auto w-full">
              <CommanModal />
              <HeadPart userId={id} followingData={userData.followers} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                {!loading &&
                  OurData.map((obj: any, index: number) => {
                    return (
                      <div key={index}>
                        <ProfileContent
                          blogContent={obj.blogContent}
                          blogName={obj.blogName}
                          category={obj.category}
                          image={obj.image}
                          userId={obj.userId}
                          _id={obj._id}
                          Liked={obj.Liked}
                        />
                      </div>
                    )
                  })}
              </div>
            </div>
          </>
        )}
      </div>
      <BottomBar />
    </>
  )
}

export default Profile

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (ctx) => {
    return {
      props: {
        isValid: ctx.query,
      },
    }
  },
)
