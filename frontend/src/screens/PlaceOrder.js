import React, { useState, useEffect } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../actions/orderActions'

const PlaceOrder = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
    }
  }, [navigate, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <div>
      <div className='flex justify-center mt-4'>
        <CheckoutSteps step1 step2 step3 step4 />
      </div>
      <div class='py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto'>
        <div class='mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0'>
          <div class='flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8'>
            <div class='flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full'>
              <p class='text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800'>
                Customer’s Cart
              </p>
              {cart.cartItems === 0 ? (
                <p>Cart is Empty</p>
              ) : (
                cart.cartItems.map((item, index) => (
                  <div class='mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full'>
                    <div class='pb-4 md:pb-8 w-full md:w-40'>
                      <img
                        src={item.image}
                        className='w-20 rounded'
                        alt={item.name}
                      />
                    </div>
                    <div class='border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0'>
                      <div class='w-full flex flex-col justify-start items-start space-y-8'>
                        <h3 class='text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800'>
                          {item.name}
                        </h3>
                      </div>
                      <div class='flex justify-between space-x-8 items-start w-full'>
                        <p class='text-base dark:text-white xl:text-lg leading-6'>
                          ${item.price}
                        </p>

                        <p class='text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800'>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div class='flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8'>
              <div class='bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col'>
                <h3 class='text-xl dark:text-white font-semibold leading-5 text-gray-800'>
                  Payment Method
                </h3>
                <div class='flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0'>
                  <div class='flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6'>
                    <div class='flex justify-between items-center w-full'>
                      <p class='text-base dark:text-white font-semibold leading-4 text-gray-800'>
                        Method: {cart.paymentMethod}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class='flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6'>
                <h3 class='text-xl dark:text-white font-semibold leading-5 text-gray-800'>
                  Shipping
                </h3>
                <div class='flex justify-between items-start w-full'>
                  <div class='flex justify-center items-center space-x-4'>
                    <div class='flex flex-col justify-start items-center'>
                      <p class='text-lg leading-6 dark:text-white font-semibold text-gray-800'>
                        Address:
                        <br />
                      </p>
                    </div>
                  </div>
                  <p class='text-lg font-semibold leading-6 dark:text-white text-gray-800 ml-2'>
                    {' '}
                    {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                    {cart.shippingAddress.postalCode},{' '}
                    {cart.shippingAddress.country}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class='bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col'>
            <h3 class='text-xl dark:text-white font-semibold leading-5 text-gray-800'>
              Summary
            </h3>
            <div class='flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0'>
              <div class='flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6'>
                <div class='flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4'>
                  <div class='flex justify-between w-full'>
                    <p class='text-base dark:text-white leading-4 text-gray-800'>
                      Items
                    </p>
                    <p class='text-base dark:text-gray-300 leading-4 text-gray-600'>
                      ${cart.itemsPrice}
                    </p>
                  </div>
                  <div class='flex justify-between items-center w-full'>
                    <p class='text-base dark:text-white leading-4 text-gray-800'>
                      Shipping
                    </p>
                    <p class='text-base dark:text-gray-300 leading-4 text-gray-600'>
                      ${cart.shippingPrice}
                    </p>
                  </div>
                  <div class='flex justify-between items-center w-full'>
                    <p class='text-base dark:text-white leading-4 text-gray-800'>
                      Tax
                    </p>
                    <p class='text-base dark:text-gray-300 leading-4 text-gray-600'>
                      ${cart.taxPrice}
                    </p>
                  </div>
                </div>
                <div class='flex justify-between items-center w-full'>
                  <p class='text-base dark:text-white font-semibold leading-4 text-gray-800'>
                    Total
                  </p>
                  <p class='text-base dark:text-gray-300 font-semibold leading-4 text-gray-600'>
                    ${cart.totalPrice}
                  </p>
                </div>
              </div>
              {error && (
                <div class='alert alert-error shadow-lg  my-5'>
                  <div>
                    <i class='fa-solid text-white fa-circle-error'></i>
                    <p className='text-white font-medium'>{error}</p>
                  </div>
                </div>
              )}
              <button
                onClick={placeOrderHandler}
                class='btn text-white rounded-none w-full '
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
