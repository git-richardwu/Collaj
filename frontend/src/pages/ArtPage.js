import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ArtPage() {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const handleSubmit = async () => {
       const response = await fetch('/api/art/' + state.id, {
            method: 'DELETE'
       })
       const json = await response.json()
       if (response.ok) {
            console.log('art deleted')
            navigate('/')
        }
        else {
            console.log(json.error)
        }
    }

    return (
        <section className="container">
            <img className="singleArt" src={ state.url } alt={ state.title }/>
            <div className="content">
                <div>
                    <h2>{ state.title }</h2>
                </div>
                <p className="description">{ state.artist }</p>
                    <a href={ state.source } rel="noopener noreferrer" target="_blank">
                        <button className="sourceName">Source</button>
                    </a>
            </div>
            <button onClick={() => {(window.confirm('Are you sure you wish to delete this item?') ? handleSubmit() : console.log('No'))}} className="deleteButton">Delete</button>
        </section>
    )
}