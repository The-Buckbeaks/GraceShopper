import React from 'react'
import {Link} from 'react-router-dom'

const SingleCartItem = props => {
  const {plant} = props
  console.log('THIS IS PROPS IN SINGLE CART ITEM', props)
  return (
    <div>
      <div className="cart-item" key={plant.id}>
        <div id="cart-item-img">
          <img src={plant.imgUrl} alt={plant.name} />
        </div>
        <div id="cart-item-info">
          <h2>
            <Link to={`/plants/${plant.id}`}>{plant.name}</Link>
          </h2>
          {plant.orderQty ? (
            <div id="cart-info-wrap">
              <div id="cart-item-quantity">
                <h3>Quantity:</h3>
                {plant.orderQty}
              </div>
              <div id="cart-item-price">
                <h3>Cost:</h3>
                ${(plant.price / 100 * plant.orderQty).toFixed(2)} <p />
                <sub>
                  <i>(${(plant.price / 100).toFixed(2)} each)</i>
                </sub>
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
