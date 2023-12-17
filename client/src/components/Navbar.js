import logo from '../images/Logo.png'
import { useState, useEffect } from "react"
import axios from 'axios'
import { Link } from 'react-router-dom';



export default function Navbar() {
    const [data, setData] = useState([]);
    const getUserData = async () => {
        const userID = localStorage.getItem('userID');
        if (userID) {
            try {
                const { data } = await axios.get(`http://localhost:5000/user/get/${userID}`);
                setData(data.data.users);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className='nav'>
            <img src={logo} className="nav-logo" />
            <div className='nav-container'>
                <Link to="/"><li className='nav-children'>Home</li></Link>
                <Link to="/maps"><li className='nav-children'>Map</li></Link>
                <Link to="/services"><li className='nav-children'>Services</li></Link>
                <Link to="/contact"><li className='nav-children'>Contact Us</li></Link>
                {data.username ? (
                    <Link to='/userprofile'>
                        <li className='nav-children'>{data.username}</li>
                    </Link>
                ) : (
                    <Link to='/login'>
                        <li className='nav-children'>Login</li>
                    </Link>
                )}
            </div>
        </div >
    )
}