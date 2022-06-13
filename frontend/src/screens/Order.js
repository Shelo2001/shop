import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder, getOrderDetails, payOrder } from '../actions/orderActions'

const Order = () => {
  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const orderId = params.id

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay) {
      dispatch({ type: 'ORDER_PAY_RESET' })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, order])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
    console.log(paymentResult)
  }

  return loading ? (
    <div class='alert alert-error shadow-lg  my-5'>
      <div>
        <i class='fa-solid text-white fa-circle-error'></i>
        <p className='text-white font-medium'>{loading}</p>
      </div>
    </div>
  ) : error ? (
    error && (
      <div class='alert alert-error shadow-lg  my-5'>
        <div>
          <i class='fa-solid text-white fa-circle-error'></i>
          <p className='text-white font-medium'>{error}</p>
        </div>
      </div>
    )
  ) : (
    <>
      <div class='py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto'>
        <div class='mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0'>
          <div class='flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8'>
            <h1 class='text-xl dark:text-white font-semibold leading-5 text-gray-800'>
              Order #{order._id}
            </h1>
            <div class='flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8'>
              <div class='flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6'>
                <h3 class='text-xl dark:text-white font-semibold leading-5 text-gray-800'>
                  Shipping
                </h3>
                <div class='flex justify-between items-start w-full'>
                  <p class='text-lg font-semibold leading-6 dark:text-white text-gray-800 ml-2'>
                    Address: {order.shippingAddress.address},{' '}
                    {order.shippingAddress.city},{' '}
                    {order.shippingAddress.postalCode},{' '}
                    {order.shippingAddress.country}
                  </p>
                </div>
                <div class='flex justify-between items-start w-full'>
                  <p class='text-lg font-semibold leading-6 dark:text-white text-gray-800 ml-2'>
                    Name: {order.user.name}
                  </p>
                </div>
                <div class='flex justify-between items-start w-full'>
                  <p class='text-lg font-semibold leading-6 dark:text-white text-gray-800 ml-2'>
                    Email:{' '}
                    <a
                      className='underline text-gray-600'
                      href={`mailto:${order.user.email}`}
                    >
                      {order.user.email}
                    </a>
                  </p>
                </div>
                <div class='flex justify-between items-start w-full'>
                  {order.isDelivered ? (
                    <div class='alert alert-success shadow-lg  my-5'>
                      <div>
                        <i class='fa-solid text-white fa-circle-success'></i>
                        <p className='text-white font-medium'>
                          Delivered on {order.deliveredAt}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div class='alert alert-error shadow-lg  my-5'>
                      <div>
                        <i class='fa-solid text-white fa-circle-error'></i>
                        <p className='text-white font-medium'>Not Delivered</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div class='flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8'>
              <div class='flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6'>
                <h3 class='text-xl dark:text-white font-semibold leading-5 text-gray-800'>
                  Payment Method
                </h3>
                <div class='flex justify-between items-start w-full'>
                  <p class='text-lg font-semibold leading-6 dark:text-white text-gray-800 ml-2'>
                    Method: {order.paymentMethod}
                  </p>
                </div>
                <div class='flex justify-between items-start w-full'>
                  {order.isPaid ? (
                    <div class='alert alert-success shadow-lg  my-5'>
                      <div>
                        <i class='fa-solid text-white fa-circle-success'></i>
                        <p className='text-white font-medium'>
                          Paid on {order.paidAt}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div class='alert alert-error shadow-lg  my-5'>
                      <div>
                        <i class='fa-solid text-white fa-circle-error'></i>
                        <p className='text-white font-medium'>Not Paid</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div class='flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full'>
              <p class='text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800'>
                Customer’s Cart
              </p>
              {order.orderItems.length === 0 ? (
                <p>Cart is Empty</p>
              ) : (
                order.orderItems.map((item, index) => (
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
                      ${order.itemsPrice}
                    </p>
                  </div>
                  <div class='flex justify-between items-center w-full'>
                    <p class='text-base dark:text-white leading-4 text-gray-800'>
                      Shipping
                    </p>
                    <p class='text-base dark:text-gray-300 leading-4 text-gray-600'>
                      ${order.shippingPrice}
                    </p>
                  </div>
                  <div class='flex justify-between items-center w-full'>
                    <p class='text-base dark:text-white leading-4 text-gray-800'>
                      Tax
                    </p>
                    <p class='text-base dark:text-gray-300 leading-4 text-gray-600'>
                      ${order.taxPrice}
                    </p>
                  </div>
                </div>
                <div class='flex justify-between items-center w-full'>
                  <p class='text-base dark:text-white font-semibold leading-4 text-gray-800'>
                    Total
                  </p>
                  <p class='text-base dark:text-gray-300 font-semibold leading-4 text-gray-600'>
                    ${order.totalPrice}
                  </p>
                </div>
              </div>

              {!order.isPaid && (
                <div>
                  {loadingPay && <p>loading...</p>}
                  {!sdkReady ? (
                    <p>loading</p>
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Order
