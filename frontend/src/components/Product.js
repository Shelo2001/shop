import React from 'react'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <div class=' card my-5 mx-5 w-96 bg-base-100 shadow-xl '>
      <figure>
        <img src={product.image} alt='Shoes' />
      </figure>
      <div class='card-body'>
        <h2 class='card-title'>{product.name}</h2>
        <Rating
          value={product.rating}
          text={`${product.numReviews} reviews`}
          color='#0AA1DD'
        />
        <div class='font-semibold text-xl justify-start'>$ {product.price}</div>
        <div class='card-actions justify-end'>
          <Link to={`/product/${product._id}`}>
            <button class='btn btn-primary text-white '>View Details</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Product
