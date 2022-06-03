import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [navigate, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <div class='mx-auto flex min-h-screen w-full  justify-center bg-gray-900 text-white'>
      <section class='flex w-[30rem] mt-16 flex-col space-y-10'>
        <div class='text-center text-4xl font-medium'>Sing In</div>
        {error && (
          <div class='alert alert-error shadow-lg  my-5'>
            <div>
              <i class='fa-solid text-white fa-circle-error'></i>
              <p className='text-white font-medium'>{error}</p>
            </div>
          </div>
        )}
        {loading && (
          <h1 className='text-center text-4xl font-semibold py-6'>
            Loading...
          </h1>
        )}
        <form onSubmit={submitHandler}>
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
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              class='w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none'
            />
          </div>

          <button class='w-full bg-[#278fd4] rounded-3xl p-3 mt-4 text-white font-bold transition duration-200 hover:bg-[#]'>
            Register
          </button>
        </form>
        <div class='flex items-center justify-center border-t-[1px] border-t-slate-300 w-full relative'>
          <div class='-mt-1 font-bod bg-gray-900 px-5 absolute'>Or</div>
        </div>
        <Link
          to={'/login'}
          class='w-full text-center  border-blue-900 hover:border-[#278fd4]  border-[1px] rounded-3xl p-3 text-[#278fd4] font-bold transition duration-200'
        >
          Sign In
        </Link>
      </section>
    </div>
  )
}

export default Register
