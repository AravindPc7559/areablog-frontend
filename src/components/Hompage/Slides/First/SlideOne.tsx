import React from 'react'
import TrendingPost from '../../../Common/PostTag/PostTag'
import { useQuery } from '@apollo/client'
import { GET_ALL_BLOGS, GET_USER } from '../../../../Graphql/Query'

type Props = {}

const SlideOne = (props: Props) => {
  const { data, loading, error } = useQuery(GET_USER)
  const {
    data: GetAllBlogs,
    loading: GetAllBlogsLoading,
    error: GetAllBlogsError,
  } = useQuery(GET_ALL_BLOGS)
  let arr
  const ownUser =
    !loading &&
    data &&
    data.getAllUsers.find(
      (data: any) => data._id === localStorage.getItem('UserId'),
    )

  const blogs =
    ownUser &&
    !GetAllBlogsLoading &&
    GetAllBlogs.getAllBlogs.filter(
      (data: any) => data.category === ownUser.category,
    )

  if (blogs) {
    if (blogs.length < 5) {
      arr = blogs.filter(
        (data: any) => data.userId !== localStorage.getItem('UserId'),
      )
    } else {
      arr = blogs
        .slice(0, 5)
        .filter((data: any) => data.userId !== localStorage.getItem('UserId'))
    }
  }

  console.log(arr)
  return (
    <div className="flex justify-center ">
      <div className="mt-12  shadow-lg min-h-[100px] px-10 border-y border-gray-100 p-3 bg-gray-100 rounded-2xl ">
        <h1 className="text-center font-semibold -trac">Related Blogs</h1>
        {arr && blogs ?
          arr.map((obj: any, index: number) => {
            return (
              <div key={index}>
                <TrendingPost
                image={obj.image.url}
                name={obj.blogName}
                category={obj.category}
                description={obj.blogContent}
                blogID={obj._id}
                userID={obj.userId}
                />
              </div>
            )
          })
        :
        <h1>No Related Blogs</h1>
        }

        <div></div>
      </div>
    </div>
  )
}

export default SlideOne
