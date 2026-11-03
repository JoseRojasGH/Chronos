
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { crear } from '../services/usuarioService';
import { validarUsuario } from '../utils/validacionesUsuario';
import { ROLES } from '../models/Usuario';
import './Registro.css';

function Registro() {

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [mensaje, setMensaje] = useState('');

  function registrar(e) {
    e.preventDefault();

    const datos = {
      nombre,
      apellido,
      correo,
      contrasena,
      confirmacion,
      rol: ROLES.CLIENTE
    };

    const errores = validarUsuario(datos);

    if (Object.keys(errores).length > 0) {
      setMensaje(Object.values(errores)[0]);
      return;
    }

    try {
      crear({
        nombre,
        apellido,
        correo,
        contrasena,
        rol: ROLES.CLIENTE
      });

      setMensaje('¡Cuenta creada correctamente! Ya puedes iniciar sesión.');

      setNombre('');
      setApellido('');
      setCorreo('');
      setContrasena('');
      setConfirmacion('');

    } catch (error) {
      setMensaje('No se pudo crear la cuenta. Inténtalo nuevamente.');
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

          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            placeholder="Ingresa tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label htmlFor="apellido">Apellido</label>
          <input
            id="apellido"
            type="text"
            placeholder="Ingresa tu apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
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
            placeholder="Mínimo 8 caracteres, mayúscula y número"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />

          <label htmlFor="confirmarClave">
            Confirmar contraseña
          </label>
          <input
            id="confirmarClave"
            type="password"
            placeholder="Repite tu contraseña"
            value={confirmacion}
            onChange={(e) => setConfirmacion(e.target.value)}
            required
          />

          <button type="submit" className="registro-boton">
            Crear cuenta
          </button>

        </form>

        {/* Mensaje de validación */}
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
