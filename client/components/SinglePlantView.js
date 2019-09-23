import React from 'react'
import {connect} from 'react-redux'
import {getSinglePlant, addItemThunk} from '../store'

class SinglePlantView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderQty: 1
    }
    this.handleClick = this.handleClick.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  handleClick(event) {
    event.preventDefault()
    const id = Number(this.props.match.params.id)
    const qty = Number(this.state.orderQty)
    this.props.addItem(this.props.plants.plant, qty)
  }
  onChange(event) {
    this.setState({
      orderQty: event.target.value
    })
  }
  componentDidMount() {
    const id = Number(this.props.match.params.id)
    this.props.getSinglePlant(id)
  }
  render() {
    const {plant} = this.props.plants
    return (
      <div className="single-plant-container">
        {plant ? (
          <div>
            <h3>Plant name: {plant.name}</h3>
            <h3>Description:{plant.description}</h3>
            <h4>Price: ${plant.price / 100}</h4>
            <img src={plant.imgUrl} alt={plant.name} />
            <div id="single-plant-info">
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
        ) : (
          <h1>Can't find the plant!</h1>
        )}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  cart: state.cart,
  plants: state.plants
})
const mapDispatchToProps = dispatch => ({
  addItem: (plant, qty) => dispatch(addItemThunk(plant, qty)),
  getSinglePlant: id => dispatch(getSinglePlant(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SinglePlantView)
