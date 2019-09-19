import React, {Component} from 'react'
import {connect} from 'react-redux'
import SingleCartItem from './SingleCartItem'
import {getCart, checkoutThunk} from '../store/cart'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    const cartItems = await this.props.getCart(2)
    console.log(cartItems)
    //await console.log('From componentDidMount', this.props.cart)
  }

  handleClick() {
    this.props.checkoutThunk()
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
            <button type="submit" value="Submit" onClick={this.handleClick}>
              Checkout
            </button>
          </div>
        ) : (
          <div className="cart-container">
            <h2>There are currently no items in the cart.</h2>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})
const mapDispatchToProps = dispatch => ({
  getCart: id => dispatch(getCart(id)),
  checkoutThunk: () => dispatch(checkoutThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
