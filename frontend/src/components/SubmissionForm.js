import { useState } from 'react';
import { useArtContext } from "./hooks/useArtContext";

export default function SubmissionForm() {
    const { dispatch } = useArtContext()
    const [source, setSource] = useState('')
    const [pieceIndex, setIndex] = useState(1)
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        const art = { source, pieceIndex }
        const response = await fetch('/api/art', {
            method: 'POST',
            body: JSON.stringify(art),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (response.ok){
            setSource('')
            setIndex(1)
            setError(null)
            console.log('art added')
            setLoading(false)
            dispatch({type: 'ADD_ARTWORK', payload: json})
        }
        else {
            setLoading(false)
            setError(json.error)
            // console.log(error)
            // console.log(art)
        }
    }
    return (
        <form className='add' onSubmit={handleSubmit}>
            <h2>Add new artwork!</h2>
            <label> Artwork URL: </label>
            <input type="text" onChange={(e) => setSource(e.target.value)} value={source}/>
            <label> Index: </label>
            <input type="number" min="1" max="50" onChange={(e) => setIndex(e.target.value)} value={pieceIndex}/>
            <button>Add</button>
            { isLoading && <div>Loading...</div>}
            { error && <div className="errorMessage">Invalid Path. Try adjusting the index since ArtStation's indexing can be inconsistent.</div>}
        </form>
    )
}