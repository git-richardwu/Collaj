import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

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
        <div className="form">
            <form onSubmit={handleSignUp}>
                <h2>Sign Up</h2>
                <div className="userForm">
                    <label>Username: </label>
                    <input type="text" className="userInput" onChange={(e) => setUsername(e.target.value)} value={username}></input>
                    <label>Password: </label>
                    <input type="password" className="userInput" onChange={(e) => setPassword(e.target.value)} value={password}></input>
                    <button disabled={isLoading}>Sign up!</button>
                </div>
                {error && <p>{error}</p>}
                {isShown && <p className="status">Signing up...</p>}
            </form>
        </div>
    )
}