import React from 'react'
import {Link} from 'react-router-dom'
const Splash = () => {
  return (
    <div id="splash">
      <Link to="/shop">Shop</Link>
      <Link to="/login">Returning? Login Here</Link>
    </div>
  )
}

export default Splash
