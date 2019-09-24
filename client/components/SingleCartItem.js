import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {removeItemThunk, editItem} from '../store'

class SingleCartItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderQty: this.props.orderQty
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleClick(event) {
    event.preventDefault()
    this.props.removeItemThunk(this.props.plant)
  }
  handleChange(event) {
    const newQty = Number(event.target.value)
    this.setState({
      orderQty: newQty
    })
    this.props.editItem(this.props.plant, event.target.value)
  }
  render() {
    const {plant} = this.props
    console.log('RENDER', plant)
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
                  <select
                    value={this.state.qty}
                    onChange={this.handleChange}
                    defaultValue={plant.orderQty}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
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
  removeItemThunk: plant => dispatch(removeItemThunk(plant)),
  editItem: (plant, qty) => dispatch(editItem(plant, qty))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleCartItem)
