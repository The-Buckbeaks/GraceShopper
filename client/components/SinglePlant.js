import React from 'react'
import {Link} from 'react-router-dom'

class SinglePlant extends React.Component {
  handleSubmit(event) {
    try {
      event.preventDefault()
      // this.props.addItem(this.props.plant)
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    const {name, description, price, imgUrl, id} = this.props.plant
    return (
      <div className="single-plant-container">
        <Link to={`/plants/${id}`}>
          <h1>Plant Name: {name}</h1>
        </Link>
        <h3>Description: {description}</h3>
        <button type="submit" onSubmit={this.handleSubmit}>
          Add to Cart
        </button>
        <h4>Price: $ {price / 100}</h4>
        <img src={imgUrl} alt={name} />
      </div>
    )
  }
}

export default SinglePlant
