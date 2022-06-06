import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../navBar/NavBar.css'

export default function () {

  const [isHidden, setIsHidden] = useState(true);

  let Links = [
    {
      label: 'Home',
      target: '/'
    }, {
      label: 'Kayaks',
      target: '/api/products/category/kayaks'
    }, {
      label: 'Paddles',
      target: '/api/products/category/paddles'
    }, {
      label: 'PFDs',
      target: '/api/products/category/PFDs'
    }, {
      label: 'Water Shoes',
      target: '/api/products/category/shoes'
    }
  ];

  function handleBurgerClicked() {
    setIsHidden(!isHidden);
    console.log("burger clicked");
  }

  return (
    <nav className={`${isHidden ? 'hidden' : ''}`}>
      <div>
        <span id="burger" onClick={handleBurgerClicked}>
          &#9776;
        </span>

        <div className="dropDown-container">
          <div className="hidden-menu">
          </div>
        </div>

        {Links.map((link, i) => (
          <Link
            to={link.target}>{link.label}
          </Link>
        ))}
      </div>

      <div>
        <Link to="/api/users/login">
          Log In
        </Link>
        <Link to="/api/users">
          Sign Up
        </Link>
      </div>
    </nav>
  )
}
