import React, { useState } from 'react'
import TrendingPost from '../Common/PostTag/PostTag'
import { useMutation } from '@apollo/client'
import { SEARCH_BLOG, SEARCH_USER } from '../../Graphql/Mutation'
import Spinner from '../Spinner/Spinner'
import { toast } from 'react-toastify'
import UserProfileTag from '../Common/ProfileTag/UserProfileTag'

type Props = {}

const SearchForm = (props: Props) => {
  const [type, setType] = useState('')
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const [result, setResult] = useState<any>([])
  
  const [searchBlog, { loading: blogLoading, error: blogError }] = useMutation(
    SEARCH_BLOG,
  )

  const [searchUser, { loading: UserLoading, error: UserError }] = useMutation(
    SEARCH_USER,
  )

  const handleSearch = () => {
    if (type === '') {
      toast.error('Please select a Blog/User', {
        position: 'top-right',
      })
    }
    if (type === 'blog') {
      setLoading(true)
      searchBlog({
        variables: {
          search: text,
        },
      }).then((res) => {
        setLoading(false)
        setResult(res.data.searchBlog)
      })
    }

    if (type === 'user') {
      setLoading(true)
      searchUser({
        variables: {
          search: text,
        },
      }).then((res) => {
        setLoading(false)
        setResult(res.data.searchUser)
      })
    }
  }

  return (
    <div className="mt-10">
      <h1 className="text-center text-2xl font-semibold">Search Here</h1>
      <div className="mt-3">
        <input
          type="text"
          className="w-full p-3 border border-gray-400 focus:outline-none"
          placeholder="Enter your keywords"
          onChange={(e) => setText(e.target.value)}
        />
        <div className="">
          <label htmlFor="">Blog</label>
          <input
            type="checkbox"
            className="text-2xl mt-5 ml-2"
            value="blog"
            onChange={(e) => setType('blog')}
          />
          <label htmlFor="" className="ml-5">
            User
          </label>
          <input
            type="checkbox"
            className="text-2xl mt-5 ml-2"
            value="User"
            onChange={(e) => setType('user')}
          />
        </div>
      </div>
      <div className="mt-3 flex justify-center">
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </div>
      <div className="mt-10">
        {/* {result.length < 1 && <h1 className="text-center">No Result</h1>} */}
        {!loading &&
          type === 'blog' &&
          result.map((data: any, index: number) => {
            return (
              <div key={index}>
                <TrendingPost
                  image={data.image.url}
                  name={data.blogName}
                  description={data.blogContent}
                  category={data.category}
                  blogID={data._id}
                />
              </div>
            )
          })}
        {!loading &&
          type === 'user' &&
          result.map((data: any, index: number) => {
            return (
              <div key={index}>
                <UserProfileTag
                  image={data.image.url}
                  category={data.category}
                  description={data.bio}
                  userId={data._id}
                  name={data.fullName}
                  followingData={data.following}
                />
              </div>
            )
          })}
          {
            loading && 
            <Spinner loading={true} />
          }
      </div>
    </div>
  )
}

export default SearchForm
