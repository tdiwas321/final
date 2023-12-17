import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Homecomponents(props) {
    const [data,setData] = useState(props.data)
    console.log(data)
    const navigate = useNavigate();

    return (
        <div className="home-content">
            <div className="home-party-container">
                <img src={`http://localhost:5000/uploads/${data.image}`} className="home-party-img" />
                <div className="home-party-desc">
                    <h2 className="home-party-name">{(data.name)}</h2>
                    <div className="home-party-attribute">
                        <span className="rating">
                            {[...Array(5)].map((star, i) => {
                                const ratingValue = i + 1;
                                return (
                                    <label key={ratingValue}>
                                        <FontAwesomeIcon icon={faStar}
                                            color={ratingValue <= data.ratings ? "#ffc107" : "#e4e5e9"}
                                        />
                                    </label>
                                );
                            })} ({data.numOfReview})
                        </span>
                        <span>Capacity: 0 - {data.capacity}</span>
                        <span>Price: {data.price} /person</span>
                        <span>Email: {data.mail}</span>
                        <span>Location: {data.location}</span>
                    </div>
                    <button className="item-details" onClick={() => navigate('/details', { state: { data } })}>Details</button>
                </div>
            </div>
        </div>
    )
}