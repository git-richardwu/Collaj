import { useState } from 'react';
import { Link } from "react-router-dom";
import { useSignup } from '../hooks/useSignup';
import { FaImage, FaPencilAlt, FaPaintBrush } from 'react-icons/fa';
import { GoPaintcan } from 'react-icons/go';

export default function SignUpPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isShown, setIsShown] = useState(false);
    const { signup, isLoading, error } = useSignup();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsShown(true);
        await signup(username, password);
        setIsShown(false);
    }

    return (
        <div className="logsignContainer">
            <div className="logsignForm">
                <form onSubmit={handleSignUp}>
                    <h2>SIGN UP</h2>
                    <hr/>
                    <div className="userForm">
                        <label>Username: </label>
                        <input type="text" className="userInput" onChange={(e) => setUsername(e.target.value)} value={username}></input>
                        <label>Password: </label>
                        <input type="password" className="userInput" onChange={(e) => setPassword(e.target.value)} value={password}></input>
                        <button className='logsignButton' disabled={isLoading}>Sign up!</button>
                    </div>
                    <hr/>
                </form>
                <div>Have an acccount?</div>
                <Link to='/login'>
                    <button className='logsignButton'>Sign In!</button>
                </Link>
                {error && <p>{error}</p>}
                {isShown && <p className="status">Signing up...</p>}
            </div>
            <div className="icons">
                <div><FaImage size={60}/></div>
                <div><FaPencilAlt size={60}/></div>
                <div><GoPaintcan size={60}/></div>
                <div><FaPaintBrush size={60}/></div>
                <div><FaPencilAlt size={60}/></div>
                <div><FaImage size={60}/></div>
                <div><FaPaintBrush size={60}/></div>
                <div><FaPencilAlt size={60}/></div>
                <div><FaImage size={60}/></div>
                <div><GoPaintcan size={60}/></div>
            </div>
        </div>
    )
}