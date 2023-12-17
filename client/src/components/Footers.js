import { Link } from "react-router-dom";

export default function Footers() {
    return (
        <div className="footer-container">
                <div className="footer-123">
                    <div className="footer-1">
                        <Link to={'/'}><li className="footer-links">Home</li></Link>
                        <Link to={'/services'}><li className="footer-links">Our Services</li></Link>
                        <Link to={'/contact'}><li className="footer-links">Contact Us</li></Link>
                        <Link to={'/maps'}><li className="footer-links">Venue Map</li></Link>
                    </div>
                    <div className="footer-2">
                        <Link to={'/login'}><li className="footer-links">LogIn</li></Link>
                        <Link to={'/signup'}><li className="footer-links">Sign Up</li></Link>
                    </div>
                    <div className="footer-3">
                        <li>Tokha, Kathmandu</li>
                        <li>Partypalacebookingsystem123@gmail.com</li>
                        <li>+9779814030951</li>
                        <li>44600</li>
                    </div>
            </div>
        </div>
    )
}