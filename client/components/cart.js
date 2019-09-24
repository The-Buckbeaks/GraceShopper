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
    this.totalCost = this.totalCost.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
  }

  checkOut() {
    this.setState({
      checkOut: !this.state.checkOut
    })
  }
  totalCost() {
    return this.props.cart.plants.reduce((acc, curr) => {
      acc += curr.orderQty * (curr.price / 100).toFixed(2)
      return acc
    }, 0)
  }
  render() {
    const cart = this.props.cart
    const totalCost = this.totalCost()
    return (
      <div className="cart-container">
        <h1>Your Shopping Cart</h1>
        {cart.plants.length && cart.plants.length > 0 ? (
          <div className="cart-inner-container">
            <div className="cart-title" />

            {cart.plants.map(plant => (
              <SingleCartItem key={plant.id} plant={plant} />
            ))}
            <div className="total-cost">
              Total Cost: ${this.totalCost().toFixed(2)}
            </div>
            <button
              className="add-to-cart-button"
              type="submit"
              value="Submit"
              onClick={() => this.checkOut()}
            >
              Checkout
            </button>
            <button
              className="add-to-cart-button"
              type="reset"
              value="reset"
              onClick={() => this.props.clearCart()}
            >
              Clear Cart
            </button>

            {this.state.checkOut ? (
              <OrderForm totalCost={totalCost * 100} />
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
  getCart: () => dispatch(getCart()),
  clearCart: () => dispatch(clearCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
