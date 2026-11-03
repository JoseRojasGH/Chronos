
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Registro.css';

function Registro() {

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mensaje, setMensaje] = useState('');

  function registrar(e) {
    e.preventDefault();

    if (
      nombre.trim() === '' ||
      correo.trim() === '' ||
      clave === '' ||
      confirmar === ''
    ) {
      setMensaje('Debes completar todos los campos');
    } else if (clave.length < 4 || clave.length > 10) {
      setMensaje('La contraseña debe tener entre 4 y 10 caracteres');
    } else if (clave !== confirmar) {
      setMensaje('Las contraseñas no coinciden');
    } else {
      setMensaje('Formulario de registro completado correctamente');
    }
  }

  return (
    <div
      className="registro-pagina"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url('/img/fondo.png')"
      }}
    >

      <div className="registro-contenedor">

        {/* Logo */}
        <Link to="/">
          <img
            src="/img/logo.png"
            alt="Logo CHRONOS"
            className="registro-logo"
          />
        </Link>

        <p className="registro-etiqueta">
          ÚNETE A CHRONOS
        </p>

        <h1>Crear cuenta</h1>

        <p className="registro-descripcion">
          Regístrate y descubre nuestra colección de relojes.
        </p>

        {/* Formulario */}
        <form onSubmit={registrar}>

          <label htmlFor="nombre">Nombre completo</label>
          <input
            id="nombre"
            type="text"
            placeholder="Ingresa tu nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label htmlFor="correoRegistro">
            Correo electrónico
          </label>
          <input
            id="correoRegistro"
            type="email"
            placeholder="ejemplo@correo.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <label htmlFor="claveRegistro">Contraseña</label>
          <input
            id="claveRegistro"
            type="password"
            placeholder="Entre 4 y 10 caracteres"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />

          <label htmlFor="confirmarClave">
            Confirmar contraseña
          </label>
          <input
            id="confirmarClave"
            type="password"
            placeholder="Repite tu contraseña"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            required
          />

          <button type="submit" className="registro-boton">
            Crear cuenta
          </button>

        </form>

        {/* Mensaje de validacion */}
        {mensaje && (
          <p className="registro-mensaje">{mensaje}</p>
        )}

        <p className="registro-login">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login">Inicia sesión aquí</Link>
        </p>

        <Link to="/" className="registro-volver">
          Volver al inicio
        </Link>

      </div>

    </div>
  );
}

export default Registro;
