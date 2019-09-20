import React from 'react'
import {Link} from 'react-router-dom'

const SingleCartItem = props => {
  // console.log('FROM SINGLE CART ITEM', props)
  console.log(props.plantOrder)
  const {plant, plantOrder} = props

  return (
    <li className="cart-item" key={plant.id}>
      <div className="cart-image">
        <img src={plant.imgUrl} alt={plant.name} />
        <br />
        <h2>
          <Link to={`/plants/${plant.id}`}>{plant.name}</Link>
        </h2>
        <p>
          <b>Quantity:</b>
          {plantOrder
            ? plantOrder.quantity
            : 'Ooops, how many plants did you want?'}
        </p>
        <p>
          <b>Price:</b>
          {plant.price}
        </p>
      </div>
    </li>
  )
}
export default SingleCartItem
