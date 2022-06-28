import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShoppingCart, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import '../navBar/NavBar.css'
import BurgerMenu from './BurgerMenu';
import { useLocalStorage } from '../../services/localStorage.service';
import { Context } from '../../App';
import FloatNPaddleLogo from '/Users/tommyzwick/GIT/JRS-Final-Project/kayak-app/src/images/FloatNPaddleLogo.png';

export default function () {

  const { cart, addItem, decreaseQty, increaseQty, removeItem, clearCart } = useContext(Context)
  const navigate = useNavigate();
  const ls = useLocalStorage();
  const user = ls.getUser();
  const [isHidden, setIsHidden] = useState(true);
  const [width, setWidth] = useState(window.innerWidth)
  const location = useLocation();


  /**
   * userBtn contains the html for 
   * the User Icon and functionality
   * when user is logged in
   */
  const userBtn = (
    <div className="user-logged-in user-hoverable-container">
      <Link to="/purchases" >
        <FontAwesomeIcon size="lg" icon={faUser} />
      </Link>

      <div className="hidden-menu-user">
        <div className="option-one">
          <Link to={`${user ? '/purchases' : '/login'}`}>
            Purchases
          </Link>
        </div>

        <div className="option-two" onClick={() => {
          ls.removeUser()
        }}>
          <Link to="/products">
            Log out
          </Link>
        </div>

      </div>
    </div>
  )

  /**
   * loginSignupBtn contains the user icon and 
   * functionality when user is not logged in
   */
  const loginSignupBtn = (
    <div className="login-signup">
      <Link to="/login" >
        <FontAwesomeIcon size="lg" icon={faUser} />
      </Link>
    </div>
  )

  /**
   * cartSum is needed to calculate the quantity
   * of items within the local storage shopping cart 
   * within the totalCartQty below
   */
  var cartSum = 0;
  /**
   * 
   * @param {number} cartSum 
   * @returns quantity of items in local cart
   */
  function totalCartQty(cartSum) {

    for (let item of cart) {
      cartSum += item.quantity

    }
    if (cartSum > 99) {
      return "99+"
    } else {
      return cartSum;
    }
  }


  /**
   * Checks the local cart qty and 
   * window size on initialization.
   * Re-renders page and checks same values,
   * everytime the window size updates, 
   * the local cart or its qty updates,
   * or the location of the route
   */
  useEffect(() => {

    totalCartQty(cartSum)
    setIsHidden(true);

    function handleResize() {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }

  }, [location, cart, cartSum])

  return (
    <nav className="navBar-root">

      {true && width <= 970 ? (
        <>
          {!isHidden && <BurgerMenu />}
          <div className="burger-icon">
            <span
              className={`${isHidden ? 'hidden' : ''} burger`}
              id="burger" onClick={() => setIsHidden(!isHidden)}>
              {isHidden ?
                <FontAwesomeIcon size="lg" icon={faBars} />
                :
                <FontAwesomeIcon size="lg" icon={faXmark} />
              }
            </span>
          </div>
        </>
      ) : ""}

      <div className="logo-container">
        <Link to="/products">
          <img className="logo-image" src={FloatNPaddleLogo} />
        </Link>
      </div>

      {true && width >= 970 ? (<div className="product-links">

        <Link
          to="/">
          Home
        </Link>

        <div className="hoverable-container">
          <Link
            to="/products/category/kayaks">
            Kayaks
          </Link>

          <div className="hidden-menu">
            <div className="option-one">
              <Link to="/products/style/sit-in">
                Sit-in
              </Link>
            </div>

            <div className="option-two">
              <Link to="/products/style/sit-on-top">
                Sit-on-top
              </Link>
            </div>
          </div>
        </div>

        <Link
          to="/products/category/paddles">
          Paddles
        </Link>

        <div className="hoverable-container">
          <Link
            to="/products/category/PFDs">
            Life Jackets
          </Link>

          <div className="hidden-menu">
            <div className="option-one">
              <Link to="/products/size/youth">
                Youth
              </Link>
            </div>

            <div className="option-two">
              <Link to="/products/size/adults">
                Adults
              </Link>
            </div>
          </div>
        </div>



        <div className="hoverable-container">

          <Link
            to="/products/category/watershoes">
            Water&nbsp;Shoes
          </Link>

          <div className="hidden-menu">
            <div className="option-one">
              <Link to="/products/style/mens">
                Mens
              </Link>
            </div>
            <div className="option-two">
              <Link to="/products/style/womens">
                Womens
              </Link>
            </div>
          </div>
        </div>

      </div>) : ""}

      <div className="user-stuff">
        <div>
          {user ? userBtn : loginSignupBtn}
        </div>

        <div className="checkout">
          <Link to="/cart">
            <div className='icon-container'>
              <FontAwesomeIcon size="lg" icon={faShoppingCart} />
              <span className="cart-qty">{totalCartQty(cartSum)}</span>
            </div>
          </Link>
        </div>
      </div>

    </nav>
  )
}
