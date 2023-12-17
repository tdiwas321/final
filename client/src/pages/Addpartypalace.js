import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
export default function Addpartypalace() {
    const [name,setName] = useState('')
    const [location,setLocation] = useState('')
    const [capacity,setCapacity] = useState('')
    const [price,setPrice] = useState('')
    const [longitude,setLongitude] = useState('')
    const [latitude,setLatitude] = useState('')
    const [fileName,setFileName] = useState('')
    const [mail,setMail] = useState('')
    const [description,setDescription] = useState('')
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
        .post("http://localhost:5000/venue/add",formData)
        .then(navigate('/admindashboard'))
        .catch((err)=>{
            console.log(err);
        })
    }


    return (
        <div className="addpartypalacepage">
            <form className="partypalaceadding"onSubmit={addNewvenue} encType="multipart/form-data" >
                <label>
                    Name
                </label>
                <input onChange={(e) => {setName(e.target.value)}}/>
                <label>
                    Location
                </label>
                <input onChange={(e) => {setLocation(e.target.value)}}/>
                <label>
                    Capacity
                </label>
                <input onChange={(e) => {setCapacity(e.target.value)}}/>
                <label>
                    Price
                </label>
                <input onChange={(e) => {setPrice(e.target.value)}}/>
                <label>
                    Longitude
                </label>
                <input onChange={(e) => {setLongitude(e.target.value)}}/>
                <label>
                    Lattitude
                </label>
                <input onChange={(e) => {setLatitude(e.target.value)}}/>
                <label>
                    Email
                </label>
                <input onChange={(e) => {setMail(e.target.value)}}/>
                <label>
                    Description
                </label>
                <textarea rows="8" onChange={(e) => {setDescription(e.target.value)}}/>
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