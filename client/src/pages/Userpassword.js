import Footers from "../components/Footers";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Userpassword() {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confrimnew, setConfrimNew] = useState('');
    const navigate = useNavigate();
    const [errors,setErrors] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword === confrimnew) {
            axios.post(`http://localhost:5000/changepassword/change/${localStorage.getItem('userID')}`, { currentPassword, newPassword })
            .then(navigate('/userprofile'))
        }else{
            setErrors('Password does not match')
        }
    }


    return (
        <div>
            <Navbar />
            <div className="userpassword-page">
                <div className="prof-op">
                    <div className="profile-sidebar">
                        <ul>
                            <Link to='/userprofile'><li className="profile-sidebar-item">Profile</li></Link>
                            <Link to='/myreviews'><li className="profile-sidebar-item">My Reviews</li></Link>
                            <Link to='/userbooking'><li className="profile-sidebar-item">Bookings</li></Link>
                            <Link to='/userpassword'><li className="profile-sidebar-item">Change Password</li></Link>
                        </ul>
                    </div>
                    <div className="changepass">
                        <form className="changepassword-container" onSubmit={handleSubmit}>
                            <label>Current Password</label>
                            <input placeholder="current password" onChange={(e) => { setCurrentPassword(e.target.value) }}></input>
                            <label>New Password</label>
                            <input placeholder="new password" onChange={(e) => { setNewPassword(e.target.value) }}></input>
                            <label>Re-enter New Password</label>
                            <input placeholder="re enter new password" onChange={(e) => { setConfrimNew(e.target.value) }}></input>
                            {errors && <div className="error">{errors}</div>}
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footers />
        </div>
    )
}