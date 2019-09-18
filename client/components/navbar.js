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
          <h1 id="title">The Octopus' Garden</h1>
          <Link className="link" to="/home">
            Home
          </Link>
          <Link className="link" to="/cart">
            Cart
          </Link>
          <Link className="link" to="/shop">
            Shop
          </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="nav">
          {/* The navbar will show these links before you log in */}
          <h1 id="title">The Octopus' Garden</h1>
          <Link className="link" to="/login">
            Login
          </Link>
          <Link className="link" to="/signup">
            Sign Up
          </Link>
          <Link className="link" to="/cart">
            Cart
          </Link>
          <Link className="link" to="/shop">
            Shop
          </Link>
        </div>
      )}
    </nav>
    <hr />
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
