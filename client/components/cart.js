import React, {Component} from 'react'
import {connect} from 'react-redux'
import SingleCartItem from './SingleCartItem'
import {getCart, clearCart} from '../store/'
import OrderForm from './order-form'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkOut: false
    }
    this.checkOut = this.checkOut.bind(this)
  }

  componentDidUpdate() {
    this.props.getCart()
  }

  checkOut() {
    this.setState({
      checkOut: !this.state.checkOut
    })
  }

  render() {
    const cart = this.props.cart
    return (
      <div className="cart-container">
        <h1>Your Shopping Cart</h1>
        {cart.plants.length && cart.plants.length > 0 ? (
          <div className="cart-inner-container">
            <div className="cart-title" />

            {cart.plants.map(plant => (
              <SingleCartItem key={plant.id} plant={plant} />
            ))}
            <button
              type="submit"
              value="Submit"
              onClick={() => this.checkOut()}
            >
              Checkout
            </button>
            <button
              type="reset"
              value="reset"
              onClick={() => this.props.clearCart()}
            >
              Clear Cart
            </button>
            {this.state.checkOut ? (
              <OrderForm
                orderId={cart.orderId}
                userId={this.props.order.userId}
              />
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
  cart: state.cart,
  order: state.order
})
const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart()),
  clearCart: () => dispatch(clearCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
