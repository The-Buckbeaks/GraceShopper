import React from 'react'
import {Link} from 'react-router-dom'

class SinglePlant extends React.Component {
  render() {
    const {name, description, price, imgUrl, id} = this.props.plant
    return (
      <div className="single-plant-container">
        <Link to={`/plants/${id}`}>
          <h1>Plant Name:{name}</h1>
        </Link>
        <h3>Description:{description}</h3>
        <h4>Price: $ {price / 100}</h4>
        <img src={imgUrl} alt={name} />
      </div>
    )
  }
}

export default SinglePlant
