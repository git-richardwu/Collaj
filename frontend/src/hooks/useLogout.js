import { useUserContext } from "./useUserContext";
import { useArtContext } from "./useArtContext";

export const useLogout = () => {
    const { dispatch } = useUserContext();
    const { dispatch: artDispatch } = useArtContext();

    const logout = () => {
        localStorage.removeItem('user');
        dispatch({type: 'LOGOUT'});
        artDispatch({type: 'SET_ARTWORK', payload: null});
    }
    return { logout };
}