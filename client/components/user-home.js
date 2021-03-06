import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getOrderHistory} from '../store'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.orderHistory()
  }

  render() {
    const {email} = this.props.user
    // const {orderHistory} = this.props.orders
    return (
      <div className="profile-container">
        <div className="user-greeting">
          <h3>Welcome back, {email}!</h3>
        </div>
        <div className="order-container">
          <h2>Here is your order history:</h2>
          {this.props.orders.orderHistory ? (
            this.props.orders.orderHistory.length ? (
              this.props.orders.orderHistory.map(order => {
                return (
                  <div className="order-item" key={order.id}>
                    <h3>Order ID: </h3>
                    <p>🐙 {order.id}</p>
                    <h3>Shipped To: </h3>
                    <p>🏡 {order.address}</p>
                    <h3>Delivery Method: </h3>
                    <p>📬 {order.shippingMethod}</p>
                    <h3>Was it a gift? </h3>
                    <p>🎁 {order.gift}</p>
                    <h3>Your Plants:</h3>
                    {order.plants.map(plant => {
                      return (
                        <p key={plant.id}>
                          🌱 {plant.name} <br /> Quantity:
                          {plant.plantOrder.quantity}
                        </p>
                      )
                    })}
                  </div>
                )
              })
            ) : (
              <div>No items here!</div>
            )
          ) : (
            <div>Your orders are loading!</div>
          )}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  user: state.user,
  orders: state.order
})
const mapDispatch = dispatch => ({
  orderHistory: () => dispatch(getOrderHistory())
})
export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
