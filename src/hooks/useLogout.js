import { useAuthContext } from './useAuthContext'

export const useLogout = () => {

    const { dispatch } = useAuthContext();

    const logout = () => {

        //quitar el usuario del storage

        localStorage.removeItem( 'user' );

        //dispatch logout action

        dispatch({ type : 'LOGOUT' });

    };
    
    return {logout};

};
