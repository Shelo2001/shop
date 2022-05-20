import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'

const Home = () => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, products, error } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch, listProducts])

  return (
    <>
      <h1 className='text-center text-4xl font-semibold py-6'>
        Latest Products
      </h1>
      {loading ? (
        <h1 className='text-center text-4xl font-semibold py-6'>Loading...</h1>
      ) : error ? (
        <h3> {error}</h3>
      ) : (
        <div className=' flex flex-row  flex-wrap mx-3	'>
          {products.map((product) => (
            <Product product={product} />
          ))}
        </div>
      )}
    </>
  )
}

export default Home
