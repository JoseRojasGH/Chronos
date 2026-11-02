
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {

  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [mensaje, setMensaje] = useState('');

  function ingresar(e) {
    e.preventDefault();

    if (correo === '' || clave === '') {
      setMensaje('Debes completar todos los campos');
    } else if (clave.length < 4 || clave.length > 10) {
      setMensaje('La contraseña debe tener entre 4 y 10 caracteres');
    } else {
      setMensaje('Formulario completado correctamente');
    }
  }

  return (
    <div
      className="login-pagina"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url('/img/fondo.png')"
      }}
    >

      <div className="login-contenedor">

        <Link to="/">
          <img
            src="/img/logo.png"
            alt="Logo CHRONOS"
            className="login-logo"
          />
        </Link>

        <p className="login-etiqueta">BIENVENIDO A CHRONOS</p>

        <h1>Iniciar sesión</h1>

        <p className="login-descripcion">
          Ingresa tus datos para continuar.
        </p>

        <form onSubmit={ingresar}>

          <label htmlFor="correo">Correo electrónico</label>
          <input
            id="correo"
            type="email"
            placeholder="ejemplo@correo.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <label htmlFor="clave">Contraseña</label>
          <input
            id="clave"
            type="password"
            placeholder="Ingresa tu contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />

          <button type="submit" className="login-boton">
            Ingresar
          </button>

        </form>

        {mensaje && (
          <p className="login-mensaje">{mensaje}</p>
        )}

        <p className="login-registro">
          ¿No tienes una cuenta?{' '}
          <Link to="/registro">Regístrate aquí</Link>
        </p>

        <Link to="/" className="login-volver">
          Volver al inicio
        </Link>

      </div>

    </div>
  );
}

export default Login;
