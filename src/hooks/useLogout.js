import { useAuthContext } from './useAuthContext'

export const useLogout = () => {

    const { dispatch } = useAuthContext();

    const logout = () => {

        //quitar el usuario del storage

        localStorage.removeItem( 'operador' );

        //dispatch logout action

        dispatch({ type : 'LOGOUT' });

    };
    
    return {logout};

};
