import React from 'react'
import {Link} from 'react-router-dom'

const SingleCartItem = props => {
  const {item, plantOrder} = props
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
          {plantOrder ? (
            <div id="cart-info-wrapp">
              <div id="cart-item-quantity">
                <h3>Quantity:</h3>
                {plantOrder.quantity}
              </div>
              <div id="cart-item-price">
                <h3>Price:</h3>
                ${(plantOrder.price / 100 * plantOrder.quantity).toFixed(2)}
              </div>
            </div>
          ) : (
            'Ooops, how many plants did you want?'
          )}
        </div>
      </div>
    </div>
  )
}
export default SingleCartItem
