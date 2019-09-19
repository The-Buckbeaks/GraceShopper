import React from 'react'
import {connect} from 'react-redux'
import {checkoutThunk} from '../store'

class OrderForm extends React.Component {
  constructor() {
    super()
    this.state = {
      address: '',
      shippingMethod: '',
      gift: false,
      totalCost: 0,
      checkedOut: false,
      userId: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    try {
      event.preventDefault()
      this.props.checkedOut(this.state)
      alert(`Your order has been successfully submitted.`)
      this.setState({
        address: '',
        shippingMethod: '',
        gift: false,
        totalCost: 0,
        checkedOut: false,
        userId: null
      })
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <div className="order">
        <h2>Order Checkout</h2>
        <form className="order-form" onSubmit={this.handleSubmit}>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            onChange={this.handleChange}
            value={this.state.address}
          />

          <label htmlFor="shippingMethod">Select Shipping Method:</label>
          <input
            type="text"
            name="shippingMethod"
            onChange={this.handleChange}
            value={this.state.shippingMethod}
          />

          <label htmlFor="gift">Is This a Gift?</label>
          <input
            type="text"
            name="gift"
            onChange={this.handleChange}
            value={this.state.gift}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  checkedOut: cart => dispatch(checkoutThunk(cart))
})
const mapStateToProps = state => ({
  order: state.order
})
export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)
