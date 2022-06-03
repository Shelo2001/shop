import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <div class='navbar bg-neutral'>
      <div class='flex-1 mx-20'>
        <Link
          to='/'
          class='btn rounded-full btn-primary normal-case text-2xl text-white '
        >
          <i class='fa-brands fa-shopify'></i>
        </Link>
      </div>
      <div class='flex-none mx-20'>
        <ul class='menu menu-horizontal p-2'>
          <li className='hover:bg-[#278fd4] transition duration-200 text-white mx-2 rounded'>
            <Link to='/cart'>
              <i className='fas fa-shopping-cart'></i>
              <p className='font-semibold '> Cart</p>
            </Link>
          </li>
          {userInfo ? (
            <div class='dropdown dropdown-hover'>
              <label tabindex='0' class='btn m-1 hover:bg-[#278fd4] text-white'>
                {userInfo.name}
              </label>
              <ul
                tabindex='0'
                class='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'
              >
                <li>
                  <Link
                    className='hover:btn-success hover:text-white'
                    to='/profile'
                  >
                    Profile
                  </Link>
                </li>
                <li className='mt-1'>
                  <button
                    className='hover:btn-error hover:text-white'
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <li className=' hover:bg-[#278fd4] transition duration-200 text-white mx-2 rounded'>
              <Link to='/login'>
                <i className='fas fa-user'></i>
                <p className='font-semibold '>Sign In</p>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Header
