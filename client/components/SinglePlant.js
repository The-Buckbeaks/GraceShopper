import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addItemThunk} from '../store'

class SinglePlant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      qty: 1
    }
    this.handleClick = this.handleClick.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  handleClick(event) {
    event.preventDefault()
    console.log('THIS IS STATE.QTY', this.state.qty)
    this.props.addItem(this.props.plant, this.state.qty)
  }
  onChange(event) {
    this.setState({
      qty: event.target.value
    })
  }
  render() {
    const {name, price, imgUrl, id} = this.props.plant
    return (
      <div className="single-plant-container">
        <div id="single-plant-info">
          <img src={imgUrl} alt={name} />
          <div id="single-plant-title">
            <Link to={`/plants/${id}`}>
              <h3 className="link">{name}</h3>
            </Link>
          </div>
          <h4>Price: $ {(price / 100).toFixed(2)}</h4>
          <div id="dropdown-menu">
            <b>Select Quantity: </b>
            <select
              id="select-quantity"
              onChange={this.onChange}
              value={this.state.qty}
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
  addItem: (plant, orderId, qty) => dispatch(addItemThunk(plant, orderId, qty))
})

export default connect(mapStateToProps, mapDispatchToProps)(SinglePlant)
