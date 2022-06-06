import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <ul class='steps steps-vertical lg:steps-horizontal'>
      {step1 ? (
        <li data-content='✓' class='step step-primary'>
          <Link to='/login'>
            {' '}
            <p className='text-blue-700'>Sign In</p>{' '}
          </Link>
        </li>
      ) : (
        <li data-content='●' class='step '>
          Sign In
        </li>
      )}
      {step2 ? (
        <li data-content='✓' class='step step-primary'>
          <Link to='/shipping'>
            <p className='text-blue-700'>Shipping</p>{' '}
          </Link>
        </li>
      ) : (
        <li data-content='●' class='step '>
          Shipping
        </li>
      )}
      {step3 ? (
        <li data-content='✓' class='step step-primary'>
          {' '}
          <Link to='/payment'>
            <p className='text-blue-700'>Payment</p>{' '}
          </Link>
        </li>
      ) : (
        <li data-content='●' class='step'>
          Payment
        </li>
      )}
      {step4 ? (
        <li data-content='✓' class='step step-primary'>
          {' '}
          <Link to='/placeorder'>
            <p className='text-blue-700'>Place Order</p>{' '}
          </Link>
        </li>
      ) : (
        <li data-content='●' class='step'>
          Place Order
        </li>
      )}
    </ul>
  )
}

export default CheckoutSteps
