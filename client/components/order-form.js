import React from 'react'
import {connect} from 'react-redux'
import {checkoutThunk} from '../store'

class OrderForm extends React.Component {
  constructor() {
    super()
    this.state = {
      address: '',
      shippingMethod: '',
      gift: 'no',
      totalCost: 0,
      checkedOut: false,
      userId: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSelect(event) {
    console.log(event.target.value)
    this.setState({
      gift: event.target.value
    })
    console.log(this.state.gift)
  }
  handleSubmit(event) {
    try {
      event.preventDefault()
      this.props.checkedOut(this.state)
      alert(`Your order has been successfully submitted.`)
      this.setState({
        address: '',
        shippingMethod: '',
        gift: 'no',
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
          Is This a Gift?
          <label htmlFor="gift">
            Yes
            <input
              type="radio"
              name="gift"
              value="yes"
              checked={this.state.gift === 'yes'}
              onChange={this.handleSelect}
            />
          </label>
          <label htmlFor="gift">
            No
            <input
              type="radio"
              name="gift"
              value="no"
              checked={this.state.gift === 'no'}
              onChange={this.handleSelect}
            />
          </label>
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
