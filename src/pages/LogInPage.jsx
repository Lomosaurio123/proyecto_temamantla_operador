import React, { useState, useEffect } from 'react';
import logo from '../assets/Operador.png';
import { useLogin } from '../hooks/useLogin';
import AOS from 'aos'
import 'aos/dist/aos.css'

export const LogInPage = () => {

  const [clave_operador, setClave_operador] = useState('');

  const { login, error, isLoading } = useLogin();

  //Animacion

  useEffect(() => {
    
    AOS.init()
  
  }, [])

  //Iniciar sesion

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login( clave_operador );

  };

  return (

    <div className='container'>

      <center><img src = {logo} alt='logo' height = "300px" width = "300px" data-aos = "fade-up" data-aos-duration="1200" /> </center>

      <h1> Bienvenido: </h1>
      <p> Ingresa la clave de operador </p>

      <form onSubmit={handleSubmit}> 

        <div className='row'>

          <div className="column">

            <input type = "text" placeholder = 'Clave de Operador' onChange={ (e) => setClave_operador( e.target.value ) } value = { clave_operador } />

          </div>

        </div>

        <div className='row'>

          <button disabled = {isLoading}> Ingresar </button>
          
        </div>

        {error && <div className='error'> {error} </div>}

      </form>
      
    </div>

  );
}
