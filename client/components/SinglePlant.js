import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addItemThunk} from '../store'

class SinglePlant extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(event) {
    try {
      event.preventDefault()
      this.props.addItem(this.props.plant, this.props.cart.orderId)
    } catch (error) {
      console.log(error)
    }
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
