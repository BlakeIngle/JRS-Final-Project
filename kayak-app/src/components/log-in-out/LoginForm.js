import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useApi } from '../../services/axios.service';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../../services/localStorage.service';
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

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleChange(e) {
    var name = e.target.name;
    var value = e.target.value;

    setUser({
      ...user,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (user.email && user.password) {
      http.login(user)
        .then(res => {
          const user = res.data.user;
          localStorageService.saveUser(user);
          navigate(`/`);
        }).catch(err => {
          console.error(err)

          emailRef.current.classList.add("shake");
          passwordRef.current.classList.add("shake");

          setUser({ email: '', password: '' });

          setTimeout(() => {
            emailRef.current.classList.remove("shake");
            passwordRef.current.classList.remove("shake");
          }, animationTime);
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