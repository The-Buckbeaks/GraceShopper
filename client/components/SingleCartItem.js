import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {removeItemThunk} from '../store'

class SingleCartItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(event) {
    event.preventDefault()
    console.log('HANDLE CLICK WAS CALLED', this.props.plant)
    this.props.removeItemThunk(this.props.plant)
  }
  render() {
    const {plant} = this.props
    return (
      <div>
        <div className="cart-item" key={plant.id}>
          <div id="cart-item-img">
            <img src={plant.imgUrl} alt={plant.name} />
          </div>
          <div id="cart-item-info">
            <h2>
              <Link to={`/plants/${plant.id}`}>{plant.name}</Link>
            </h2>
            {plant.orderQty ? (
              <div id="cart-info-wrap">
                <div id="cart-item-quantity">
                  <h3>Quantity:</h3>
                  {plant.orderQty}
                </div>
                <div id="cart-item-price">
                  <h3>Cost:</h3>
                  ${(plant.price / 100 * plant.orderQty).toFixed(2)} <p />
                  <sub>
                    <i>(${(plant.price / 100).toFixed(2)} each)</i>
                  </sub>
                  <button type="button" onClick={this.handleClick}>
                    Remove Item
                  </button>
                </div>
              </div>
            ) : (
              'Ooops, how many plants did you want?'
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  plants: state.plants
})
const mapDispatchToProps = dispatch => ({
  removeItemThunk: plant => dispatch(removeItemThunk(plant))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleCartItem)
