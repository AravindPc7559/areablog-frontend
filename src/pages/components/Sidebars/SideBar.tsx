/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { SideBarType } from '../Types'
import TrendingPost from '../Common/PostTag/PostTag'
import Spinner from '../Spinner/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { changeSideBarState } from '@/pages/Redux/features/SideBarSlice'
import Comments from '../Common/Comments/Comments'
import { GET_ALL_BLOGS, GET_USER } from '@/pages/Graphql/Query'
import { useQuery, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { UPDATE_BLOG } from '../../Graphql/Mutation'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import UserEditForm from '../Forms/UserEditForm'
import CommentForm from '../Forms/CommentForm'
import SearchForm from '../Forms/SearchForm'
import { Category } from '../Common/CommonDatas/Data'

type Props = {}

function SideBar({}: Props) {
  let [loading, setLoading] = useState(false)
  const [image, setImage] = useState<any>('')
  let UserId: any
  const router = useRouter()
  const dispatch = useDispatch()
  const { sideBarState } = useSelector((state: any) => state.sidebar)
  const [
    UpdateBlog,
    { loading: UpdateBlogLoading, error: UpdateBlogMutation },
  ] = useMutation(UPDATE_BLOG)

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm()
  const {
    data: GetAllBlog,
    loading: GetAllBlogLoading,
    error: GetAllBlogError,
  } = useQuery(GET_ALL_BLOGS)

  const CurrentBlog =
    sideBarState.type === 'profile-edit' &&
    !GetAllBlogLoading &&
    GetAllBlog.getAllBlogs.find((blog: any) => blog._id === sideBarState.id)

  const handleImage = (e: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onloadend = () => {
      setImage(reader.result)
    }
  }

  const handleUpdateBlog = (data: any) => {
    UpdateBlog({
      variables: {
        blogName: data.blogName,
        blogContent: data.blog,
        image: image,
        category: data.category,
        blogId: CurrentBlog._id,
      },
      refetchQueries: [{ query: GET_ALL_BLOGS }],
    }).then((res) => {
      dispatch(
        changeSideBarState({
          type: '',
          id: 0,
        }),
      )
      if (res.data.UpdateBlog.status === 'success') {
        toast.success(res.data.UpdateBlog.message, {
          position: 'top-right',
        })
      }
      if (res.data.UpdateBlog.status === 'error') {
        toast.success(res.data.UpdateBlog.message, {
          position: 'top-right',
        })
      }
    })
  }

  const ProfileEditSection = (
    <form action="" onSubmit={handleSubmit(handleUpdateBlog)}>
      <div className="flex justify-center items-center w-full">
        <div className=" md:px-3 h-auto mt-12">
          <h1 className="text-center text-2xl font-semibold">Edit Blog</h1>
          <div className="mt-5">
            <input
              type="text"
              defaultValue={CurrentBlog && CurrentBlog.blogName}
              className="w-full p-5 border border-gray-400 bg-white focus:outline-none"
              placeholder="Enter your blog name"
              {...register('blogName', {
                required: { value: true, message: 'Blog name is required' },
                minLength: {
                  value: 20,
                  message: 'Minimum 20 character required',
                },
                maxLength: {
                  value: 100,
                  message: 'Maximum 100 character required',
                },
              })}
            />
            {errors.blogName && (
              <p className="text-sm ml-2 text-red-600" role="alert">
                {/* @ts-ignore: Unreachable code error */}
                {errors.blogName.message}
              </p>
            )}
            <select
              {...register('category', {
                required: { value: true, message: 'Category is required' },
              })}
              defaultValue={CurrentBlog && CurrentBlog.category}
              className="w-full border-gray-300 bg-white border mt-5 p-3 focus:outline-none"
            >
              {Category.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-sm ml-2 text-red-600" role="alert">
                {/* @ts-ignore: Unreachable code error */}

                {errors.category.message}
              </p>
            )}
            <textarea
              defaultValue={CurrentBlog && CurrentBlog.blogContent}
              className="w-full p-3 border border-gray-400 focus:outline bg-white focus:outline-none mt-5"
              placeholder="Write your blog....."
              rows={20}
              {...register('blog', {
                required: { value: true, message: 'Blog name is required' },
                minLength: {
                  value: 100,
                  message: 'Minimum 100 character required',
                },
                maxLength: {
                  value: 9100,
                  message: 'Maximum 10000 character required',
                },
              })}
            />
            {errors.blog && (
              <p className="text-sm ml-2 text-red-600" role="alert">
                {/* @ts-ignore: Unreachable code error */}

                {errors.blog.message}
              </p>
            )}
            <input type="file" className="w-full p-5" onChange={handleImage} />
            <div className="grid place-content-center mt-6">
              <button
                type="submit"
                disabled={UpdateBlogLoading ? true : false}
                className="bg-green-500 px-6 rounded-2xl py-2 font-semibold text-lg hover:text-white hover:bg-green-600"
              >
                {UpdateBlogLoading ? 'Loading...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )

  return (
    <div className="w-full">
      {sideBarState.type !== '' && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
          }}
          className="w-full md:w-[40%] h-screen  top-5 right-0 shadow-2xl  bg-white fixed z-10  p-10 overflow-auto"
        >
          <div className="flex justify-end">
            <AiOutlineCloseCircle
              className="text-4xl cursor-pointer mt-6"
              onClick={() =>
                dispatch(
                  changeSideBarState({
                    type: '',
                    id: 0,
                  }),
                )
              }
            />
          </div>
          {UpdateBlogLoading ? (
            <div className="mt-96">
              <Spinner loading={true} />
            </div>
          ) : (
            <>
              {sideBarState.type === 'search' && (
                <>
                  <SearchForm />
                </>
              )}

              {sideBarState.type === 'comment' && (
                <>
                  <CommentForm />
                </>
              )}

              {sideBarState.type === 'profile-edit' && (
                <>{ProfileEditSection}</>
              )}

              {sideBarState.type === 'user-edit' && <>{<UserEditForm />}</>}
            </>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default SideBar
