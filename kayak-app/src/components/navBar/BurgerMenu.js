import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './BurgerMenu.css'

export default function BurgerMenu() {


    return (
        <div className="burger-menu-container">
            <Link
                to="/">
                Home
            </Link>

            <Link
                to="/products/category/kayaks">
                Kayaks
            </Link>

            <Link
                to="/products/category/paddles">
                Paddles
            </Link>

            <Link
                to="/products/category/PFDs">
                PFDs
            </Link>

            <Link
                to="/products/category/watershoes">
                Water&nbsp;Shoes
            </Link>


        </div>
    )
}
