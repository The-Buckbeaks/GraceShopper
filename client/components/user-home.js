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
    console.log('order', this.props.orders)
    return (
      <div className="profile-container">
        <div className="user-greeting">
          <h3>Welcome back, {email}!</h3>
        </div>
        <div className="order-container">
          <h2>Here is your order history:</h2>
          {this.props.orders.length > 0
            ? this.props.orders.map(order => {
                return (
                  <div className="order-item" key={order.id}>
                    <h2>{order.address}</h2>
                    <h2>gift? {order.gift}</h2>
                    {order.plants.map(plant => {
                      return <h4 key={plant.id}>{plant.name}</h4>
                    })}
                  </div>
                )
              })
            : 'no orders here!'}
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
