
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { obtenerPorCorreo } from '../services/usuarioService';
import { ROLES } from '../models/Usuario';
import './Login.css';

function Login() {

  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();

  function ingresar(e) {
    e.preventDefault();

    if (correo.trim() === '' || clave === '') {
      setMensaje('Debes completar todos los campos');
      return;
    }

    const usuario = obtenerPorCorreo(correo.trim().toLowerCase());

    if (!usuario || usuario.contrasena !== clave) {
      setMensaje('Correo o contraseña incorrectos');
      return;
    }

    setMensaje('');

    if (usuario.rol === ROLES.ADMIN) {
      navigate('/admin-home');
    } else {
      navigate('/');
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

        <p className="login-etiqueta">
          BIENVENIDO A CHRONOS
        </p>

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
