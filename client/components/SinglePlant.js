import React from 'react'
import {connect} from 'react-redux'
import {getSinglePlant} from '../store/plants'

class SinglePlant extends React.Component {
  componentDidMount() {
    const id = Number(this.props.match.params.id)
    this.props.getSinglePlant(id)
  }

  render() {
    const {plant} = this.props.plant
    return (
      <div className="single-plant-container">
        <h1>Plant Name:{plant.name}</h1>
        <h3>Description:{plant.description}</h3>
        <h4>Price:{plant.price}</h4>
        <img src={plant.imgUrl} alt={plant.name} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  plant: state.plant
})
const mapDispatchToProps = dispatch => ({
  getSinglePlant: id => dispatch(getSinglePlant(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SinglePlant)
