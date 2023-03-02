/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import SlideOne from '../components/Hompage/Slides/First/SlideOne'
import SlideTwo from '../components/Hompage/Slides/First/SlideTwo'
import SideBar from '../components/Sidebars/SideBar'
import Filter from '../components/Hompage/Slides/Third/Filter'
import { GetServerSideProps } from 'next'
import { requireAuthentication } from '../Utils/requireAuthentification'
import { useQuery, useMutation } from '@apollo/client'
import ProfileContent from '../components/Profile/ProfileContent'
import Spinner from '../components/Spinner/Spinner'
import FullScreenSpinner from '../components/Spinner/FullScreenSpinner'
import { GET_FOLLOWED_USER_DATA } from '../Graphql/Query'
import BottomBar from '../components/Mobile/BottomBar'
type Props = {}

const Homepage = (props: Props) => {

  const [ID, setID] = React.useState<any>('')
  const { data, loading: GetALLLoading, error: GetAllError, refetch } = useQuery(
    GET_FOLLOWED_USER_DATA,
    {
      variables: {
        userId: ID,
      },
      pollInterval: 500
    },
  )
  useEffect(() => {
    setID(localStorage.getItem('UserId'))
  }, [])

  return (
    <>
      {GetALLLoading ? (
        <FullScreenSpinner />
      ) : (
        <div className="bg-gradient-to-b from-[#00C6FB] to-[#005BEA] pb-10 md:pb-0">
          <SideBar />
          <Navbar />
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 ">
            <div className="hidden md:flex w-[80%] min-h-screen relative pt-12">
              <Filter />
            </div>
            <div className="w-full md:min-w-[50%] min-h-screen">
              {!GetALLLoading && data.getFollowedUsers.length === 0 ? (
                <div className="absolute top-[30%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                  <div className="flex justify-center items-center">
                    <img
                      src="/assets/svg/user3.svg"
                      className="md:mt-20 h-[320px]"
                      alt="Svg Image"
                    />
                  </div>
                  <h1 className="md:mt-10 text-xl font-semibold">
                    You haven't followed anyone. Follow anybody to see their
                    post.
                  </h1>
                </div>
              ) : GetALLLoading ? (
                <div className="mt-20">
                  <Spinner loading={true} />
                </div>
              ) : (
                !GetALLLoading &&
                data.getFollowedUsers.map((obj: any, index: number) => {
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
                })
              )}
            </div>
            <div className="hidden md:flex min-w-[20%] justify-end min-h-screen">
              <div className="z-0 fixed  w-[22%] min-h-auto overflow-x-auto mr-12">
                <SlideOne />
                <SlideTwo />
              </div>
            </div>
          </div>
        </div>
      )}
      <BottomBar />
    </>
  )
}

export default Homepage

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (ctx) => {
    return {
      props: {
        isValid: ctx.query,
      },
    }
  },
)
