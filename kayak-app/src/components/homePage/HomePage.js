import React from 'react'
import kayakImage1 from '../../images/kayak-adventure-1.jpg'
import kayakImage2 from '../../images/kayak-adventure-2.jpg'
import kayakImage5 from '../../images/kayak-adventure-5.jpg'
import '../homePage/HomePage.css'
import { useNavigate } from "react-router-dom";
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
          SUMMER STARTS HERE
        </h3>
        <h4>
          KICK OFF YOUR ADVENTURE
        </h4>
        <button className="shop-button" onClick={() => {
          navigate('/products')
        }}>
          SHOP NOW
        </button>
      </div>
    </div>
  )
}
