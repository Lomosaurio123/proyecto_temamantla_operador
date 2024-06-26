import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import Select from "react-select";
import { validarFormatoClave, validarInfoClave, validarEdadClave } from '../helpers/valdiations'
import { useAuthContext } from '../hooks/useAuthContext'
import Swal from 'sweetalert2';
import { useLogout } from '../hooks/useLogout';

export const BeneficiarioPage = () => {

  //Log Out

  const { logout } = useLogout();

  //Sesion del usuario

  const { user } = useAuthContext();

  //Declaramos los campos a llenar

  const [nombre, setNombre] = useState('');
  const [apellido_paterno, setApellido_paterno] = useState('');
  const [apellido_materno, setApellido_materno] = useState('');
  const [edad, setEdad] = useState(0);
  const [sexo, setSexo] = useState('Hombre');
  const [clave_elector, setClave_elector] = useState('');
  const [telefono, setTelefono] = useState(0);
  const [facebook, setFacebook] = useState('');
  const municipio = "Temamantla"
  const [calle, setCalle] = useState('');
  const [cp, setCp] = useState('');
  const [col, setCol] = useState('');
  const [numero, setNumero] = useState('');
  const [seccion, setSeccion] = useState('');
  const [estructura, setEstructura] = useState('');
  const [error, setError] = useState(null); 

  //Animacion

  useEffect(() => {
    
    AOS.init()
  
  }, [])

  //Subir beneficiario
const handleSubmit = async (e) => {
  e.preventDefault();

  //Validamos la sesión
  if (!user) {
      setError('Debes estar logeado');
      return;
  }

  //Realizamos el proceso de validaciones

  let validData = true;

  if (clave_elector.length > 0) {
      const validFormat = validarFormatoClave(clave_elector);
      const validInfoClave = validarInfoClave(clave_elector, nombre, apellido_paterno, apellido_materno);
      const validEdadClave = validarEdadClave(clave_elector, edad);

      if (!validFormat) {
          Swal.fire('Error', `Verifica el formato de la clave de elector`, 'error');
          validData = false;
      }

      else if (!validInfoClave) {
        Swal.fire('Error', `Verifica que la info de la clave de elector corresponda`, 'error');
        validData = false;
      }

      else if (!validEdadClave) {
        Swal.fire('Error', `Verifica que la edad corresponda con la clave de elector`, 'error');
        validData = false;
      }
  }

  if (validData) {
      //Después de validar los datos, comienza el proceso de alta
      const beneficiario = {
          nombre: nombre,
          apellido_paterno: apellido_paterno,
          apellido_materno: apellido_materno,
          edad: edad,
          sexo: sexo,
          clave_elector: clave_elector,
          telefono: telefono,
          facebook: facebook,
          municipio: municipio,
          seccion: seccion,
          calle: calle,
          col: col,
          cp: cp,
          numero: numero,
          estructura: estructura,
          afiliacion: ''
      };

      console.log(beneficiario);

      //Realizamos la llamada a la API
      Swal.fire({
          title: '¿Deseas guardar los datos capturados?',
          showDenyButton: true,
          confirmButtonText: 'Confirmar',
          denyButtonText: `Cancelar`
      }).then(async (result) => {
          if (result.isConfirmed) {
              const response = await fetch('https://proyectotemamantla-production.up.railway.app/api/beneficiarios', {
                  method: 'POST',
                  body: JSON.stringify(beneficiario),
                  headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${user.token}`
                  },
                  mode: 'cors'
              });

              const json = await response.json();

              if (!response.ok) {
                  setError(json.error);
              }

              if (response.ok) {
                  setNombre('');
                  setApellido_paterno('');
                  setApellido_materno('');
                  setEdad(0);
                  setSexo('Hombre');
                  setClave_elector('');
                  setTelefono('');
                  setFacebook('');
                  setEstructura('');
                  setCalle('');
                  setCol('');
                  setCp('');
                  setNumero('');
                  setError(null);
                  Swal.fire('Correcto!!', `Datos almacenados con exito`, 'success');
              }
          } else if (result.isDenied) {
              Swal.fire('Datos no almacenados', '', 'info');
              return;
          }
      });
    }
  };


  const LogOut = () => {

    logout();

  }


  return (

    <div className='beneficiarios'>

      <header>
        <span className='number2 material-symbols-outlined' onClick = {LogOut} data-aos = "fade-up" data-aos-duration="1200">arrow_back</span>
        <h1 data-aos = "fade-up" data-aos-duration="1200"> Ingresa los datos: </h1>
      </header>

      <form data-aos = "fade-up" data-aos-duration="1200" onSubmit = { handleSubmit }>

            <div className="row" data-aos = "fade-up" data-aos-duration="1200">

                <legend className='leyenda'><span className="number">1</span> <b>Identidad</b> </legend>

                <div className="column">

                    <label itemID="name">Nombre :</label>
                    <input required = {true} type="text" id="name" placeholder="Escribe el nombre" onChange = { (e) => setNombre( e.target.value ) } value = { nombre }  />

                </div>

                <div className="column">

                    <label itemID="apellidopa">Apellido Paterno :</label>
                    <input required = {true} type="text" id="apellidopa" placeholder="Escribe el apellido paterno" onChange = { (e) => setApellido_paterno( e.target.value ) } value = { apellido_paterno }  />

                </div>

                <div className="column">

                    <label itemID="apellidoma">Apellido Materno :</label>
                    <input required = {true} type="text" id="apellidoma" placeholder="Escribe el apellido Materno" onChange = { (e) => setApellido_materno( e.target.value ) } value = { apellido_materno }  />

                </div>

                <div className="column">

                    <label itemID="edad">Edad :</label>
                    <input required = {true} type="number" id="edad" placeholder="Escribe la edad" onChange = { (e) => setEdad( e.target.value ) } value = { edad }  />
                    
                </div>

                <div className="column sexo" style = {{ display : 'flex' }}>

                  <label style={{ marginBottom: '10px' }}>
                    <strong>Sexo:</strong>
                  </label>

                  <label style={{ marginLeft: '30px'}}>
                    <input required = {true} type="radio" name="sexo" id="hombre" value="Hombre" className="radio" checked = { sexo === 'Hombre' } onChange = { () => setSexo( 'Hombre' ) } /> Hombre
                  </label>

                  <label style={{ marginLeft: '30px'}}>
                    <input required = {true} type="radio" name="sexo" id="mujer" value="Mujer" className="radio" checked = { sexo === 'Mujer' } onChange = { () => setSexo( 'Mujer' ) } /> Mujer
                  </label>


                </div>

                <div className="column">

                    <label itemID="clave_elector">Clave de Elector :</label>
                    <input required = {false} type="text" id="clave_elector" placeholder="Escribe la clave de elector" onChange = { (e) => setClave_elector( e.target.value.toUpperCase() ) } value = { clave_elector } />
                    
                </div>

            </div>

            <div className="row">
              
                <legend className='leyenda'><span className="number">2</span> <b>Contacto</b> </legend>

                <div className="column">
                    <label itemID="tel">Telefono :</label>
                    <input required = {false} type="number" id="tel" placeholder="Escribe el telefono" onChange = { (e) => setTelefono( e.target.value ) } value = { telefono } />
                </div>

                <div className="column">
                    <label itemID="facebook">Facebook :</label>
                    <input required = {false} type="text" id="facebook" placeholder="Escriba el facebook" onChange = { (e) => setFacebook( e.target.value ) } value = { facebook } />
                </div>

            </div>

            <div className="row">

                <legend className='leyenda'><span className="number">3</span> <b>Localización</b> </legend>

                <div className="column">
                  <label itemID="seccion">Seccion :</label>
                  <br /><br />
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isLoading={true}
                    isClearable={true}
                    isSearchable={true}
                    name="color"
                    required={true}
                    options={[
                      { value: '4326', label: '4326' },
                      { value: '4327', label: '4327' },
                      { value: '4328', label: '4328' },
                      { value: '4329', label: '4329' },
                      { value: '4330', label: '4330' },
                    ]}
                    
                    onChange={(choice) => setSeccion(choice.value)}
                  />
                </div>

                <div className="column">
                    <label itemID="calle">Calle :</label>
                    <input required = {true} type="text" id="calle" placeholder="Escriba la calle" onChange = { (e) => setCalle( e.target.value ) } value = { calle } />
                </div>

                <div className="column">
                    <label itemID="cp">Código Postal :</label>
                    <input required = {true} type="text" id="cp" placeholder="Escriba el código postal" onChange = { (e) => setCp( e.target.value ) } value = { cp } />
                </div>

                <div className="column">
                    <label itemID="col">Colonia :</label>
                    <input required = {true} type="text" id="col" placeholder="Escriba la colonia" onChange = { (e) => setCol( e.target.value ) } value = { col } />
                </div>

                <div className="column">
                    <label itemID="numero">Numero :</label>
                    <input required = {true} type="text" id="numero" placeholder="Escriba el número de casa" onChange = { (e) => setNumero( e.target.value ) } value = { numero } />
                </div>

            </div>

            <div className="row">

                <legend className='leyenda'><span className="number">4</span> <b>Estructura</b> </legend>

                <div className="column">
                    <label itemID="estructura">Estructura :</label>
                    <input required = {true} type="text" id="estructura" placeholder="Escribe la estructura" onChange = { (e) => setEstructura( e.target.value ) } value = { estructura } />
                </div>

            </div>

            <div className='row'>

              <button> Enviar </button>

              {error && <div className="error">{error}</div>}
          
            </div>

        </form>
    
    </div>

  );

}
