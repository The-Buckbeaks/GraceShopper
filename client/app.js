import React, {Component} from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {createCartThunk} from '../client/store/cart'
import {connect} from 'react-redux'

class App extends Component {
  componentDidMount() {
    this.props.createCart()
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
  createCart: () => dispatch(createCartThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
