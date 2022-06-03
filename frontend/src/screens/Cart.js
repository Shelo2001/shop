import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions'

const Cart = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()
  const productId = params.id
  const [mailText, setMailText] = useState('')
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [productId, qty, dispatch])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
  }

  return (
    <div>
      <p className='text-center text-4xl font-bold my-2'>Shopping Cart</p>
      <hr className='mt-5' />
      {cartItems.length === 0 ? (
        <div className='min-h-screen'>
          <div class='alert alert-info shadow-lg  my-5'>
            <div>
              <i class='fa-solid text-white fa-circle-info'></i>
              <p className='text-white font-medium'>
                Your Cart Is Empty{' '}
                <span>
                  <Link to='/' className='underline'>
                    Go Back
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex justify-center my-6'>
          <div className='flex flex-col w-full p-8 text-gray-800 bg-white shadow-md pin-r pin-y md:w-4/5 lg:w-4/5'>
            <div className='flex-1'>
              <table className='w-full text-sm lg:text-base' cellspacing='0'>
                <thead>
                  <tr className='h-12 uppercase'>
                    <th className='hidden md:table-cell'></th>
                    <th className='text-left'>Product</th>
                    <th className='lg:text-right text-left pl-5 lg:pl-0'>
                      <span className='lg:hidden' title='Quantity'>
                        Qtd
                      </span>
                      <span className='hidden lg:inline'>Quantity</span>
                    </th>
                    <th className='text-right'>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((product) => (
                    <tr>
                      <td className='hidden pb-4 md:table-cell'>
                        <a href='#'>
                          <img
                            src={product.image}
                            className='w-20 rounded'
                            alt={product.name}
                          />
                        </a>
                      </td>
                      <td>
                        <Link to={`/product/${product.product}`}>
                          <p className='mb-2 md:ml-4'>{product.name}</p>
                        </Link>
                        <form>
                          <button
                            onClick={() =>
                              removeFromCartHandler(product.product)
                            }
                            className='btn btn-error btn-xs'
                          >
                            <i className='fas fa-trash text-white '></i>
                          </button>
                        </form>
                      </td>
                      <td className='justify-center md:justify-end md:flex mt-6'>
                        <div className='w-20 h-10'>
                          <div className='relative flex flex-row w-full h-8'>
                            <select
                              className='select select-primary w-full max-w-xs'
                              value={product.qty}
                              onChange={(e) =>
                                dispatch(
                                  addToCart(
                                    product.product,
                                    Number(e.target.value)
                                  )
                                )
                              }
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </td>
                      <td className='hidden text-right md:table-cell'>
                        <span className='text-sm lg:text-base font-medium'>
                          {product.price} $
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr className='pb-6 mt-6' />
              <div className='my-4 mt-6 -mx-2 lg:flex'>
                <div className='lg:px-2 lg:w-1/2'>
                  <div className='p-4'>
                    <p className='mb-4 italic'>
                      If you have some information for the seller you can leave
                      them in the box below
                    </p>
                    <textarea
                      className='w-full h-24 p-2 bg-gray-100 rounded'
                      value={mailText}
                      onChange={(e) => {
                        setMailText(e.target.value)
                      }}
                    ></textarea>
                    <button className='btn text-white text-center my-2 '>
                      <a href='mailto:sheliaakaki47@gmail.com' value={mailText}>
                        {' '}
                        send mail{' '}
                      </a>
                    </button>
                  </div>
                </div>
                <div className='lg:px-2 lg:w-1/2'>
                  <div className='p-4 bg-gray-100 rounded-full'>
                    <h1 className='ml-2 font-bold uppercase'>Order Details</h1>
                  </div>
                  <div className='p-4'>
                    <p className='mb-6 italic'>
                      Shipping and additionnal costs are calculated based on
                      values you have entered
                    </p>
                    <div className='flex justify-between border-b'>
                      <div className='lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800'>
                        Subtotal (
                        {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                        Items
                      </div>
                      <div className='lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900'>
                        ${' '}
                        {cartItems
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toFixed(2)}
                      </div>
                    </div>

                    <button
                      className='flex justify-center rou w-full px-10 py-3 mt-6 btn text-white'
                      disabled={cartItems.length === 0}
                      onClick={checkoutHandler}
                    >
                      <i className='fa-solid fa-credit-card my-1 '></i>
                      <span className='ml-2 mt-5px'>Procceed to checkout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
