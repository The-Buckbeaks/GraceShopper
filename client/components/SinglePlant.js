import React from 'react'
import {connect} from 'react-redux'
import {getSinglePlant} from '../store/plants'
import {Link} from 'react-router-dom'

class SinglePlant extends React.Component {
  // componentDidMount() {
  //   const id = Number(this.props.match.params.id)
  //   this.props.getSinglePlant(id)
  // }

  render() {
    const {name, description, price, imgUrl} = this.props.plant
    return (
      <div className="single-plant-container">
        <Link to={`/plants/${name}`}>
          <h1>Plant Name:{name}</h1>
        </Link>
        <h3>Description:{description}</h3>
        <h4>Price:{price}</h4>
        <img src={imgUrl} alt={name} />
      </div>
    )
  }
}

// const mapStateToProps = state => ({
//   plant: state.plant
// })
// const mapDispatchToProps = dispatch => ({
//   getSinglePlant: id => dispatch(getSinglePlant(id))
// })

// export default connect(mapStateToProps, mapDispatchToProps)(SinglePlant)
export default SinglePlant
