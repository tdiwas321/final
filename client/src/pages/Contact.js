import { SlEnvolope,SlBubble,SlUser,SlLocationPin,SlPhone } from "react-icons/sl";
import Footers from "../components/Footers";
import Navbar from "../components/Navbar";
import axios from 'axios';
import { useState } from "react";

export default function Contact(){

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [message,setMessage] = useState('')

    const handleSend = () =>{
        axios.post('http://localhost:5000/contact/send',{name,email,message})
    }

    return(
        <div className="contact-page">
            <Navbar/>
            <h1 className="contact-title">Contact Us</h1>
            {/* <h4 className="contact-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h4> */}
            <div className="contact-container">
                <div className="ourcontact">
                    <div className="contact-info">
                            <h2><SlLocationPin className="location-icon"/>Address</h2>
                            <h4>Kathandu,</h4>
                            <h4>Tokha,</h4>
                            <h4>44600</h4>
                    </div>
                    <div className="contact-info">
                            <h2><SlPhone className="phone-icon"/>Phone</h2>
                            <h4>+9779814030951</h4>
                    </div>
                    <div className="contact-info">
                            <h2><SlEnvolope className="mail.icon"/>Email</h2>
                            <h4>tdiwas321@gmail.com</h4>
                    </div>
                </div>
                <form className="contact-form">
                    <h3><SlUser className="user-icon"/>Name</h3>
                    <input className="contact-name" onChange={(e) => {setName(e.target.value)}} value={name}></input>
                    <h3><SlEnvolope className="mail-icon"/>Email</h3>
                    <input className="contact-email" onChange={(e) => {setEmail(e.target.value)}} value={email}></input>
                    <h3><SlBubble className="message-icon"/>Message</h3>
                    <textarea className="contact-message" rows="8" onChange={(e) => {setMessage(e.target.value)}} value={message}></textarea>
                    <button className="contact-send" onClick={handleSend}>Send</button>
                </form>
            </div>
            <Footers/>
        </div>
    )
}