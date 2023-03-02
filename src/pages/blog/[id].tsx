import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Page from '../components/Blog/Page'
import { useRouter } from 'next/router'
import { GET_ALL_BLOGS } from '../Graphql/Query'
import { useQuery } from '@apollo/client'
import FullScreenSpinner from '../components/Spinner/FullScreenSpinner'

type Props = {}

const BlogPage = (props: Props) => {
  const router = useRouter()
  const now = new Date();
  console.log(Math.floor(now.getTime() / 1000) + (60 * 60 * 24))
  const { id } = router.query

  const {
    data: GetAllBlog,
    loading: GetAllBlogLoading,
    error: GetAllBlogError,
  } = useQuery(GET_ALL_BLOGS)

  const CurrentBlog =
    !GetAllBlogLoading &&
    GetAllBlog.getAllBlogs.find((blog: any) => blog._id === id)

  return (
    <>
      {GetAllBlogLoading ? (
        <FullScreenSpinner />
      ) : (
        <div className="bg-gradient-to-b w-full min-h-[200px] from-[#00C6FB] to-[#005BEA]">
          <Navbar />
          <div className="w-full px-6">
            <Page
              category={CurrentBlog.category}
              image={CurrentBlog.image}
              blogName={CurrentBlog.blogName}
              blogContent={CurrentBlog.blogContent}
              userId={CurrentBlog.userId}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default BlogPage
