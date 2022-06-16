import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShoppingCart, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import '../navBar/NavBar.css'
import Search from './Search';
import BurgerMenu from './BurgerMenu';
import { useLocalStorage } from '../../services/localStorage.service';
import { Context } from '../../App';


export default function () {

  const { cart, addItem, decreaseQty, increaseQty, removeItem, clearCart } = useContext(Context)
  const navigate = useNavigate();
  const ls = useLocalStorage();
  const user = ls.getUser();
  const [isHidden, setIsHidden] = useState(true);
  const [width, setWidth] = useState(window.innerWidth)
  const location = useLocation();



  const userBtn = (
    <div className="user-logged-in user-hoverable-container">
      <Link to="" >
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
          <Link to="">
            Log out
          </Link>
        </div>
      </div>

    </div>
  )

  const loginSignupBtn = (
    <div className="login-signup">
      <Link to="/login" >
        <FontAwesomeIcon size="lg" icon={faUser} />
      </Link>
    </div>
  )

  // This variable is needed to calculate the quantity
  // of items within the local storage shopping cart 
  // within the totalCartQty below
  var cartSum = 0;

  function totalCartQty(cartSum) {

    for (let item of cart) {
      cartSum += item.quantity

    }
    return cartSum;
  }



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
            PFDs
          </Link>

          <div className="hidden-menu">
            <div className="option-one">
              <Link to="/products/size/kids">
                Kids
              </Link>
            </div>

            <div className="option-two">
              <Link to="/products/size/adult">
                Adult
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

      {/* {true && width <= 970 ? (<div className="searchBar">
        <Search />
      </div>) : ""} */}

      {/* <h1>Modern Paddle</h1> */}

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
