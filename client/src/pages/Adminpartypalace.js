import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Pagination from "../components/Pagination";

export default function Adminpartypalace() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const handleDelete = (itemid) => {
        axios.delete(`http://localhost:5000/venue/delete/${itemid}`).then(() => {
            window.location.reload(true)
        })
    }

    const getData = async () => {
        const { data } = await axios.get(`http://localhost:5000/venue/get`);
        setData(data.data.venues);
    };
    useEffect(() => {
        getData();
    }, []);

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
                    <table className="adminaccount">
                        <thead className="dashboard-head">
                            <tr>
                                <th className="adminaccount-th">Party Palace</th>
                                <th className="adminaccount-th">Capacity</th>
                                <th className="adminaccount-th">Locatation</th>
                                <th className="adminaccount-th">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts && currentPosts.map((venue, index) => {
                                return <tr key={index}>
                                    <td>{venue.name}</td>
                                    <td>{venue.capacity}</td>
                                    <td>{venue.location}</td>
                                    <td>
                                        <button className="dashboard-button" onClick={() => handleDelete(venue._id)}>delete</button>
                                        <button className="dashboard-button" onClick={() => navigate('/updatepartypalace', { state: { venue } })}>Update</button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <Link to='/addpartypalace'><button className="venueaddbutton">Add</button></Link>
                    <Pagination postperpage={postperpage} totalpost={data.length} paginate={paginate} />
                </div>
            </div>
        </div>
    )
}