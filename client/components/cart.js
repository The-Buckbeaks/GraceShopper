import React, {Component} from 'react'
import {connect} from 'react-redux'
import SingleCartItem from './SingleCartItem'
import {checkoutThunk} from '../store/cart'
import OrderForm from './order-form'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkOut: false
    }

    this.checkOut = this.checkOut.bind(this)
  }

  checkOut() {
    this.setState({
      checkOut: !this.state.checkOut
    })
  }

  render() {
    const cart = this.props.cart
    return (
      <div>
        {cart.plants.length && cart.plants.length > 0 ? (
          <div className="cart-container">
            <div className="cart-title">
              <h1>Your Shopping Cart</h1>
            </div>

            {cart.plants.map(item => (
              <SingleCartItem key={item.id} item={item} />
            ))}
            <button
              type="submit"
              value="Submit"
              onClick={() => this.checkOut()}
            >
              Checkout
            </button>
            {this.state.checkOut ? (
              <OrderForm totalCost={totalCost} userId={userId} />
            ) : null}
          </div>
        ) : (
          <div className="cart-container">
            <h2>There are currently no items in the cart.</h2>
          </div>
        )}
        <div />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})
const mapDispatchToProps = dispatch => ({
  checkoutThunk: () => dispatch(checkoutThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
