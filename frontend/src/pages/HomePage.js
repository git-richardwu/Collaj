import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useArtContext } from "../components/hooks/useArtContext";
import SubmissionForm from "../components/SubmissionForm";
var colorsys = require('colorsys')

export default function HomePage() {
    const {artworks, dispatch} = useArtContext()
    const [searchEntry, setSearchEntry] = useState('')

    useEffect(() => {
        const fetchArt = async () => {
            const response = await fetch('/api/art')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_ARTWORK', payload: json})
            }
        }
        fetchArt()
    }, [dispatch])

    const handleSearch = (e) => {
        e.preventDefault()
        setSearchEntry(e)
        // console.log(artworks)
    }

    return (
        <div className="homePage">
            <input type="text" placeholder="Search" onChange={(e) => handleSearch(e.target.value)}/>
            <SubmissionForm />
            <div className="artGallery">
                {artworks && artworks.filter((a) => a.title.toLowerCase().includes(searchEntry.toLowerCase())).sort((x, y) => (x.artist.localeCompare(y.artist))).map((artwork) => (
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
