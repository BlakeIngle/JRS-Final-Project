import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApi } from '../../services/axios.service'
import { useLocalStorage } from '../../services/localStorage.service';
import '../log-in-out/SignupForm.css'

export default function SignUpPage() {

  const navigate = useNavigate();
  const http = useApi();
  const localStorageService = useLocalStorage();

  function attemptSignUp(user) {
    http.createNewUser(user)
      .then(res => {
        const user = res.data.user;
        localStorageService.saveUser(user);
        navigate(`/`);
      }).catch(err => {
        console.error(err);
      });
  }

  return (
    <div className="signup-root">
      <h1 className='header'>
        Signup
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
      http.createNewUser(user)
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
        })
    }
  }

  useEffect(() => {
    http.getUserByEmail(user.email)
        .then(res => {
            // never happens
            // login will always fail due to business logic
        }).catch(err => {
            console.log(err, err.response)
            if (err.response.status == 404) {
                // no user found
                console.log("no user found")
                setIsEmailTaken(false);
            } else if (err.response.status == 401) {
                // user exists
                console.log("email taken")
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
          style={{ "--animationTime": `${animationTime}ms` }}
          onChange={handleChange} />
        <br />

        <input type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          style={{ "--animationTime": `${animationTime}ms` }}
          onChange={handleChange} />

      <button className='signup-btn' type="submit"
        disabled={!user.email || !user.password}>
        Sign Up
      </button>
      <hr></hr>
    </form>

  )

}