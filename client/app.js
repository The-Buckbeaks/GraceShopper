import React, {Component} from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {getCart} from '../client/store/cart'
import {connect} from 'react-redux'

class App extends Component {
  componentDidMount() {
    this.props.getCart()
  }
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
