import React from 'react'
import {connect} from 'react-redux'
class confirmationForm extends React.Component {
  render() {
    return (
      <div>
        <h1> Thank you for choosing The Octopus's Gardern!</h1>
        <h3>WE'VE GOT YOUR ORDER,{this.props.user.id} .</h3>
        <br />
        <h2>Shopping Summary</h2>
        <h3>Order Confirmation Number: {this.props.order.id}</h3>
        <h3>Shipping Method: {this.props.order.shippingMethod}</h3>
        <h3>Shipping to :</h3>
        <h4>{this.props.order.address}</h4>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  order: state.order,
  user: state.user
})
export default connect(mapStateToProps)(confirmationForm)
