/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from '@/components/Navbar/Navbar'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { ADD_BLOG } from '@/Graphql/Mutation'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import FullScreenSpinner from '@/components/Spinner/FullScreenSpinner'
import BottomBar from '../../../components/Mobile/BottomBar'
import { Category } from '../../../components/Common/CommonDatas/Data'

type Props = {}

const CreateBlog = (props: Props) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>('')
  const router = useRouter()
  let UserId: string | null

  const [AddBlog, { loading: AddBlogLoading, error }] = useMutation(ADD_BLOG)

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm()

  const handleImage = (e: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onloadend = () => {
      setImage(reader.result)
    }
  }

  const handleBlogSubmit = (data: any) => {
    AddBlog({
      variables: {
        blogName: data.blogName,
        category: data.category,
        blogContent: data.blog,
        image: image,
        userId: UserId,
      },
    }).then((res) => {
      router.reload()
      if (res.data.AddBlog.status === 'success') {
        toast.success(res.data.AddBlog.message, {
          position: 'top-right',
        })
      }

      if (res.data.AddBlog.status === 'error') {
        toast.error(res.data.AddBlog.message, {
          position: 'top-right',
        })
      }
    })
  }

  useEffect(() => {
    UserId = localStorage.getItem('UserId')
  })

  return (
    <>
      {AddBlogLoading ? (
        <FullScreenSpinner />
      ) : (
        <div className="bg-gradient-to-b w-full min-h-screen from-[#00C6FB] to-[#005BEA] pb-10 md:pb-0">
          <Navbar />
          <div className="flex justify-center items-center">
            <div className="md:w-[50%] px-3 h-aut mt-12 md:mt-36">
              <h1 className="text-center text-2xl font-semibold">
                Create Blog
              </h1>
              <div className="mt-5">
                <form onSubmit={handleSubmit(handleBlogSubmit)}>
                  <input
                    type="text"
                    className="w-full p-5 border border-gray-400 bg-gray-200 focus:outline-none"
                    placeholder="Enter your blog name"
                    {...register('blogName', {
                      required: {
                        value: true,
                        message: 'Blog name is required',
                      },
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
                      required: {
                        value: true,
                        message: 'Category is required',
                      },
                    })}
                    className="w-full border-gray-300 border mt-5 p-3 focus:outline-none"
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
                    className="w-full p-3 border border-gray-400 focus:outline bg-gray-200 focus:outline-none mt-5"
                    placeholder="Write your blog....."
                    rows={20}
                    {...register('blog', {
                      required: {
                        value: true,
                        message: 'Blog name is required',
                      },
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
                  <input
                    type="file"
                    className="w-full p-5"
                    onChange={handleImage}
                  />
                  <div className="grid place-content-center md:mt-6 mb-6 md:mb-0">
                    <button
                      disabled={AddBlogLoading ? true : false}
                      type="submit"
                      className="bg-green-500 px-6 rounded-2xl py-2 font-semibold text-lg hover:text-white hover:bg-green-600"
                    >
                      {AddBlogLoading ? 'Loading...' : 'Submit'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <BottomBar />
    </>
  )
}

export default CreateBlog
