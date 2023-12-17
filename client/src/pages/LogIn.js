import logo from "../images/Logo.png"
import { SlEnvolope, SlLock } from "react-icons/sl";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { useState } from "react";

export default function LogIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const saveuser = (userID, userName, userMail) => {
    localStorage.setItem('islogged', 'true');
    localStorage.setItem('userID', userID);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userMail', userMail);
  }
  const saveuserrole = (userRole) => {
    localStorage.setItem('userRole', userRole)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null)
    if (!email || !password) {
      setError('Email and password are required')
      return;
    }
    axios
      .post(`http://localhost:5000/login/login`, { email, password })
      .then((data) => {
        if (data.data.role === "user") {
          navigate('/')
        } else {
          navigate('/admindashboard')
        }
        saveuser(data.data._id, data.data.username, data.data.email);
        saveuserrole(data.data.role);
        console.log(localStorage.getItem('userMail'));
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setError('Invalid email or password')
        } else {
          setError('Something went wrong. Please try again later.')
        }
      })
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logo} className="login-logo" />
        <form className="login-form" onSubmit={handleSubmit}>
          <h3><SlEnvolope className="mail-icon" />Email</h3>
          <input className="email-input" placeholder="abcd@gmail.com" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
          <h3><SlLock className="password-icon" />Password</h3>
          <input className="password-input" placeholder="password" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
          {error && <p className="error">{error}</p>}
          <div className="buttons">
            <button className="login-button" type="submit">Login</button>
            <Link to='/signup'><button className="signup-button">Sign Up</button></Link>
          </div>
        </form>
      </div>
    </div>
  )
}