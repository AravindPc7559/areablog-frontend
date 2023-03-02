import { UPDATE_USER } from '@/pages/Graphql/Mutation'
import { GET_USER } from '@/pages/Graphql/Query'
import { useQuery, useMutation } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import FullScreenSpinner from '../Spinner/FullScreenSpinner'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { changeSideBarState } from '@/pages/Redux/features/SideBarSlice'
import Spinner from '../Spinner/Spinner'
import { Category, Gender } from '../Common/CommonDatas/Data'

type Props = {}

const UserEditForm = (Props: Props) => {
  const [image, setImage] = useState('')
  const router = useRouter()

  const dispatch = useDispatch()
  const { data, loading: AllUserLoading, error: AllUserError } = useQuery(
    GET_USER,
  )
  const [
    updateUser,
    { loading: UpdateUserLoading, error: UpdateUserError },
  ] = useMutation(UPDATE_USER)
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

  const user =
    !AllUserLoading &&
    data.getAllUsers.find(
      (user: any) => user._id === localStorage.getItem('UserId'),
    )

  const handleUpdateUser = (data: any) => {
    updateUser({
      variables: {
        fullName: data.fullName,
        bio: data.description,
        mobile: data.mobile,
        gender: data.gender,
        dob: data.dob,
        category: data.category,
        userId: user._id,
        image: image,
      },
      refetchQueries: [{ query: GET_USER }],
    }).then((res) => {
      dispatch(
        changeSideBarState({
          type: '',
          id: 0,
        }),
      )
      if (res.data.updateUser.status === 'success') {
        toast.success(res.data.updateUser.message, {
          position: 'top-right',
        })
      }
      if (res.data.updateUser.status === 'error') {
        toast.error(res.data.updateUser.message, {
          position: 'top-right',
        })
      }
    })
  }
  return (
    <>
      {UpdateUserLoading ? (
        <Spinner loading={true} />
      ) : (
        <div className="mt-10">
          <h1 className="text-center text-2xl font-semibold">Edit User</h1>
          <form onSubmit={handleSubmit(handleUpdateUser)}>
            <input
              type="text"
              className="mt-3 w-[100%] p-3 rounded-xl focus:outline-none"
              placeholder="Enter your full name..."
              defaultValue={user.fullName}
              aria-invalid={errors.fullName ? 'true' : 'false'}
              {...register('fullName', {
                required: { value: true, message: 'Name is required' },
                minLength: {
                  value: 2,
                  message: 'Minimum 2 character required',
                },
                maxLength: {
                  value: 20,
                  message: 'Maximum 20 character required',
                },
              })}
            />
            {errors.fullName && (
              <p className="text-sm ml-2 text-red-600" role="alert">
                {errors.fullName.message}
              </p>
            )}
            <input
              type="text"
              className="mt-3 w-[100%] p-3 rounded-xl focus:outline-none"
              placeholder="Enter your profile description.."
              defaultValue={user.bio}
              aria-invalid={errors.fullName ? 'true' : 'false'}
              {...register('description', {
                required: { value: true, message: 'Description is required' },
                minLength: {
                  value: 15,
                  message: 'Minimum 15 character required',
                },
                maxLength: {
                  value: 150,
                  message: 'Maximum 150 character required',
                },
              })}
            />
            {errors.description && (
              <p className="text-sm ml-2 text-red-600" role="alert">
                {errors.description.message}
              </p>
            )}
            <input
              type="text"
              className="mt-3 w-[100%] p-3 rounded-xl focus:outline-none"
              placeholder="Enter your mobile number..."
              defaultValue={user.mobile}
              aria-invalid={errors.mobile ? 'true' : 'false'}
              {...register('mobile', {
                required: { value: true, message: 'Number is required' },
                minLength: {
                  value: 10,
                  message: 'Minimum 10 digit required',
                },
                maxLength: {
                  value: 10,
                  message: 'Maximum 10 digit required',
                },
              })}
            />
            {errors.mobile && (
              <p className="text-sm ml-2 text-red-600" role="alert">
                {errors.mobile.message}
              </p>
            )}
            <select
              className="mt-3 w-[100%] p-3 rounded-xl focus:outline-none"
              placeholder="Enter your name..."
              defaultValue={user.gender}
              aria-invalid={errors.gender ? 'true' : 'false'}
              {...register('gender', {
                required: { value: true, message: 'Gender is required' },
              })}
            >
              {Gender.map((item: any, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {errors.gender && (
              <p className="text-sm ml-2 text-red-600" role="alert">
                {errors.gender.message}
              </p>
            )}

            <select
              className="mt-3 w-[100%] p-3 rounded-xl focus:outline-none"
              defaultValue={user.category}
              aria-invalid={errors.category ? 'true' : 'false'}
              {...register('category', {
                required: { value: true, message: 'Category is required' },
              })}
            >
              {Category.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-sm ml-2 text-red-600" role="alert">
                {errors.category.message}
              </p>
            )}

            <input
              type="date"
              className="mt-3 w-[100%] p-3 rounded-xl focus:outline-none"
              defaultValue={user.dob}
              placeholder="Enter your name..."
              aria-invalid={errors.dob ? 'true' : 'false'}
              {...register('dob', {
                required: { value: true, message: 'Date Of birth is required' },
              })}
            />
            {errors.dob && (
              <p className="text-sm ml-2 text-red-600" role="alert">
                {errors.dob.message}
              </p>
            )}
            <input type="file" onChange={handleImage} className="mt-5 ml-3" />
            <div className="grid place-content-center mt-6">
              <button
                type="submit"
                className="bg-green-500 px-6 rounded-2xl py-2 font-semibold text-lg hover:text-white hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default UserEditForm
