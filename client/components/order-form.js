import React from 'react'
import {connect} from 'react-redux'
import {checkoutThunk} from '../store'
import {Redirect} from 'react-router-dom'

class OrderForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      shippingMethod: 'Standard Ground',
      gift: 'no',
      totalCost: Math.floor(this.props.totalCost),
      userId: this.props.user.id || null,
      submitted: false
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
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.checkedOut(this.state)
    this.setState({
      address: '',
      shippingMethod: '',
      gift: 'no',
      totalCost: this.props.totalCost,
      userId: this.props.user.id || null,
      submitted: true
    })
  }

  render() {
    if (this.state.submitted) {
      return (
        <Redirect
          to={{
            pathname: '/confirmation'
          }}
        />
      )
    }
    console.log(this.state.totalCost)
    return (
      <div className="order">
        <h5>Order Checkout</h5>
        <form className="order-form" onSubmit={this.handleSubmit}>
          <div className="radio">
            <label htmlFor="address" className="label-heading">
              Address:
            </label>
            <input
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
              className="text-input"
            />
          </div>
          <div className="radio">
            <label htmlFor="shippingMethod" className="label-heading">
              Select Shipping Method:
            </label>

            <label htmlFor="shipping">
              Standard Ground
              <input
                type="radio"
                name="shippingMethod"
                value="Standard Ground"
                checked={this.state.shippingMethod === 'Standard Ground'}
                onChange={this.handleSelect}
              />
            </label>
            <label htmlFor="shipping">
              1-Day
              <input
                type="radio"
                name="shippingMethod"
                value="1-Day"
                checked={this.state.shippingMethod === '1-Day'}
                onChange={this.handleSelect}
              />
            </label>
          </div>
          <div className="radio">
            <label htmlFor="gift" className="label-heading">
              Is This a Gift?
            </label>

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
          </div>
          <div className="cart-footer">
            <button className="add-to-cart-button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  checkedOut: orderInfo => dispatch(checkoutThunk(orderInfo))
})
const mapStateToProps = state => ({
  order: state.order,
  user: state.user
})
export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)
