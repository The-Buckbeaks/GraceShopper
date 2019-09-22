import React from 'react'

class confirmationForm extends React.Component {
  const
  render() {
    return (
      <div>
        <h1> Thank you for choosing The Octopus's Gardern!</h1>
        <h3>WE'VE GOT YOUR ORDER,{this.props.userId} .</h3>
        <br />
        <h2>Shopping Summary</h2>
        <h3>Shipping Method:{this.props.shippingMethod}</h3>
        <h3>Shipping to :</h3>
        <h4>{this.props.address}</h4>
      </div>
    )
  }
}
export default confirmationForm
