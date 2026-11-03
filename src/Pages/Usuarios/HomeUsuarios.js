import React from 'react';
import { Link } from 'react-router-dom';
import { obtenerTodos } from '../../services/usuarioService';

function HomeUsuarios() {
  const totalUsuarios = obtenerTodos().length;

  return (
    <main>
      <h1>Usuarios</h1>
      <p>Usuarios registrados: {totalUsuarios}</p>
      <nav>
        <Link to="/admin-usuarios-nuevo">Crear usuario</Link>
        {' | '}
        <Link to="/admin-usuarios-lista">Ver usuarios</Link>
      </nav>
    </main>
  );
}

export default HomeUsuarios;
