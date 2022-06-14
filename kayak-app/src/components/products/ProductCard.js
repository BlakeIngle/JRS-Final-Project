import React, { useContext } from 'react';
import '../products/ProductCard.css';
import { useApi } from '../../services/axios.service';
import { useLocalStorage } from '../../services/localStorage.service';
import { Context } from '../../App';
import { Link } from 'react-router-dom';

export default function ProductCard({ id, name, price, brand, color, style, description, image, rating, quantity, product_id, customer_id, total }) {

    const { addItem } = useContext(Context)
    const http = useApi();
    const ls = useLocalStorage();
    let user = ls.getUser();

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

        // if (user) {
        //     http.addItemToCart(user.id, id, price)
        //         .then(results => {
        //             console.log(results);
        //             // maybe make a little toast message or something
        //         })
        //         .catch(error => {
        //             console.log(error.response);
        //         });
        // } else {
        //     console.log('no user')
        // }
    }

    function requestUserLogin() {
        window.alert("Please Log In To Add Item to Cart")
    }

    return (
        <div className='product-card'>

            <div className='product-info'>
                <Link to={`/products/${id}`}>

                    <img className='image' src={image} />
                    <h4 className='product-name'>{name}</h4>
                    <h4 className='brand'>{brand}</h4>
                    <h4 className='price'>${price}</h4>

                    <button
                        onClick={user ? addItemToCart : requestUserLogin}
                        className='add-button'
                    >
                        <span> Add to Cart</span>
                    </button>
                </Link>
            </div>

        </div>
    )
}
