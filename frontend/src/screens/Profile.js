import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'

const Profile = () => {
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [navigate, userInfo, dispatch, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <div class='float-left flex min-h-screen w-full  justify-center bg-gray-900 text-white'>
      <section class='flex w-[30rem] mx-10 mt-10 flex-col space-y-10'>
        <div class='text-4xl font-medium'>User Profile</div>
        {error && (
          <div class='alert alert-error shadow-lg  my-5'>
            <div>
              <i class='fa-solid text-white fa-circle-error'></i>
              <p className='text-white font-medium'>{error}</p>
            </div>
          </div>
        )}
        {message && (
          <div class='alert alert-error shadow-lg  my-5'>
            <div>
              <i class='fa-solid text-white fa-circle-error'></i>
              <p className='text-white font-medium'>{message}</p>
            </div>
          </div>
        )}
        {success && (
          <div class='alert alert-success shadow-lg'>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='stroke-current flex-shrink-0 h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <span>Profile Updated Successfully</span>
            </div>
          </div>
        )}
        {loading && (
          <h1 className='text-center text-4xl font-semibold py-6'>
            Loading...
          </h1>
        )}
        <form onSubmit={submitHandler}>
          <div class='flex flex-items w-full transform my-4 border-b-2 bg-transparent text-lg duration-300 focus-within:border-[#0070ba]'>
            <i class='fa-solid fa-user flex-items mx-1 my-1 '></i>
            <input
              type='name'
              placeholder='Username'
              value={name}
              onChange={(e) => setName(e.target.value)}
              class='w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none'
            />
          </div>
          <div class='flex flex-items w-full transform mt-4 border-b-2 bg-transparent text-lg duration-300 focus-within:border-[#0070ba]'>
            <i class='fa-solid fa-at flex-items mx-1 my-1 '></i>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              class='w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none'
            />
          </div>

          <div class='flex flex-items w-full transform my-4 border-b-2 bg-transparent text-lg duration-300 focus-within:border-[#0070ba]'>
            <i class='fa-solid fa-key flex-items mx-1 my-1 '></i>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              class='w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none'
            />
          </div>

          <div class='flex flex-items w-full transform my-4 border-b-2 bg-transparent text-lg duration-300 focus-within:border-[#0070ba]'>
            <i class='fa-solid fa-key flex-items mx-1 my-1 '></i>
            <input
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              class='w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none'
            />
          </div>

          <button
            type='submit'
            class='w-full bg-[#278fd4] rounded-3xl p-3 mt-4 text-white font-bold transition duration-200 hover:bg-[#]'
          >
            Update
          </button>
        </form>
      </section>

      <section class='flex w-[50rem] mx-10 mt-16 flex-col space-y-10'>
        <div class=' text-4xl font-medium'>My Orders</div>
        <div class='overflow-x-auto '>
          <div class='relative overflow-x-auto shadow-md sm:rounded-lg'>
            {loadingOrders ? (
              <p>Loading...</p>
            ) : errorOrders ? (
              <p>{errorOrders}</p>
            ) : (
              <table class='w-full text-sm text-left text-gray-500  dark:text-gray-400'>
                <thead class='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' class='px-6 py-3'>
                      ID
                    </th>
                    <th scope='col' class='px-6 py-3'>
                      DATE
                    </th>
                    <th scope='col' class='px-6 py-3'>
                      TOTAL
                    </th>
                    <th scope='col' class='px-6 py-3'>
                      PAID
                    </th>
                    <th scope='col' class='px-6 py-3'>
                      Delivered
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                      <th
                        scope='row'
                        class='px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap'
                      >
                        № {order._id}
                      </th>
                      <th
                        scope='row'
                        class='px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap'
                      >
                        {order.createdAt.substring(0, 10)}
                      </th>
                      <td class='px-6 py-4'>{order.totalPrice} $</td>
                      <td class='px-6 py-4'>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td class='px-6 py-4'>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Profile
