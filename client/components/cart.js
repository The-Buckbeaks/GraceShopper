import React, {Component} from 'react'
import {connect} from 'react-redux'
import SingleCartItem from './SingleCartItem'
import {checkoutThunk} from '../store/cart'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.checkoutThunk()
  }

  render() {
    return (
      <div>
        this.props.cart.quantity && this.props.cart.quantity > 0 ? (
        <div className="cart-container">
          <div className="cart-title">
            <h1>Your Shopping Cart</h1>
          </div>
          {this.props.cart.items.map(item => (
            <SingleCartItem key={item.id} item={item} />
          ))}
          <button type="submit" value="Submit" onClick={this.handleClick} />
        </div>
        ) : (
        <div className="cart-container">
          <h2>There are currently no items in the cart.</h2>
        </div>
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
