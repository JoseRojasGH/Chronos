import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { eliminar, obtenerTodos } from '../../services/usuarioService';

function MostrarUsuarios() {
  const [usuarios, setUsuarios] = useState(() => obtenerTodos());
  const [mensajeError, setMensajeError] = useState('');

  function eliminarUsuario(usuario) {
    if (!window.confirm(`¿Eliminar a ${usuario.nombreCompleto}?`)) return;
    try {
      eliminar(usuario.id);
      setMensajeError('');
      setUsuarios(obtenerTodos());
    } catch (error) {
      setMensajeError(error.message);
    }
  }

  if (usuarios.length === 0) {
    return (
      <main>
        <h1>Usuarios</h1>
        <p>Todavía no hay usuarios registrados.</p>
        <Link to="/admin-usuarios-nuevo">Crear el primero</Link>
      </main>
    );
  }

  return (
    <main>
      <h1>Usuarios</h1>
      {mensajeError && <p role="alert">{mensajeError}</p>}
      <Link to="/admin-usuarios-nuevo">Crear usuario</Link>
      <table>
        <thead>
          <tr><th>Nombre</th><th>Correo</th><th>Rolx</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.nombreCompleto}</td>
              <td>{u.correo}</td>
              <td>{u.rol}</td>
              <td>
                <Link to={`/admin-usuarios-editar/${u.id}`}>Editar</Link>
                {' '}
                <button type="button" onClick={() => eliminarUsuario(u)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default MostrarUsuarios;
