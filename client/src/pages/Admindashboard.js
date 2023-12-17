import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";

export default function Admindashboard() {
    const [data, setData] = useState([]);
    const handleDelete = (userid) => {
        if (localStorage.getItem('userRole') === "staff") {
            setErrors('You do not have access to update user')
        } else {
            axios.delete(`http://localhost:5000/user/delete/${userid}`).then(() => {
                window.location.reload(true)
            })
        }
    }

    const getData = async () => {
        const { data } = await axios.get(`http://localhost:5000/user/get`);
        setData(data.data.users);
        console.log(data)
    };
    useEffect(() => {
        getData();
    }, []);
    const navigate = useNavigate();

    const clearUserId = () => {
        localStorage.setItem('islogged', 'false');
        localStorage.removeItem('userID');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userMail');
        localStorage.removeItem('userName');
    };

    const handleLogOut = () => {
        clearUserId();
        navigate('/');
    }

    //for pagination//
    const [currentPage, setCurrentPage] = useState(1);
    const [postperpage, setPostPerPage] = useState(5);
    const paginate = (pagenumbers) => setCurrentPage(pagenumbers)

    const indexLastPost = currentPage * postperpage;
    const indexFirstPost = indexLastPost - postperpage;
    const currentPosts = data.slice(indexFirstPost, indexLastPost)

    const [errors, setErrors] = useState('');


    const handleUpdate = (users) => {
        if (localStorage.getItem('userRole') === "staff") {
            setErrors('You do not have access to update user')
        } else {
            navigate('/updateuser', { state: { users } })
        }
    }


    return (
        <div className="adminpage">
            <div className="adminpagecontainer">
                <div className="adminsidebar">
                    <ul>
                        <Link to='/admindashboard'><li className="adminsidebaritem">Accounts</li></Link>
                        <Link to='/adminbooking'><li className="adminsidebaritem">Bookings</li></Link>
                        <Link to='/adminpartypalace'><li className="adminsidebaritem">Party Palace</li></Link>
                        <li className="adminsidebaritem" onClick={handleLogOut}>Log Out</li>
                    </ul>
                </div>
                <div className="admincontainer">
                    {errors && <p className="error">{errors}</p>}
                    <table className="adminaccount">
                        <thead className="dashboard-head">
                            <tr>
                                <th className="adminaccount-th">Name</th>
                                <th className="adminaccount-th">Email</th>
                                <th className="adminaccount-th">Role</th>
                                <th className="adminaccount-th">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts && currentPosts.map((users, index) => {
                                return <tr key={index}>
                                    <td>{users.firstname}</td>
                                    <td>{users.email}</td>
                                    <td>{users.role}</td>
                                    <td>
                                        <button className="dashboard-button" onClick={() => handleDelete(users._id)}>delete</button>
                                        <button className="dashboard-button" onClick={() => handleUpdate(users)}>Update</button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <Pagination postperpage={postperpage} totalpost={data.length} paginate={paginate} />
                </div>
            </div>
        </div>
    )
}