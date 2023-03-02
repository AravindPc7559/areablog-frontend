import React, { useState } from 'react'
import Comments from '../Common/Comments/Comments'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_COMMENT } from '../../Graphql/Mutation'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { GET_ALL_COMMENTS } from '../../Graphql/Query'
import Spinner from '../Spinner/Spinner'

type Props = {}

const CommentForm = (props: Props) => {
  const [comment, setComment] = useState('')
  const { sideBarState } = useSelector((state: any) => state.sidebar)
  const [
    CommentBlog,
    { loading: commentLoading, error: commentError },
  ] = useMutation(ADD_COMMENT)

  const { data, loading, error } = useQuery(GET_ALL_COMMENTS)

  const handleSubmitComment = () => {
    CommentBlog({
      variables: {
        comment: comment,
        commenterID: localStorage.getItem('UserId'),
        blogID: sideBarState.id,
      },
      refetchQueries: [{query: GET_ALL_COMMENTS}]
    }).then((res) => {
      if (res.data.CommentBlog.status === 'success') {
        setComment('')
        toast.success(res.data.CommentBlog.message, {
          position: 'top-right',
        })
      }
      if (res.data.CommentBlog.status === 'error') {
        toast.error(res.data.CommentBlog.message, {
          position: 'top-right',
        })
      }
    })
  }

  const filterComment =
    !loading &&
    data.getAllComment.filter((data: any) => data.blogID === sideBarState.id)

  return (
    <div className="overflow-auto">
      <h1 className="text-center text-2xl font-semibold mt-10">Comments</h1>
      <div className="mt-5">
        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          className="w-full p-3 border border-gray-400 focus:outline focus:outline-none"
          placeholder="Say something nice...."
          rows={6}
        />
        <div className="grid place-content-center">
          <button
            onClick={handleSubmitComment}
            className="bg-blue-500 px-6 py-2 font-semibold text-lg hover:text-white hover:bg-blue-600"
          >
            {commentLoading ? 'Loading....' : 'Submit'}
          </button>
        </div>
      </div>
      <div className="mt-10">
      <h1 className='text-2xl mb-1'>Total {filterComment.length} Comments..</h1>

        {loading ? (
          <div className="mt-20">
            <Spinner loading={true} />
          </div>
        ) : (
          <div className="overflow-auto">
            {filterComment.map((data: any, index: number) => {
              return (
                <div key={index}>
                  <Comments 
                  comment={data.comment}
                  commenterID={data.commenterID}
                  createdAt={data.createdAt}
                  blogID={data.blogID}
                  updatedAt={data.updatedAt}
                  _id={data._id}
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentForm
