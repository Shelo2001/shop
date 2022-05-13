import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import axios from 'axios'

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <>
      <h1 className='text-center text-4xl font-semibold py-6'>
        Latest Products
      </h1>
      <div className=' flex flex-row  flex-wrap mx-3	'>
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </>
  )
}

export default Home
