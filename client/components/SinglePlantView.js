import React from 'react'
import {connect} from 'react-redux'
import {getSinglePlant} from '../store'

class SinglePlantView extends React.Component {
  componentDidMount() {
    const id = Number(this.props.match.params.id)
    this.props.getSinglePlant(id)
  }
  render() {
    const {plant} = this.props
    return (
      <div className="single-plant-container">
        {plant ? (
          <div>
            <h3>Plant name: {plant.name}</h3>
            <h3>Description:{plant.description}</h3>
            <h4>Price: ${plant.price / 100}</h4>
            <img src={plant.imgUrl} alt={plant.name} />
          </div>
        ) : (
          <h1>Can't find the plant!</h1>
        )}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  plant: state.plants.plant
})
const mapDispatchToProps = dispatch => ({
  getSinglePlant: id => dispatch(getSinglePlant(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SinglePlantView)
