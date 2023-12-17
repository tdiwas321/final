import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";

export default function Adminbooking() {
    const [data, setData] = useState([]);

    const handleDelete = (userid) => {
        axios.delete(`http://localhost:5000/bookvenue/delete/${userid}`).then(() => {
            window.location.reload(true)
        })
    }

    const getData = async () => {
        const { data } = await axios.get(`http://localhost:5000/bookvenue/get`);
        setData(data);
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

    const handleApprove = (bookid, bookername, venuename, venuemail, bookermail, bookeddate) => {
        axios.put(`http://localhost:5000/bookvenue/approve/${bookid}`)
            .then(
                axios.post('http://localhost:5000/bookvenue/book', { bookername, venuename, venuemail, bookermail, bookeddate })
                .then(window.location.reload(true))
            )
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
                                <th className="adminaccount-th">Booked by</th>
                                <th className="adminaccount-th">Venue</th>
                                <th className="adminaccount-th">Booked date</th>
                                <th className="adminaccount-th">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts && currentPosts.map((books, index) => {
                                return <tr key={index}>
                                    <td>{books.bookername}</td>
                                    <td>{books.venuename}</td>
                                    <td>{books.bookeddate.slice(0, 10)}</td>
                                    {books.approved ? (
                                        <td>
                                            <button className="dashboard-button" onClick={() => handleDelete(books._id)}>delete</button>
                                        </td>
                                    ) : (
                                        <td>
                                            <button className="dashboard-button" onClick={() => handleDelete(books._id)}>cancel</button>
                                            <button className="dashboard-button" onClick={() => handleApprove(books._id, books.bookername, books.venuename, books.venuemail, books.bookermail, books.bookeddate)}>approve</button>
                                        </td>
                                    )}
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