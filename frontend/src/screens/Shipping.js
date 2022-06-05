import React, { useState } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'

const Shipping = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch(0)

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }

  return (
    <div className='flex justify-center mt-8'>
      <div class='w-1/4 min-h-screen text-center'>
        <div class='space-y-4'>
          <CheckoutSteps step1 step2 />
          <header class='mb-3 text-2xl font-bold'>Shipping</header>
          <form className='p-4' onSubmit={submitHandler}>
            <div class='w-full rounded-2xl bg-gray-50 px-4 my-4 ring-2 ring-gray-200 focus-within:ring-blue-400'>
              <input
                type='address'
                placeholder='Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                class='my-3 w-full border-none bg-transparent outline-none focus:outline-none'
              />
            </div>
            <div class='w-full rounded-2xl my-4 bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400'>
              <input
                type='city'
                placeholder='City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                class='my-3 w-full border-none bg-transparent outline-none focus:outline-none'
              />
            </div>
            <div class='w-full rounded-2xl my-4 bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400'>
              <input
                type='ostalCode'
                placeholder='Postal Code'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                class='my-3 w-full border-none bg-transparent outline-none focus:outline-none'
              />
            </div>
            <div class='w-full rounded-2xl my-4 bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400'>
              <input
                type='country'
                placeholder='Country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                class='my-3 w-full border-none bg-transparent outline-none focus:outline-none'
              />
            </div>
            <button class='w-full bg-[#83BD75] rounded-3xl p-3 mt-4 text-white font-bold transition duration-200 hover:bg-[#4E944F]'>
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Shipping
