import { Link } from "react-router-dom";
import './navbar.css';

export default function Navbar() {
    return (
        <div className="navbar-style">
            <Link to="/">
                <h2>Collaj</h2>
            </Link>
        </div>
    )
}