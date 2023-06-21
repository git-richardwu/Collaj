import { Link } from "react-router-dom";
import '../index.css';
import { useUserContext } from "../hooks/useUserContext";
import { useLogout } from "../hooks/useLogout";

export default function Navbar() {
    const { logout } = useLogout();
    const { user } = useUserContext();

    const handleLogout = () => {
        logout();
    }
    
    return (
        <div className="navbar-style">
            <div className="name">
                    <Link to="/">
                        <h2>Collaj</h2>
                    </Link>
            </div>
            {user && (
                <div className="separate">
                    <h4 className="welcome">Welcome, {user.username}</h4>
                    <button className="logout" onClick={handleLogout}>Log out</button>
                </div>
            )}
            {!user && (
            <div className="separate">
                    <Link to="/login">
                        <h3>Login</h3>
                    </Link>
            </div>
            )}
        </div>
    )
}