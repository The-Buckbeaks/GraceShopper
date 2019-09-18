import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Cart extends Component {
  //create an order
  render() {
    return this.props.cart.quantity && this.props.cart.quantity > 0 ? (
      <div className="cart-container">
        <div className="cart-title">
          <h1>Your Shopping Cart</h1>
        </div>
        {this.props.cart.items.map(item => {
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
        })}
      </div>
    ) : (
      <div className="cart-container">
        <h2>There are currently no items in the cart.</h2>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(mapStateToProps)(Cart)
