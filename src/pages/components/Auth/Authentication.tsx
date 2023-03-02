/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Cookies from 'js-cookie'
import { LOGIN_USER, REGISTER_USER } from '../../Graphql/Mutation'
import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { Category, Gender } from '../Common/CommonDatas/Data'
type Props = {}

const Authentication = (props: Props): JSX.Element => {
  const [toggleAuth, setToggleAuth] = React.useState(true)
  const router = useRouter()
  // React Hook Form

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm()

  // GraphQL mutation
  const [
    AddUser,
    { error: AddUserError, loading: AddUserLoading },
  ] = useMutation(REGISTER_USER)

  const [LoginUser, { error: LoginError, loading: LoginLoading }] = useMutation(
    LOGIN_USER,
  )

  const handleFormSubmit = async (data: any) => {
    if (toggleAuth) {
      LoginUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      }).then((res) => {
        console.log(res)

        if (res.data.LoginUser.status === 'success') {
          Cookies.set('UserInfo', res.data.LoginUser.Token)
          localStorage.setItem('UserId', res.data.LoginUser.UserId)
          router.push('/homepage')
          toast.success(res.data.LoginUser.message, {
            position: 'top-right',
          })
        }

        if (res.data.LoginUser.status === 'error') {
          toast.error(res.data.LoginUser.message, {
            position: 'top-right',
          })
        }
      })
    } else {
      if (data.password !== data.ConfirmPassword) {
        setError('ConfirmPassword', {
          type: 'custom',
          message: 'Password Not Matching',
        })
      } else {
        clearErrors('ConfirmPassword')
        AddUser({
          variables: {
            fullName: data.fullName,
            email: data.email,
            mobile: data.mobile,
            gender: data.gender,
            dob: data.dob,
            password: data.password,
          },
        }).then((res) => {
          setToggleAuth(true)
          if (res.data.AddUser.status === 'success') {
            Cookies.set('UserInfo', res.data.AddUser.Token)
            localStorage.setItem('UserId', res.data.AddUser.UserId)
            router.push('/homepage')
            toast.success(res.data.AddUser.message, {
              position: 'top-right',
            })
          }

          if (res.data.AddUser.status === 'error') {
            toast.error(res.data.AddUser.message, {
              position: 'top-right',
            })
          }
        })
      }
    }
  }

  const registerElement = (
    <>
      {!toggleAuth && (
        <>
          <input
            type="text"
            className="mt-3 w-[100%] p-3 rounded-xl focus:outline-none"
            placeholder="Enter your full name..."
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
              {/* @ts-ignore: Unreachable code error */}
              {errors.fullName.message}
            </p>
          )}
        </>
      )}

      <input
        type="email"
        className="mt-3 w-[100%] p-3 rounded-xl focus:outline-none"
        placeholder="Enter your email address..."
        aria-invalid={errors.email ? 'true' : 'false'}
        {...register('email', {
          required: { value: true, message: 'Email is required' },
          pattern: {
            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: 'Invalid email address',
          },
        })}
      />
      {errors.email && (
        <p className="text-sm ml-2 text-red-600" role="alert">
          {/* @ts-ignore: Unreachable code error */}
          {errors.email.message}
        </p>
      )}

      {!toggleAuth && (
        <>
          <input
            type="text"
            className="mt-3 w-[100%] p-3 rounded-xl focus:outline-none"
            placeholder="Enter your mobile number..."
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
              {/* @ts-ignore: Unreachable code error */}
              {errors.mobile.message}
            </p>
          )}

          <select
            className="mt-3 w-[100%] p-3 rounded-xl focus:outline-none"
            placeholder="Enter your name..."
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
              {/* @ts-ignore: Unreachable code error */}

              {errors.gender.message}
            </p>
          )}

          <select
            className="mt-3 w-[100%] p-3 rounded-xl focus:outline-none"
            aria-invalid={errors.category ? 'true' : 'false'}
            {...register('category', {
              required: { value: true, message: 'Category is required' },
            })}
          >
            {Category.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              )
            })}
          </select>
          {errors.category && (
            <p className="text-sm ml-2 text-red-600" role="alert">
              {/* @ts-ignore: Unreachable code error */}

              {errors.category.message}
            </p>
          )}

          <input
            type="date"
            className="mt-3 w-[100%] p-3 rounded-xl focus:outline-none"
            placeholder="Enter your name..."
            aria-invalid={errors.dob ? 'true' : 'false'}
            {...register('dob', {
              required: { value: true, message: 'Date Of birth is required' },
            })}
          />
          {errors.dob && (
            <p className="text-sm ml-2 text-red-600" role="alert">
              {/* @ts-ignore: Unreachable code error */}

              {errors.dob.message}
            </p>
          )}
        </>
      )}

      <input
        type="password"
        className="mt-3 w-[100%] p-3 rounded-xl focus:outline-none"
        placeholder="Enter your password..."
        aria-invalid={errors.password ? 'true' : 'false'}
        {...register('password', {
          required: { value: true, message: 'Password is required' },
          minLength: {
            value: 6,
            message: 'Minimum 6 character required',
          },
          maxLength: {
            value: 20,
            message: 'Maximum 20 character required',
          },
        })}
      />
      {errors.password && (
        <p className="text-sm ml-2 text-red-600" role="alert">
          {/* @ts-ignore: Unreachable code error */}

          {errors.password.message}
        </p>
      )}

      {!toggleAuth && (
        <>
          <input
            type="password"
            className="mt-3 w-[100%] p-3 rounded-xl focus:outline-none"
            placeholder="Confirm password..."
            aria-invalid={errors.ConfirmPassword ? 'true' : 'false'}
            {...register('ConfirmPassword', {
              required: {
                value: true,
                message: 'Confirm password is required',
              },
              minLength: {
                value: 6,
                message: 'Minimum 6 character required',
              },
              maxLength: {
                value: 20,
                message: 'Maximum 20 character required',
              },
            })}
          />
          {errors.ConfirmPassword && (
            <p className="text-sm ml-2 text-red-600" role="alert">
              {/* @ts-ignore: Unreachable code error */}

              {errors.ConfirmPassword.message}
            </p>
          )}
        </>
      )}
    </>
  )

  return (
    <div className="bg-gradient-to-b from-[#00C6FB] to-[#005BEA] min-h-screen grid grid-cols-1 md:grid-cols-2 place-content-center">
      {AddUserError &&
        toast.error(AddUserError.message, {
          position: 'top-right',
        })}
      {LoginError &&
        toast.error(LoginError.message, {
          position: 'top-right',
        })}
      <div className="grid place-content-center">
        <img src="./assets/Auth/AuthBg.png" alt="" />
      </div>
      <div className="py-3 px-3 md:px-10 flex justify-center items-center">
        <div className="shadow-md px-6 md:px-14 py-10 w-full">
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <img
              src="./assets/gif/199-attribution-solid.gif"
              alt=""
              className="w-[60px] mx-auto cursor-pointer"
            />
            <h1 className="text-center font-bold text-2xl ">Authentication</h1>
            {registerElement}
            <div className="flex justify-center items-center mt-5 relative">
              <div className="">
                <button
                  type="submit"
                  disabled={AddUserLoading || LoginLoading}
                  className={`px-10 py-2 rounded-md font-semibold hover:text-white ${
                    AddUserLoading || (LoginLoading && 'cursor-progress')
                  } ${
                    AddUserLoading || LoginLoading
                      ? 'bg-blue-400'
                      : 'bg-green-400'
                  }
                ${
                  AddUserLoading || LoginLoading
                    ? 'hover:bg-gray-500'
                    : 'hover:bg-green-500'
                }
                `}
                >
                  {AddUserLoading || LoginLoading ? 'Loading...' : 'Submit'}
                </button>
                <p
                  className={`mt-1 ${
                    !toggleAuth && '-ml-4'
                  } hover:text-white cursor-pointer`}
                  onClick={() => setToggleAuth(!toggleAuth)}
                >
                  {toggleAuth ? 'Create an account' : 'Already have an account'}
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Authentication
