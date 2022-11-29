import { useState } from 'react';
import { useArtContext } from "../hooks/useArtContext";
import { useUserContext } from '../hooks/useUserContext';

export default function SubmissionForm() {
    const { dispatch } = useArtContext();
    const { user } = useUserContext();
    const [source, setSource] = useState('');
    const [pieceIndex, setIndex] = useState(1);
    const [error, setError] = useState(null);
    const [artSite, setArtSite] = useState("Artstation");
    const [isLoading, setLoading] = useState(false);
    
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (!user) {
            setError('You have to be logged in!');
            return;
        }
        const art = { source, pieceIndex, artSite };
        console.log(art)
        const response = await fetch(process.env.REACT_APP_API + '/api/art', {
            method: 'POST',
            body: JSON.stringify(art),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        console.log(response)
        const json = await response.json();
        console.log(json)
        if (response.ok) {
            setSource('');
            setIndex(1);
            setError(null);
            setLoading(false);
            dispatch({type: 'ADD_ARTWORK', payload: json});
        }
        else {
            setLoading(false);
            setError(json.error);
        }
    }
    return (
        <form className='add' onSubmit={handleSubmit}>
            <h2>Add new artwork!</h2>
            <div className="formGroup">
                <label> Artwork URL: </label>
                    <input type="text" className="urlForm" onChange={(e) => setSource(e.target.value)} value={source}/>
            </div>
            <div className="formGroup">
                <label> Index: </label>
                    <input type="number" className="indexForm" min="1" max="50" onChange={(e) => setIndex(e.target.value)} value={pieceIndex}/>
                <label> Site: </label>
                    <select value={artSite} onChange={(e) => setArtSite(e.target.value)} id="site" name="site">
                        <option value="Artstation">Artstation</option>
                        <option value="Twitter">Twitter</option>
                    </select>
                    <button>Add</button>
            </div>
            { isLoading && <div>Loading...</div>}
            { error && <div className="errorMessage">Index provided is out of bounds.</div>}
        </form>
    )
}