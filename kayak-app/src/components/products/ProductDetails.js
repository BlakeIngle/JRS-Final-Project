import React, { useContext, useEffect, useState } from 'react';
import { useApi } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localStorage.service';
import { Context } from '../../App';
import '../products/ProductDetails.css'
import { useParams } from 'react-router-dom';


export default function ProductDetails({ name, price, brand, color, style, description, image, rating, quantity, product_id, customer_id, total }) {

  const { addItem } = useContext(Context)
  const http = useApi();
  const ls = useLocalStorage();
  let user = ls.getUser();
  let { id } = useParams();
  const [product, setProduct] = useState([])



  function getSingleProduct() {
    if (id) {
      http.getProductsById(id)
        .then((response) => {
          console.log(response)
          setProduct(response.data.products[0])
        })
        .catch(() => {
          console.log("error getting product by ID");
        })
    } else {

      console.error("Product ID is not defined", id)
    }
  }

  function addItemToCart() {
    addItem({
      id,
      name,
      price,
      brand,
      color,
      style,
      description,
      image,
      quantity
    })
  }

  function requestUserLogin() {
    window.alert("Please Log In To Add Item to Cart")
  }


  useEffect(() => {
    getSingleProduct();

  }, []);

  return (
    <div className="product-details-root">
      <div className='product-container'>
        <img className='image' src={product?.image} />

        <div className="product-details-container">
          <h4 className='product-name'><b>{product?.name}</b></h4>
          <h4 className='brand'>{product?.brand}</h4>

          <div className="shipping-disclosure">
            <p>In Stock</p>
            <p>Ships from United States</p>
            <p>Most customers receive <br></br>within <b>2-3 days</b></p>
          </div>

          <p>{product?.description}</p>
        </div>

        <div className='product-price-container'>

          <h4 className='price'>${product?.price}</h4>

          <button
            onClick={user ? addItemToCart : requestUserLogin}
            className='add-button'
          >
            <span> Add to Cart</span>
          </button>
        </div>

      </div>
    </div>
  )
}
