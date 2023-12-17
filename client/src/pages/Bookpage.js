import { Link, useLocation } from "react-router-dom"
import Navbar from "../components/Navbar";
import Footers from "../components/Footers";
import { useRef, useState, useEffect } from "react";
import axios from 'axios'
import DatePicker, { ReactDatePicker } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


export default function Bookpage() {

    const datas = useLocation().state.data;
    const [datedata, setDateData] = useState([]);
    // const datesssss = new Date().toISOString().slice(0, 10);

    const getData = async () => {
        const { data } = await axios.get(`http://localhost:5000/bookvenue/dateget/${datas._id}`);
        setDateData(data);
    };
    useEffect(() => {
        getData();
    }, []);

    const [bookername, setBookerName] = useState(localStorage.getItem('userName'))
    const [venuename, setVenueName] = useState(datas.name)
    const [venuemail, setVenueEmail] = useState(datas.mail)
    const [bookermail, setBookerMail] = useState(localStorage.getItem('userMail'))
    const [bookerID, setBookerID] = useState(localStorage.getItem('userID'))
    const [venueID, setVenueID] = useState(datas._id)
    const [bookeddate, setBookedDate] = useState(new Date())

    const[bookError,setBookError] = useState('')

    const handleBook = () => {
        if(!isLogged){
            setBookError('Please LogIn to book')
        }else{
        axios.post('http://localhost:5000/bookvenue/add', { bookername, venuename, venuemail, bookermail, bookeddate, bookerID, venueID })
            .then(window.location.reload(true))
        }
    }


    //datepicker

    const excludedDates = datedata.map(data => new Date(data));

    //maps

    const [center, setCenter] = useState({ lat: datas.longitude, lng: datas.latitude })
    const zoom = 14
    const mapRef = useRef()
    const [mapdata, setMapData] = useState([]);

    const markerIcon = new L.Icon({
        iconUrl: require("../images/marker.png"),
        iconSize: [45, 50],
    })

    //review
    const [rating, setRating] = useState('')
    const [comment, setComment] = useState('')
    const [userID, setUserID] = useState('')
    const [username, setUsername] = useState('')
    const [isLogged,setIsLogged] = useState('')
    const [errors, setErrors] = useState('');

    useEffect(() => {
        setUserID(localStorage.getItem('userID'))
        setUsername(localStorage.getItem('userName'))
        setIsLogged(localStorage.getItem('islogged'))
    }, [])
    
    const handlereviewsubmit = () => {
        if(isLogged==='false'){
            setErrors('Please Log In to add an review');
        }else{
            axios.post('http://localhost:5000/rate/addreview', { rating, comment, venueID, userID, username })
            
        }
    }



    const [capacities,setCapacities] = useState(datas.capacity)
    const [priceper,setPriceper] = useState(datas.priceper)
    const [paymentamount,setPaymentamount] = useState((capacities*priceper)/2*0.0076)

    const onApprove = (data,actions) =>{
        alert('Payment Approved:', data);

        handleBook();

        return actions.order.capture();
    }

    return (
        <div className="book-page">
            <Navbar />
            <div className="book-container-details">
                <img src={`http://localhost:5000/uploads/${datas.image}`} className="booking-image" />
                <div className="booking-attribute">
                    <h1 className="book-title">{datas.name}</h1>
                    <span className="rating">
                        {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;
                            return (
                                <label key={ratingValue}>
                                    <FontAwesomeIcon icon={faStar}
                                        color={ratingValue <= datas.ratings ? "#ffc107" : "#e4e5e9"}
                                    />
                                </label>
                            );
                        })}({datas.numOfReview})
                    </span>
                    <span>Capacity: 0 - {datas.capacity}</span>
                    <span>Price: {datas.price} /person</span>
                    <span>Email: {datas.mail}</span>
                    <span>Location: {datas.location}</span>
                    {(
                        <div className="bookingfunction">
                            <DatePicker
                                className="calender-book"
                                selected={bookeddate}
                                onChange={(date) => setBookedDate(date)}
                                minDate={new Date()}
                                placeholderText="Select available Date"
                                excludeDates={excludedDates}
                            />
                            {/* <button className="book-now" onClick={handlePayment}>Book</button> */}
                            <PayPalScriptProvider options={{"client-id":"ATus3Pt83tdgueU1_eF3GlNgoao6Xs8bL6AEE8ULSV1x7bEkzoA0yxOUcipG8Y6BU9AsIfH7jAI1DsZn"}}> 
                                <PayPalButtons
                                    style={{
                                        label: 'checkout', 
                                      }}
                                      createOrder={(data, actions) => {
                                        return actions.order
                                            .create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            value: paymentamount,
                                                        },
                                                    },
                                                ],
                                            })
                                            .then((orderId) => {
                                                // Your code here after create the order
                                                return orderId;
                                            });
                                    }}
                                    onApprove={function (data, actions) {
                                        return actions.order.capture().then(function () {
                                            handleBook();
                                        });
                                    }}
                                  />
                            </PayPalScriptProvider>
                        </div>
                    )}
                    {bookError && <p className="error">{bookError}</p>}
                </div>
            </div>
            <div className="map-addreview-container">
                <div className="book-page-map-container">
                    <MapContainer
                        className="book-page-map"
                        center={center}
                        zoom={zoom}
                        ref={mapRef}>
                        <TileLayer url={'https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=4wKNiHQFM0Kgnp17nZbj'} attribution={'https://cloud.maptiler.com/maps/basic-v2/'} />
                        <Marker position={[datas.longitude, datas.latitude]} icon={markerIcon} key={datas._id} title={datas.name}>
                            <Popup>
                                <img src={`http://localhost:5000/uploads/${datas.image}`} height="200" width="max-width" />
                                <b>
                                    {datas.name}, {datas.location}
                                </b>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
                <div className="addingreviews">
                    <h2>Add an review</h2>
                    <div className="addreviewsinput">
                        <label>Your Rating</label>
                        <div>
                            {[...Array(5)].map((star, index) => {
                                index += 1;
                                return (
                                    <button
                                        type="button"
                                        key={index}
                                        className={index <= rating ? "on" : "off"}
                                        onClick={() => setRating(index)}
                                    >
                                        <span className="fa fa-star">&#9733;</span>
                                    </button>
                                );
                            })}
                        </div>
                        <label>Comment</label>
                        <textarea className="commentadd" onChange={(e) => { setComment(e.target.value) }}></textarea>
                        <button className="review-button" onClick={()=>handlereviewsubmit()}>Submit</button>
                    </div>
                    {errors && <p className="error">{errors}</p>}
                </div>
            </div>
            <div className="booking-context">
                <div className="booking-description">
                    <h2>Description</h2>
                    <p className="booking-description-p">{datas.description}</p>
                </div>
                <div className="booking-reviews">
                    <h2>Reviews</h2>
                    <div className="carousel">
                        {datas.reviews.length > 0 ? (
                            <Carousel>
                                {datas.reviews.map((review) => (
                                    <div className="carousel-data-container" key={review._id}>
                                        <h3>{review.username}</h3>
                                        <div className="rating">
                                            {[...Array(5)].map((star, i) => {
                                                const ratingValue = i + 1;
                                                return (
                                                    <label key={ratingValue}>
                                                        <FontAwesomeIcon icon={faStar}
                                                            color={ratingValue <= review.rating ? "#ffc107" : "#e4e5e9"}
                                                        />
                                                    </label>
                                                );
                                            })}
                                        </div>
                                        <p>{review.comment}</p>
                                    </div>
                                ))}
                            </Carousel>
                        ) : (
                            <div>No reviews</div>
                        )}
                    </div>
                </div>
            </div>
            <Footers />
        </div>
    )
}