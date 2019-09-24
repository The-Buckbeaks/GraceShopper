import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div className="nav">
          {/* The navbar will show these links after you log in */}
          <div id="nav-title">
            <Link className="title" id="title" to="/">
              The Octopus's Garden
            </Link>
          </div>
          <div id="nav-links">
            <Link className="grow" to="/home">
              Home
            </Link>
            <Link className="grow" to="/shop">
              Shop
            </Link>
            <Link className="grow" to="/cart">
              Cart
            </Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div className="nav">
          {/* The navbar will show these links before you log in */}
          <div id="nav-title">
            <h1 id="title">The Octopus' Garden</h1>
          </div>
          <div id="nav-links">
            <Link className="grow" to="/login">
              Login
            </Link>
            <Link className="grow" to="/signup">
              Sign Up
            </Link>
            <Link className="grow" to="/shop">
              Shop
            </Link>
            <Link className="grow" to="/cart">
              Cart
            </Link>
          </div>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
