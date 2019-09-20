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

  async componentDidMount() {
    //we are currently hard coding in the cartID for testing purposes
    await this.props.getCart(28)
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
            {cart.plants.map(orders =>
              orders.plants.map(plant => (
                <SingleCartItem key={plant.id} item={plant} />
              ))
            )}
            <button type="submit" onClick={this.checkOut}>
              Checkout
            </button>
          </div>
        ) : (
          <div className="cart-container">
            <h2>There are currently no items in the cart.</h2>
            <button type="submit" onClick={this.checkOut}>
              Checkout
            </button>
          </div>
        )}
        {this.state.checkOut ? (
          <div className="order-form">
            {' '}
            <OrderForm orderId={cart.orderId} />{' '}
          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})
const mapDispatchToProps = dispatch => ({
  getCart: id => dispatch(getCart(id))
  // checkoutThunk: () => dispatch(checkoutThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
