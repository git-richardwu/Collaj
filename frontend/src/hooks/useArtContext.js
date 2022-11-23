import { ArtContext } from "../context/ArtContext";
import { useContext } from 'react';

export const useArtContext = () => {
    const context = useContext(ArtContext);
    if (!context) { 
        throw Error('Art context not found!');
    }
    return context;
}