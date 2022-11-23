import { createContext, useReducer } from "react";

export const ArtContext = createContext();

export const artReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ARTWORK':
            return {
                artworks: action.payload
            }
        case 'ADD_ARTWORK':
            return {
                artworks: [action.payload, ...state.artworks]
            }
        default:
            return state;
    }
}

export const ArtContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(artReducer, {
        artworks: null
    })
    return (
        <ArtContext.Provider value={{...state, dispatch}}>
            { children }
        </ArtContext.Provider>
    )
}