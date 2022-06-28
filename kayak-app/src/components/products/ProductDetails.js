import React, { useContext, useEffect, useState } from 'react';
import { useApi } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localStorage.service';
import { Context } from '../../App';
import { useParams } from 'react-router-dom';
import Toast from '../../services/toasts/Toast';
import ToastMessenger, { useToasts } from '../../services/toasts/toastService';
import '../../services/toasts/Toast.css'
import '../products/ProductDetails.css'


export default function ProductDetails({ name, price, brand, color, style, description, image, rating, quantity, product_id, customer_id, total }) {

  const { addItem } = useContext(Context)
  const http = useApi();
  const ls = useLocalStorage();
  const [product, setProduct] = useState([])
  const toasts = useToasts();
  let user = ls.getUser();
  let { id } = useParams();


  /**
   * This functions will get a single 
   * product by its product id
   */
  function getSingleProduct() {
    if (id) {
      http.getProductsById(id)
        .then((response) => {
          setProduct(response.data.products[0])
        })
        .catch(() => {
          console.error("error getting product by ID");
        })
    } else {
      console.error("Product ID is not defined", id)
    }
  }

  /**
    * This functions adds all the 
    * necessary properties of an 
    * individual item, to the local cart
    */
  function addItemToCart() {
    addItem(product)
    console.log(product.name)
    toasts.success("Item successfully added to shopping cart")
  }

  /**
     * This functions runs when a user is not
     * logged in and attempts to add to cart
     */
  function requestUserLogin() {
    toasts.success("Please Login or Signup to add items to cart")
  }

  /**
   * renders page once with data from
   * a single product based on its
   * product id
   */
  useEffect(() => {
    getSingleProduct();

  }, []);

  return (
    <div className="product-details-root">
      <div className='product-container'>
        <div className='image-container'>
          <img src={product?.image} />
        </div>

        <div className="product-details-container">
          <h4 className='product-name'><b>{product?.name}</b></h4>
          <h4 className='brand'>{product?.brand}</h4>

          <div className="shipping-disclosure">
            <b>In Stock</b>
            <p>Ships from United States</p>
            <p>Most customers receive <br></br>within <b>2-3 days</b></p>
          </div>

          <p className="description">{product?.description}</p>
        </div>


        <div className='product-price-container'>

          <h4 className='price'>${product?.price}</h4>

          <div>
            <b>Quantity</b>
            <p>1</p>
          </div>

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
