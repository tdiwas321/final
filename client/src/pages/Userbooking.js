import Footers from "../components/Footers";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import axios from 'axios'
import { useState, useEffect } from "react";

export default function Userbooking() {

    const [data, setData] = useState([]);


    const getData = async () => {
        const { data } = await axios.get(`http://localhost:5000/bookvenue/userbook/${localStorage.getItem('userID')}`);
        setData(data);
        console.log(data)
    };
    useEffect(() => {
        getData();
    }, []);

    const statuscheck = (bookstate) => {
        if (bookstate) {
            return "Approved"
        } else {
            return "Pending"
        }
    }



    //pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [postperpage, setPostPerPage] = useState(5);
    const paginate = (pagenumbers) => setCurrentPage(pagenumbers)

    const indexLastPost = currentPage * postperpage;
    const indexFirstPost = indexLastPost - postperpage;
    const currentPosts = data.slice(indexFirstPost, indexLastPost)
    return (
        <div>
            <Navbar />
            <div className="userbooking-page">
                <div className="prof-op">
                    <div className="profile-sidebar">
                        <ul>
                            <Link to='/userprofile'><li className="profile-sidebar-item">Profile</li></Link>
                            <Link to='/myreviews'><li className="profile-sidebar-item">My Reviews</li></Link>
                            <Link to='/userbooking'><li className="profile-sidebar-item">Bookings</li></Link>
                            <Link to='/userpassword'><li className="profile-sidebar-item">Change Password</li></Link>
                        </ul>
                    </div>
                    <div className="userbooking-container">
                        <table className="user-bookingpage">
                            <thead className="dashboard-head">
                                <tr>
                                    <th className="adminaccount-th">Booked Venue</th>
                                    <th className="adminaccount-th">Booked Date</th>
                                    <th className="adminaccount-th">Status</th>
                                    <th className="adminaccount-th">Actions</th>
                                </tr>
                            </thead>
                            {currentPosts.length > 0 ? (
                                <tbody>
                                    {currentPosts && currentPosts.map((books, index) => {
                                        console.log(books)
                                        const handleDelete = (id) => {
                                            axios.delete(`http://localhost:5000/bookvenue/delete/${id}`).then(() => {
                                            })
                                        }
                                        const userbookbuttons = (books) => {
                                            // console.log(books)
                                            if (books.approved) {
                                                return (
                                                    <td>
                                                        <button className="dashboard-button" onClick={() => handleDelete(books._id)}>Remove</button>
                                                    </td>
                                                )
                                            }
                                            else {
                                                return (
                                                    <td>
                                                        <button className="dashboard-button" onClick={() => handleDelete(books._id)}>Cancel</button>
                                                    </td>
                                                )
                                            }
                                        }
                                        return <tr key={index}>
                                            <td>{books.venuename}</td>
                                            <td>{books.bookeddate.slice(0, 10)}</td>
                                            <td>{statuscheck(books.approved)}</td>
                                            {userbookbuttons(books)}
                                        </tr>
                                    })}
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td colSpan="4">No Bookings found</td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                        <Pagination postperpage={postperpage} totalpost={data.length} paginate={paginate} />
                    </div>
                </div>
            </div>
            <Footers />
        </div>
    )
}