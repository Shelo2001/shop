import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import axios from 'axios'

const ProductDetails = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState({})
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${params.id}`)
      setProduct(data)
    }
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products')
      setProducts(data)
    }

    fetchProduct()
    fetchProducts()
  }, [])

  return (
    <div>
      <Link to='/' className='p-72 '>
        <button className='btn btn-primary mt-6 rounded text-white'>
          Go Back
        </button>
      </Link>

      <div class='container px-5 py-10 mx-auto'>
        <div class='lg:w-5/6 min-h-[40%] mx-auto flex flex-wrap'>
          <img
            alt='ecommerce'
            class='lg:w-1/2 min-h-[40%] w-full object-cover object-center rounded-lg border border-gray-200'
            src={product.image}
          />
          <div class='lg:w-1/4 min-h-[40%] w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
            <h1 class='text-gray-900 text-3xl title-font font-medium mb-1'>
              {product.name}
            </h1>

            <hr className='my-2'></hr>
            <p class='leading-relaxed'>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color='#0AA1DD'
              />
            </p>
            <hr className='my-2'></hr>

            <p class='leading-relaxed'>{product.description}</p>
            <div class='flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5'></div>
            <div class='flex'>
              <p class='title-font font-medium text-2xl text-gray-900'>
                $ {product.price}
              </p>
            </div>
          </div>

          <div class='lg:w-1/4 min-h-[40%] w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
            <div className='border-2 rounded-lg'>
              <p className='mx-2 leading-relaxed my-2 text-md font-medium text-gray-900'>
                Price: ${product.price}
              </p>
              <hr></hr>
              <p className='leading-relaxed mx-2  my-2 text-md font-medium text-gray-900'>
                Status:{' '}
                {product.countInStock > 0 ? 'In Stock' : ' Out Of Stock'}
              </p>
              <hr></hr>
              <button
                className={
                  product.countInStock === 0
                    ? 'btn btn-disabled leading-relaxed w-[94%]  mx-2 my-2 text-md font-medium  rounded-none'
                    : 'btn leading-relaxed w-[94%]  mx-2 my-2 text-md font-medium  rounded-none'
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <h1 className='text-center text-4xl  font-semibold py-6'>Explore More</h1>
      <div class='flex flex-col my-10 w-5/6 mx-auto lg:flex-row'>
        {products.slice(0, 3).map((product) => (
          <div class='grid flex-grow min-h-32 mb-2 bg-white card rounded-box place-items-center'>
            <div class='card w-96 bg-base-100 shadow-xl'>
              <figure>
                <img src={product.image} alt='Shoes' />
              </figure>
              <div class='card-body'>
                <h2 class='card-title'>
                  {product.name}
                  <div class='badge badge-primary'>NEW</div>
                </h2>
                <p className='font-semibold text-lg'>$ {product.price}</p>
                <button className='btn btn-primary my-1 text-white'>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductDetails
