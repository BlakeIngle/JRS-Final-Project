import React, { useContext } from 'react';
import { useApi } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localStorage.service';
import { Context } from '../../App';
import { Link } from 'react-router-dom';
import Toast from '../../services/toasts/Toast';
import ToastMessenger, { useToasts } from '../../services/toasts/toastService';
import '../../services/toasts/Toast.css'
import '../products/ProductCard.css';

export default function ProductCard({ id, name, price, brand, color, style, description, image, rating, quantity, product_id, customer_id, total }) {

    const { addItem } = useContext(Context)
    const http = useApi();
    const ls = useLocalStorage();
    const toasts = useToasts();
    let user = ls.getUser();


    /**
     * This functions adds all the 
     * necessary properties of an 
     * individual item, to the local cart
     */
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

        toasts.success("Item successfully added to shopping cart")
    }

    /**
     * This functions runs when a user is not
     * logged in and attempts to add to cart
     */
    function requestUserLogin() {
        toasts.error("Please Login or Signup to add items to cart")

    }

    return (
        <div className='product-card'>

            <div className='product-info'>
                <Link to={`/products/${id}`}>

                    <div className="image-frame">
                        <img className='image' src={image} />
                    </div>

                    <div className="product-details">
                        <h4 className='product-name'>{name}</h4>
                        <p className='brand'>{brand}</p>
                        <p className='price'>${(price).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    </div>
                </Link>

                <button
                    onClick={user ? addItemToCart : requestUserLogin}
                    className='add-button'
                >
                    <span> Add to Cart</span>
                </button>
            </div>

        </div>
    )
}
