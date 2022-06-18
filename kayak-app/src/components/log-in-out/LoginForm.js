import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useApi } from '../../services/axios.service';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../../services/localStorage.service';
import Toast from '../../services/toasts/Toast';
import ToastMessenger, { useToasts } from '../../services/toasts/toastService';
import '../../services/toasts/Toast.css'
import '../log-in-out/LoginForm.css';

export default function LogInPage() {

  return (
    <div className="login-root">
      <h1 className='header'>
        Welcome
      </h1>

      <div className="input-container">
        <LogInForm />
      </div>

      <a>
        Don't have an account?
      </a>
      <Link to="/signup">
        <button type="button" className="signup-btn">
          Sign Up
        </button>
      </Link>

    </div>
  )
}

function LogInForm() {

  const navigate = useNavigate();
  const animationTime = 300;
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
      http.login(user)
        .then(res => {
          const user = res.data.user;
          localStorageService.saveUser(user);
          toasts.success("Logged in successfully")
          navigate(`/products`);
        }).catch(err => {
          console.error(err)
          toasts.error("Email or Password was incorrect")
          setUser({ email: '', password: '' });
        });
    }
  }

  return (
    <form onSubmit={handleSubmit}
      className="input-form-root"
    >
      <input type="email"
        className="email-input"
        name="email"
        placeholder="Email"
        value={user.email}
        style={{ "--animationTime": `${animationTime}ms` }}
        onChange={handleChange} />
      <br />
      <input type="password"
        className="password-input"
        name="password"
        placeholder="Password"
        value={user.password}
        style={{ "--animationTime": `${animationTime}ms` }}
        onChange={handleChange} />
      <br />

      <button type="submit" className="login-btn"
      disabled={!user.email || !user.password}>
        Login
      </button>
      <hr></hr>
    </form>
  )
}