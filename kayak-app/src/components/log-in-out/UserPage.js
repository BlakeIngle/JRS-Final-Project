import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApi } from '../../services/axios.service'
import { useLocalStorage } from '../../services/localStorage.service';
import '../log-in-out/SignupForm.css'
import './UserPage.css'

export default function UserPage() {

    const navigate = useNavigate();
    const http = useApi();
    const ls = useLocalStorage();
    const user = ls.getUser();

    function onLogoutClicked() {
        ls.removeUser()
        navigate('/')
    }
    const logoutButton = (
        <div className='logoutButton' onClick={onLogoutClicked}>
            Log out
        </div>
    )

    return (
        <div className="logout-root">
            <h1 className='header'>
               {user.email}
            </h1>

            <Link to="/history">
                <button type="button" className="order-history">
                    Order History
                </button>
            </Link>

            <Link to="/">
                <button type="button" className="logout-btn">
                    {logoutButton}
                </button>
            </Link>
        </div>
    )
}


