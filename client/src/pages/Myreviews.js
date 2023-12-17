import Footers from "../components/Footers";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import axios from 'axios'
import { useState, useEffect } from "react";

export default function Myreviews() {
    const [data, setData] = useState([]);

    const getData = async () => {
        const { data } = await axios.get(`http://localhost:5000/rate/userreviews/${localStorage.getItem('userID')}`);
        setData(data.data);
        console.log(data)
    };
    useEffect(() => {
        getData();
    }, []);

    //pagination

    const handleDelete = (reviewID) => {
        axios.delete(`http://localhost:5000/rate/delete/${reviewID}`)
            .then((res) => {
                window.location.reload(true)
            })
            .catch((error) => {
                console.log(error);
            });
    }

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
                                    <th className="adminaccount-th">Venue</th>
                                    <th className="adminaccount-th">Rating</th>
                                    <th className="adminaccount-th">Review</th>
                                    <th className="adminaccount-th">Action</th>
                                </tr>
                            </thead>
                            {currentPosts.length > 0 ? (
                                <tbody>
                                    {currentPosts.map((review) => (
                                        <tr key={review._id}>
                                            <td>{review.name}</td>
                                            <td>{review.reviews.map(reviews => reviews.rating)}</td>
                                            <td>{review.reviews.map(reviews => reviews.comment)}</td>
                                            <td><button className="dashboard-button" onClick={() => handleDelete(review.reviews.map(reviews => reviews._id))}>delete</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td colSpan="4">No reviews found</td>
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
