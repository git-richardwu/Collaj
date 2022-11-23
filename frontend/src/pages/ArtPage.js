import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from '../hooks/useUserContext';

export default function ArtPage() {
    const location = useLocation();
    const { state } = location;
    const { user } = useUserContext();
    const navigate = useNavigate();

    const handleSubmit = async () => {
       const response = await fetch('/api/art/' + state.id, {
            method: 'DELETE', 
            headers: {'Authorization': `Bearer ${user.token}`}
       })
       const json = await response.json();
        if (response.ok) {
            navigate('/');
        }
        else {
            console.log(json.error);
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
            <button onClick={() => {(window.confirm('Are you sure you want to delete this item? This cannot be undone.') ? handleSubmit() : console.log('No'))}} className="deleteButton">Delete</button>
        </section>
    )
}