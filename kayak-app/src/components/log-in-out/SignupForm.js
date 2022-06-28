import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApi } from '../../services/axios.service'
import { useLocalStorage } from '../../services/localStorage.service';
import Toast from '../../services/toasts/Toast';
import ToastMessenger, { useToasts } from '../../services/toasts/toastService';
import '../../services/toasts/Toast.css'
import '../log-in-out/LoginForm.css'

export default function SignUpPage() {

  return (
    <div className="signup-root">
      <h1 className='header'>
        Sign Up
      </h1>

      <div className="input-container">
        <SignUpForm />
      </div>

      <a>
        Already have an account?
      </a>
      <Link to="/login">
        <button type="button" className="login-btn">
          Log In
        </button>
      </Link>
    </div>
  )
}

function SignUpForm() {

  const [isEmailTaken, setIsEmailTaken] = useState(true);
  const navigate = useNavigate();
  const http = useApi();
  const localStorageService = useLocalStorage()
  const toasts = useToasts();

  /**
 * user input is empty upon 
 * initial rendering
 */
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

/**
   * 
   * @param {input} e 
   * Tracks the value of the 
   * text inputs and sets the 
   * user values to the input values 
   */
  function handleChange(e) {
    var name = e.target.name;
    var value = e.target.value;

    setUser({
      ...user,
      [name]: value
    });
  }


/**
   * 
   * @param {input} e 
   * On submit check if the 
   * email and password field
   * are defined then attempt login
   */
  function handleSubmit(e) {
    e.preventDefault();
    if (user.email && user.password) {
      http.createNewUser(user)
        .then(res => {
          const user = res.data.user;
          localStorageService.saveUser(user);
          navigate(`/products`);

          toasts.success("Account created successfully")
        }).catch(err => {
          console.error(err)
          toasts.error("Sorry, an account with that Email already exists")

          setUser({ email: '', password: '' });
        })
    }
  }


  /**
   * checks the users email as its
   * entered, and compares it to the 
   * emails in database to see if 
   * the email already exists
   */
  useEffect(() => {
    http.getUserByEmail(user.email)
      .then(res => {
        // never happens
        // login will always fail due to business logic
      }).catch(err => {
        if (err.response.status == 404) {
          // no user found
          setIsEmailTaken(false);
        } else if (err.response.status == 401) {
          // user exists
          toasts.error("Sorry, an account with that Email already exists")
          setIsEmailTaken(true);
        } else {
          console.error(err);
        }
      });
  }, [user.email]);

  return (
    <form onSubmit={handleSubmit}
      className="input-form-root"
    >
      {isEmailTaken && <div className="error-message"></div>}
      <input type="text"
        className={isEmailTaken ? 'email-taken' : ''}
        name="email"
        placeholder="Email"
        required
        value={user.email}
        onChange={handleChange} />
      <br />

      <input type="password"
        name="password"
        placeholder="Password"
        value={user.password}
        onChange={handleChange} />

      <button className='signup-btn' type="submit"
        disabled={!user.email || !user.password}>
        Sign Up
      </button>
      <hr></hr>
    </form>

  )

}