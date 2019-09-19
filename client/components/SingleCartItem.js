import React from 'react'
import {Link} from 'react-router-dom'

const SingleCartItem = props => {
  const {item} = props
  return (
    <li className="cart-item" key={item.id}>
      <div className="cart-image">
        <img src={item.imgUrl} alt={item.name} />
        <br />
        <h2>
          <Link to={`/plants/${item.id}`}>{item.name}</Link>
        </h2>
        <p>
          <b>Quantity:</b>
          {item.quantity}
        </p>
        <p>
          <b>Price:</b>
          {item.price}
        </p>
      </div>
    </li>
  )
}
export default SingleCartItem
