import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


export default function Updateuser(props) {
    const locations = useLocation();
    const [firstname,setFirstName] = useState(locations.state.users.firstname)
    const [lastname,setLastName] = useState(locations.state.users.lastname)
    const [address,setAddress] = useState(locations.state.users.address)
    const [phone,setPhone] = useState(locations.state.users.phone)
    const [username,setUsername] = useState(locations.state.users.username)
    const [email,setEmail] = useState(locations.state.users.email)
    const [password,setPassword] = useState(locations.state.users.password)
    const [role,setRole] = useState(locations.state.users.role)
    const navigate = useNavigate()


    const addNewUser = (e) =>{
        e.preventDefault();

        const userForm = new FormData();
        userForm.append("firstname",firstname);
        userForm.append("lastname",lastname);
        userForm.append("address",address);
        userForm.append("phone",phone);
        userForm.append("username",username);
        userForm.append("email",email);
        userForm.append("password",password);
        userForm.append("role",role);

        axios.patch(`http://localhost:5000/userupdate/update/${locations.state.users._id}`,{firstname,lastname,address,phone,username,email,password,role})
        .then(navigate('/admindashboard'))
        .catch((err)=>{
            console.log(err);
        })
        console.log(userForm)
    }

    return (
        <div className="Updateuserpage">
            <form className="userupdate" onSubmit={addNewUser} encType="multipart/form-data" >
                <label>
                    First Name
                </label>
                <input defaultValue={locations.state.users.firstname} onChange={(e) => {setFirstName(e.target.value)}}/>
                <label>
                    Last Name
                </label>
                <input defaultValue={locations.state.users.lastname} onChange={(e) => {setLastName(e.target.value)}} />
                <label>
                    Address
                </label>
                <input defaultValue={locations.state.users.address} onChange={(e) => {setAddress(e.target.value)}}/>
                <label>
                    Phone
                </label>
                <input defaultValue={locations.state.users.phone} onChange={(e) => {setPhone(e.target.value)}}/>
                <label>
                    Username
                </label>
                <input defaultValue={locations.state.users.username} onChange={(e) => {setUsername(e.target.value)}}/>
                <label>
                    Email
                </label>
                <input defaultValue={locations.state.users.email} onChange={(e) => {setEmail(e.target.value)}}/>
                <label>
                    Password
                </label>
                <input defaultValue={locations.state.users.password} onChange={(e) => {setPassword(e.target.value)}}/>
                <label>Role</label>
                <select defaultValue={locations.state.role} onChange={(e)=>{setRole(e.target.value)}}>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                    <option value="staff">staff</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}