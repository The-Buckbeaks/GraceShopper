import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addItemThunk} from '../store'

class SinglePlant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
    this.handleClick = this.handleClick.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  handleClick(event) {
    event.preventDefault()
    console.log('THIS IS STATE.QUANTITY', this.state.quantity)
    this.props.addItem(
      this.props.plant,
      this.props.cart.orderId,
      this.state.quantity
    )
  }
  onChange(event) {
    this.setState({
      quantity: event.target.value
    })
  }
  render() {
    const {name, price, imgUrl, id} = this.props.plant
    return (
      <div className="single-plant-container">
        <div id="single-plant-title">
          <Link to={`/plants/${id}`}>
            <h2 className="link">{name}</h2>
          </Link>
        </div>
        <div id="single-plant-info">
          <img src={imgUrl} alt={name} />
          <h4>Price: $ {(price / 100).toFixed(2)}</h4>
          <div id="dropdown-menu">
            <b>Select Quantity: </b>
            <select
              id="select-quantity"
              onChange={this.onChange}
              value={this.state.quantity}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <button
            type="submit"
            onClick={this.handleClick}
            className="add-to-cart-button"
          >
            Add to Cart
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})
const mapDispatchToProps = dispatch => ({
  addItem: (plant, orderId) => dispatch(addItemThunk(plant, orderId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SinglePlant)
