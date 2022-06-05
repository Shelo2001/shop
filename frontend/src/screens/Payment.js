import React, { useState } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'

const Payment = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('Paypal')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <div className='flex justify-center mt-8'>
      <div class='w-1/4 min-h-screen text-center'>
        <div class='space-y-4'>
          <CheckoutSteps step1 step2 step3 />

          <header class=' text-2xl font-bold mt-10'>Payment Method</header>

          <div class='form-control border-2 border-gray-400 rounded-badge '>
            <label class='label cursor-pointer'>
              <span class='label-text p-2 font-medium'>
                Paypal Or Credit Card
              </span>
              <input
                type='radio'
                name='paymentMethod'
                value='Paypal'
                onChange={(e) => setPaymentMethod(e.target.value)}
                class='radio checked:bg-red-500'
              />
            </label>
          </div>
          <form className='p-4' onSubmit={submitHandler}>
            <button class='w-full bg-[#83BD75] rounded-3xl p-3 mt-4 text-white font-bold transition duration-200 hover:bg-[#4E944F]'>
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Payment
