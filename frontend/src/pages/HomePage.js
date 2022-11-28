import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useArtContext } from "../hooks/useArtContext";
import { useUserContext } from "../hooks/useUserContext";
import SubmissionForm from "../components/SubmissionForm";

export default function HomePage() {
    const {artworks, dispatch} = useArtContext();
    const [searchEntry, setSearchEntry] = useState('');
    const { user } = useUserContext();
    
    useEffect(() => {
        const fetchArt = async () => {
            const response = await fetch(process.env.REACT_APP_API + '/api/art', {
                headers: {'Authorization': `Bearer ${user.token}`}
            })
            const json = await response.json();
            if (response.ok) {
                dispatch({type: 'SET_ARTWORK', payload: json});
            }
        }
        if (user) {
            fetchArt();
        }  
    }, [dispatch, user])

    return (
        <div className="homePage">
            <input type="text" placeholder="Search Artwork by Name/Author" className="searchBar" onChange={(e) => setSearchEntry(e.target.value)}/>
            <SubmissionForm />
            {!artworks && <div className="status">Loading...</div>}
            <div className="artGallery">
                {artworks && artworks.filter((a) => a.title.toLowerCase().includes(searchEntry.toLowerCase()) || a.artist.toLowerCase().includes(searchEntry.toLowerCase())).sort((x, y) => (x.dominantColor[0] - y.dominantColor[0]) || x.dominantColor[1] - y.dominantColor[1] || x.dominantColor[2] - y.dominantColor[2]).map((artwork) => (
                    <Link key={artwork._id} to={`/art-details/${artwork._id}`} state={{ url: artwork.imageLink, title: artwork.title, artist: artwork.artist, source: artwork.source, id: artwork._id }}>
                        <div className="artInfo">
                            <img src={ artwork.imageLink } alt={artwork.title}/>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
