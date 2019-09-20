import React, {Component} from 'react'
import {connect} from 'react-redux'
import SingleCartItem from './SingleCartItem'
import {getCart, checkoutThunk} from '../store/cart'
import OrderForm from './order-form'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkOut: false
    }

    this.checkOut = this.checkOut.bind(this)
  }

  componentDidMount() {
    //we are currently hard coding in the cartID for testing purposes
    this.props.getCart(this.props.cart.orderId)
  }

  checkOut() {
    this.setState({
      checkOut: !this.state.checkOut
    })
  }

  render() {
    //the button at the bottom of the page needs to redirect to the checkout form, rather than handleSubmit
    const cart = this.props.cart
    return (
      <div className="cart-container">
        <h1>Your Shopping Cart</h1>
        {cart.plants.length && cart.plants.length > 0 ? (
          <div className="cart-container">
            <div className="cart-title">
              <h1>Your Shopping Cart</h1>
            </div>

            {cart.plants.map(plant => (
              <SingleCartItem
                key={plant.id}
                item={plant}
                plantOrder={plant.plantOrder}
              />
            ))}
            <button
              type="submit"
              value="Submit"
              onClick={() => this.checkOut()}
            >
              Checkout
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
  getCart: id => dispatch(getCart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
