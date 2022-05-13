import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div class='navbar bg-black'>
      <div class='flex-1 mx-20'>
        <Link to='/' class='btn btn-primary normal-case text-xl text-white '>
          eCommerce
        </Link>
      </div>
      <div class='flex-none mx-20'>
        <ul class='menu menu-horizontal p-2'>
          <li className='hover:bg-blue-500 text-white mx-2 rounded'>
            <Link to='/cart'>
              <i className='fas fa-shopping-cart'></i> Cart
            </Link>
          </li>
          <li className=' hover:bg-blue-500 text-white mx-2 rounded'>
            <Link to='/login'>
              <i className='fas fa-user'></i>Sign In
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
