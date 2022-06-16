import React from 'react'
import { Link } from 'react-router-dom';
import '../pageNotFound/PageNotFound.css'
import pageNotFoundImage1 from '/Users/tommyzwick/GIT/JRS-Final-Project/kayak-app/src/images/404-page-not-found-1.jpg'

export default function PageNotFound() {

  return (
    <div className="page-not-found-root">
      <h1>Oops!</h1>

      <h4>404 Page Not Found</h4>

      <div className="image-frame">
        <img src={pageNotFoundImage1} />
      </div>

      <div>


        <b>
          The tour guide got lost!
        </b>
        <p>Here are some helpful links to get back:</p>

        <div className="links-container">
          <Link to='/'>
            Home
          </Link>
          <Link to='/products'>
            Shop All
          </Link>
          <Link to='/products/category/kayaks'>
            Kayaks
          </Link>
          <Link to='/products/category/PFDs'>
            PFDs
          </Link>
          <Link to='/products/category/paddles'>
            Paddles
          </Link>
          <Link to='/products/category/watershoes'>
            Water Shoes
          </Link>
        </div>
      </div>


    </div>
  )
}
