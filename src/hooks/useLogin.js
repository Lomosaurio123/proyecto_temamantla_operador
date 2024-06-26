import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import Swal from 'sweetalert2'

export const useLogin = () => {

    const[error, setError] = useState(null);
    const[isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const login = async (clave_operador) => {

        setIsLoading(true);
        setError(null);

        const response = await fetch( 'https://proyectotemamantla-production.up.railway.app/api/operadores/login', {
            method : 'POST',
            headers : { 'Content-Type' : 'application/json' },
            body : JSON.stringify({clave_operador})
        })

        const json = await response.json();

        if( !response.ok ) {
            
            setIsLoading(false);
            setError(json.error);  

        }

        if( response.ok ) {

            // Guardar el usuario en el local storage
            localStorage.setItem( 'operador', JSON.stringify(json) );

            Swal.fire('Correcto!!', `Bienvenido`, 'success' );

            //Actualizar AuthContext
            dispatch( { type : 'LOGIN',  payload : json } );

            setIsLoading(false);

        }

    };

    return{ login, isLoading, error };

}