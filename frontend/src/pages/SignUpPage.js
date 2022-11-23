import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

export default function SignUpPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { signup, isLoading, error } = useSignup();

    const handleSignUp = async (e) => {
        e.preventDefault();
        await signup(username, password);
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
                {error && <div>{error}</div>}
            </form>
        </div>
    )
}