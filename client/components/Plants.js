//Plants component

import React from 'react'
import {connect} from 'react-redux'
//also need to import thunk from reducer

class Plants extends React.Component {
  componentDidMount() {
    //need the thunk
    //ie. this.props.getAllPlants()
  }
  render() {
    return (
      <div>
        <h1 cla1="allPlants">All the Plants</h1>
        <div className="Plants-Lists">
          {this.props.plants.map(plant => (
            <div className="single-plant" key={plant.id}>
              <ul>
                <h1> Plant Name:{plant.name}</h1>
                <h3>Description:{plant.descripiton}</h3>
                <h4> Price:{plant.price}</h4>
                <img src={plant.imageUrl} alt="No Image" />
              </ul>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  plants: state.plants
})
const mapDispatchToProps = dispatch => ({
  //getAllplants: ()=>dispatch (getAllplants())
})

export default connect(mapStateToProps, mapDispatchToProps)(Plants)
