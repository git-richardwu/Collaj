import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();

    const handleLogin = async (e) => {
        e.preventDefault();
        await login(username, password);
    }

    return (
        <div className="form">
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <div className="userForm">
                    <label>Username: </label>
                    <input type="text" className="userInput" onChange={(e) => setUsername(e.target.value)} value={username}></input>
                    <label>Password: </label>
                    <input type="password" className="userInput" onChange={(e) => setPassword(e.target.value)} value={password}></input>
                    <button disabled={isLoading}>Log in!</button>
                </div>
                {error && <div>{error}</div>}
            </form>
        </div>
    )
}