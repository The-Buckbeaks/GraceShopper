import React from 'react'
import {connect} from 'react-redux'
import {getSinglePlant} from '../store/plantsReducer'

class SinglePlant extends React.Component {
  componentDidMount() {
    const id = Number(this.props.match.params.id)
    this.props.getSinglePlant(id)
  }

  render() {
    return (
      <div className="singlePlant">
        <h1>Plant Name:{this.props.plant.name}</h1>
        <h3>Descripiton:{this.props.plant.description}</h3>
        <h4>price:{this.props.plant.price}</h4>
        <img src={this.props.plant.imageUrl} alt="image not working" />
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
