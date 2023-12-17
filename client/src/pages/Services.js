import Footers from "../components/Footers";
import Navbar from "../components/Navbar";
import { SlCalender,SlMagnifier,SlEmotsmile } from "react-icons/sl";

export default function Services(){
    return(
        <div className="services-page">
            <Navbar/>
            <div className="services-container">
                <div className="services-context">
                    <h1 className="services-title">Our Services</h1>
                    {/* <h3 className="service-shortdescription">Pariatur ex anim ut consectetur ipsum incididunt.Amet irure eiusmod laborum incididunt.</h3> */}
                </div>
                <div className="service-box-container">
                    <div className="service-box">
                        <SlMagnifier className="service-icon" size="3rem"/>
                        <h2>Browse Party Palaces</h2>
                        <h4>Browse our website to find the party palace that best suits your needs.</h4>
                    </div>
                    <div className="service-box">
                        <SlCalender className="service-icon" size="3rem"/>
                        <h2>Book Party Palace</h2>
                        <h4>Choose the party palace and make reservations in accordance with your timetable.</h4>
                    </div>
                    <div className="service-box">
                        <SlEmotsmile className="service-icon" size="3rem"/>
                        <h2>Happy Costumer</h2>
                        <h4>By offering a simple way to reserve Party Palace in accordance with their preferences, we hope to satisfy our clients.</h4>
                    </div>
                </div>
            </div>
            <Footers/>
        </div>
    )
}