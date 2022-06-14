import React from 'react'
import '../homePage/HomePage.css'
import { useNavigate } from "react-router-dom";


export default function HomePage() {
  const navigate = useNavigate();


  return (
    <div className="homepage-root">
      <h3>
        SUMMER STARTS HERE
      </h3>
      <h4>
        KICK OFF YOUR SUMMER ADVENTURE
      </h4>
      <button className="shop-button" onClick={() => {
          navigate('/products')
        }}>
        SHOP NOW
      </button>
    </div>
  )
}
