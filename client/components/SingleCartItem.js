import React from 'react'
import {Link} from 'react-router-dom'

const SingleCartItem = props => {
  console.log('FROM SINGLE CART ITEM', props)
  const {item} = props
  return (
    <div>
      <div className="cart-item" key={item.id}>
        <div id="cart-item-img">
          <img src={item.imgUrl} alt={item.name} />
        </div>
        <div id="cart-item-info">
          <h2>
            <Link to={`/plants/${item.id}`}> {item.name}</Link>
          </h2>
          <div id="cart-item-quantity">
            <h3>Quantity:</h3>
            {item.quantity}
          </div>
          <div id="cart-item-price">
            <h3>Price:</h3>
            ${(item.price / 100 * item.quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  )
}
export default SingleCartItem
