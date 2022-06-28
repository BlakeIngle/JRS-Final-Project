import React from 'react'
import kayakImage1 from '../../images/kayak-adventure-1.jpg'
import kayakImage2 from '../../images/kayak-adventure-2.jpg'
import kayakImage5 from '../../images/kayaks-pic.jpg'
import kayakCategory from '../../images/kayaks.jpg'
import paddleCategory from '../../images/kayak-paddles.jpeg'
import lifeJacketCategory from '../../images/life-jackets.jpg'
import shoesCategory from '../../images/watershoes.png'
import '../homePage/HomePage.css'
import { useNavigate, Link } from "react-router-dom";
import Carousel from './Carousel';

export default function HomePage() {
  const navigate = useNavigate();

  const images = [
    kayakImage1,
    kayakImage2,
    kayakImage5
  ];

  return (
    <div className="homepage-root">

      <div className="carousel-container">
        <Carousel images={images} />
      </div>

      <div className="header-container">
        <h3>
          YOUR OUTDOOR ADVENTURE STARTS HERE
        </h3>
        {/* <h4>
          KICK OFF YOUR ADVENTURE
        </h4> */}
        <button className="shop-button" onClick={() => {
          navigate('/products')
        }}>
          SHOP ALL
        </button>

        <div className="product-categories-container">
          <Link to='/products/category/kayaks'>
            <div className="category">
              Kayaks
            </div>
            <div className="image-container">
              <img src={kayakCategory}/>
            </div>
          </Link>

          <Link to='/products/category/paddles'>
            <div className="category">
              Paddles
            </div>
            <div className="image-container">
              <img src={paddleCategory}/>
            </div>
          </Link>
          <Link to='/products/category/PFDs'>
            <div className="category">
              Life Jackets
            </div>
            <div className="image-container">
              <img src={lifeJacketCategory}/>
            </div>
          </Link>
          <Link to='/products/category/watershoes'>
            <div className="category">
              Water Shoes
            </div>
            <div className="image-container">
              <img src={shoesCategory}/>
            </div>
          </Link>
        </div>

      </div>
    </div>
  )
}
