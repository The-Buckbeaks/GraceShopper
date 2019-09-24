import React from 'react'
import {Link} from 'react-router-dom'
const Splash = () => {
  return (
    <div className="splash">
      <div className="splash-left">
        <img
          src="https://images-na.ssl-images-amazon.com/images/I/81d8FU3qnfL._SL1500_.jpg"
          id="tentacles"
        />
      </div>
      <div className="splash-right">
        <div id="splash-shop" className="grow">
          <h2>
            <Link to="/shop">Shop our aquatic plants</Link>
          </h2>
        </div>
        <div id="splash-login" className="grow">
          <h2>
            <Link to="/login">
              Returning? <br />Log in here
            </Link>
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Splash
