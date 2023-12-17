import Footers from "../components/Footers";
import Navbar from "../components/Navbar";
import 'maplibre-gl/dist/maplibre-gl.css';
import { useRef, useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



export default function Maps() {
    const [center, setCenter] = useState({ lat: 27.7172, lng: 85.3240 })
    const zoom = 14
    const mapRef = useRef()
    const [datas, setDatas] = useState([]);


    const getData = async () => {
        const { data } = await axios.get(`http://localhost:5000/venue/get`);
        setDatas(data.data.venues);
    };
    useEffect(() => {
        getData();
    }, []);

    const markerIcon = new L.Icon({
        iconUrl: require("../images/marker.png"),
        iconSize: [45, 50],
    })

    //map redirecting to bookpage

    const navigate = useNavigate();


    return (
        <div className="maps-page">
            <Navbar />
            <div className="maps-container">
                <h1>Browse Venues through Map</h1>
                <MapContainer
                    center={center}
                    zoom={zoom}
                    ref={mapRef}>
                    <TileLayer url={'https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=4wKNiHQFM0Kgnp17nZbj'} attribution={'https://cloud.maptiler.com/maps/basic-v2/'} />
                    {datas && datas.map((venue, index) => {
                        console.log(venue)
                        const data = venue;
                        console.log(data)
                        return <Marker position={[venue.longitude, venue.latitude]} icon={markerIcon} key={index} title={venue.name}>
                            <Popup>
                                <img src={`http://localhost:5000/uploads/${venue.image}`} height="200" width="max-width" />
                                <div onClick={() => navigate('/details', { state: { data } })}>
                                    {venue.name}, {venue.location}
                                </div>
                            </Popup>
                        </Marker>
                    })}
                </MapContainer>
            </div>
            <Footers />
        </div>
    )
}