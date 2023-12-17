import { Link,useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footers from "../components/Footers"
import { useState, useEffect } from "react"
import axios from 'axios'

export default function Profile() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const clearUserId = () => {
        localStorage.setItem('islogged', 'false');
        localStorage.removeItem('userID');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userMail');
        localStorage.removeItem('userName');
      };
    const getData = async () => {
        const { data } = await axios.get(`http://localhost:5000/user/get/${localStorage.getItem('userID')}`);
        setData(data.data.users);
    };
    useEffect(() => {
        getData();
    }, []);

    const handleLogOut = () =>{
        clearUserId();
        navigate('/');
    }

    return (
        <div className="profile-page">
            <Navbar />
            <div className="prof-op">
                <div className="profile-sidebar">
                    <ul>
                        <Link to='/userprofile'><li className="profile-sidebar-item">Profile</li></Link>
                        <Link to='/myreviews'><li className="profile-sidebar-item">My Reviews</li></Link>
                        <Link to='/userbooking'><li className="profile-sidebar-item">Bookings</li></Link>
                        <Link to='/userpassword'><li className="profile-sidebar-item">Change Password</li></Link>
                    </ul>
                </div>
                <div className="profile-page-container">
                    <div className="profile-container">
                        <div className="profile-details">
                            <h2>Username</h2>
                            <span>{data.username}</span>
                        </div>
                        <div className="profile-details">
                            <h2>First Name</h2>
                            <span>{data.firstname}</span>
                        </div>
                        <div className="profile-details">
                            <h2>Last Name</h2>
                            <span>{data.lastname}</span>
                        </div>
                        <div className="profile-details">
                            <h2>Email</h2>
                            <span>{data.email}</span>
                        </div>
                        <div className="profile-details">
                            <h2>Address</h2>
                            <span>{data.address}</span>
                        </div>
                        <div className="profile-details">
                            <h2>Phone</h2>
                            <span>{data.phone}</span>
                        </div>
                        <button className="logout-button" onClick={handleLogOut}>Log Out</button>
                    </div>
                </div>
            </div>
            <Footers />
        </div>
    )
}