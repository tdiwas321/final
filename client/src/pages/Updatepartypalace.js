import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


export default function Updatepartypalace(props) {
    const locations = useLocation();
    console.log(locations.state.venue)

    const [name,setName] = useState(locations.state.venue.name)
    const [location,setLocation] = useState(locations.state.venue.location)
    const [capacity,setCapacity] = useState(locations.state.venue.capacity)
    const [price,setPrice] = useState(locations.state.venue.price)
    const [longitude,setLongitude] = useState(locations.state.venue.longitude)
    const [latitude,setLatitude] = useState(locations.state.venue.latitude)
    const [fileName,setFileName] = useState()
    const [mail,setMail] = useState(locations.state.venue.mail)
    const [description,setDescription] = useState(locations.state.venue.description)
    const navigate = useNavigate()

    const onChangeFile =e=>{
        setFileName(e.target.files[0]);
    }

    const addNewvenue = (e) =>{
        e.preventDefault();

        const formData = new FormData();
        formData.append("name",name);
        formData.append("location",location);
        formData.append("capacity",capacity);
        formData.append("price",price);
        formData.append("longitude",longitude);
        formData.append("latitude",latitude);
        formData.append("image",fileName);
        formData.append("mail",mail);
        formData.append("description",description);

        axios
        .patch(`http://localhost:5000/venue/update/${locations.state.venue._id}`,formData)
        .then(navigate('/admindashboard'))
        .catch((err)=>{
            console.log(err);
        })
        console.log(formData);
    }
    console.log(locations.state.venue.capacity);


    return (
        <div className="Updatepartypalacepage">
            <form className="partypalaceupdate" onSubmit={addNewvenue} encType="multipart/form-data" >
                <label>
                    Name
                </label>
                <input defaultValue={locations.state.venue.name} onChange={(e) => {setName(e.target.value)}}/>
                <label>
                    Location
                </label>
                <input defaultValue={locations.state.venue.location} onChange={(e) => {setLocation(e.target.value)}} />
                <label>
                    Capacity
                </label>
                <input defaultValue={locations.state.venue.capacity} onChange={(e) => {setCapacity(e.target.value)}}/>
                <label>
                    Price
                </label>
                <input defaultValue={locations.state.venue.price} onChange={(e) => {setPrice(e.target.value)}}/>
                <label>
                    Longitude
                </label>
                <input defaultValue={locations.state.venue.longitude} onChange={(e) => {setLongitude(e.target.value)}}/>
                <label>
                    Lattitude
                </label>
                <input defaultValue={locations.state.venue.latitude} onChange={(e) => {setLatitude(e.target.value)}}/>
                <label>
                    Email
                </label>
                <input defaultValue={locations.state.venue.mail} onChange={(e) => {setMail(e.target.value)}}/>
                <label>
                    Description
                </label>
                <textarea defaultValue={locations.state.venue.description} rows="8" onChange={(e) => {setDescription(e.target.value)}}/>
                <label>
                    Party Palace Image
                </label>
                <input type="file" filename="image" onChange={onChangeFile } accept='image/*'/>
                {
                    fileName !== '' && fileName && <img src={URL.createObjectURL(fileName)}></img> 
                }
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}