import Footers from "../components/Footers";
import Homecomponents from "../components/Homecomponents";
import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";
import axios from 'axios';
import { useState, useEffect } from "react";



export default function Home() {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postperpage, setPostPerPage] = useState(5);

    const paginate = (pagenumbers) => setCurrentPage(pagenumbers)

    const getData = async () => {
        const { data } = await axios.get(`http://localhost:5000/venue/get`);
        setData(data.data.venues);
    };
    useEffect(() => {
        getData();
    }, []);

    const indexLastPost = currentPage * postperpage;
    const indexFirstPost = indexLastPost - postperpage;
    const currentPosts = data.slice(indexFirstPost, indexLastPost)

    const partydetail = currentPosts.map(datas => {
        return (
            <Homecomponents key={datas._id} data={datas} />
        )
    })

    //handeling filter function

    const [location, setLocation] = useState('')
    const [capacity, setCapacity] = useState('')
    const [ratings, setRatings] = useState('')
    const [price, setPrice] = useState('')

    const handleFilter = () => {
        axios.post(`http://localhost:5000/filter/filtervenue`, { location, capacity, ratings, price })
            .then(response => {
                setData(response.data)
            }
            )

    }
    return (
        <div className="home-page">
            <Navbar />
            <div className="homeview">
                <h1>Party Palace Booking System</h1>
            </div>
            <div className="home-body">
                <div className="content-filter" >
                    <button className="filterfunction" onClick={handleFilter}>Filter</button>
                    <label>Location</label>
                    <input className="location-input" onChange={(e) => { setLocation(e.target.value) }}></input>
                    <label>Ratings</label>
                    <select onChange={(e) => { setRatings(e.target.value) }}>
                        <option label="default"></option>
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <label>Capacity</label>
                    <input className="capacity-input" onChange={(e) => { setCapacity(e.target.value) }}></input>
                    <label>Price</label>
                    <input className="capacity-input" onChange={(e) => { setPrice(e.target.value) }}></input>
                </div>
                <div className="partycomponents">
                    {partydetail}
                    <Pagination postperpage={postperpage} totalpost={data.length} paginate={paginate} />
                </div>
            </div>
            <Footers />
        </div>
    )
}