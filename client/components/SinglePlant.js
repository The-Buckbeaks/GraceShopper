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
      console.log(
        'HANDLE CLICK IS CALLED with',
        this.props.plant,
        this.props.cart.orderId
      )
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    const {name, description, price, imgUrl, id} = this.props.plant
    return (
      <div className="single-plant-container">
        <Link to={`/plants/${id}`}>
          <h2 className="link">{name}</h2>
        </Link>
        <button type="submit" onClick={this.handleClick}>
          Add to Cart
        </button>
        <h4>Price: $ {price / 100}</h4>
        <img src={imgUrl} alt={name} />
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
