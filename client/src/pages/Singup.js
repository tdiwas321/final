import logo from "../images/Logo.png"
import { SlEnvolope, SlLock, SlUser, SlPhone, SlLocationPin } from "react-icons/sl";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function Signup() {

    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkusers, setCheckUsers] = useState([])
    const navigate = useNavigate()

    const [errors, setErrors] = useState({}); // State to store validation errors

    const fetchUsers = async () => {
        const allusers = await axios.get('http://localhost:5000/user/get');
        setCheckUsers(allusers.data.data.users);
        console.log(checkusers)
    }

    const addNewUser = () => {
        if (checkusers.some(user => user.username === username)) {
            errors.usernamecheck = 'Username already exists';
        } else if (checkusers.some(user => user.email === email)) {
            errors.emailcheck = 'Email already exists';
        } else if (checkusers.some(user => user.phone === phone)) {
            errors.phonecheck = 'Phone number already exists';
        } else {
            axios.post('http://localhost:5000/user/add', { firstname, lastname, address, phone, username, email, password })
                .then(navigate('/login'));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let errors = {};

        if (!firstname.trim()) {
            errors.firstname = 'First name is required';
        }

        if (!lastname.trim()) {
            errors.lastname = 'Last name is required';
        }

        if (!address.trim()) {
            errors.address = 'Address is required';
        }

        if (!phone.trim()) {
            errors.phone = 'Phone number is required';
        } else if (isNaN(Number(phone.trim()))) {
            errors.phone = 'Phone number is invalid';
        }

        if (!username.trim()) {
            errors.username = 'Username is required';
        }

        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid';
        }

        if (!password.trim()) {
            errors.password = 'Password is required';
        }

        if (Object.keys(errors).length === 0) {
            addNewUser();
        } else {
            setErrors(errors);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="sign-page" >
            <div className="signup-container">
                <img src={logo} className="login-logo" />
                <form className="singup-form">
                    <h3><SlUser className="user-icon" />First Name</h3>
                    <input className="email-input" onChange={(e) => { setFirstName(e.target.value) }} value={firstname}></input>
                    {errors.firstname && <p className="error">{errors.firstname}</p>}
                    <h3><SlUser className="user-icon" />Last Name</h3>
                    <input className="email-input" onChange={(e) => { setLastName(e.target.value) }} value={lastname}></input>
                    {errors.lastname && <p className="error">{errors.lastname}</p>}
                    <h3><SlLocationPin className="user-icon" />Address</h3>
                    <input className="email-input" onChange={(e) => { setAddress(e.target.value) }} value={address}></input>
                    {errors.address && <p className="error">{errors.address}</p>}
                    <h3><SlPhone className="user-icon" />Phone</h3>
                    <input className="email-input" onChange={(e) => { setPhone(e.target.value) }} value={phone}></input>
                    {errors.phone && <p className="error">{errors.phone}</p>}
                    {errors.phonecheck && <p className="error">{errors.phonecheck}</p>}
                    <h3><SlUser className="user-icon" />Username</h3>
                    <input className="email-input" onChange={(e) => { setUsername(e.target.value) }} value={username}></input>
                    {errors.username && <p className="error">{errors.username}</p>}
                    {errors.usernamecheck && <p className="error">{errors.usernamecheck}</p>}
                    <h3><SlEnvolope className="mail-icon" />Email</h3>
                    <input className="email-input" onChange={(e) => { setEmail(e.target.value) }} value={email}></input>
                    {errors.email && <p className="error">{errors.email}</p>}
                    {errors.emailcheck && <p className="error">{errors.emailcheck}</p>}
                    <h3><SlLock className="password-icon" />Password</h3>
                    <input className="password-input" onChange={(e) => { setPassword(e.target.value) }} value={password} type="password"></input>
                    {errors.password && <p className="error">{errors.password}</p>}
                    <button className="signup-button" onClick={handleSubmit}>Sign Up</button>
                </form>
            </div>
        </div>
    )
}