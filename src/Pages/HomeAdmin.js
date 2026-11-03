
import React from 'react';
import { Link } from 'react-router-dom';

function HomeAdmin() {
  return (
    <div className="home-admin">

      <header className="header-admin">
        <h1>CHRONOS</h1>
        <h2>Panel de Administración</h2>
      </header>

      <main className="contenido-admin">
        <h2>Bienvenido, Administrador</h2>
        <p>Selecciona la sección que deseas administrar.</p>

        <div className="opciones-admin">

          <div className="tarjeta-admin">
            <h3>Usuarios</h3>
            <p>Gestionar los usuarios registrados.</p>
            <Link to="/admin-usuarios">
              Administrar Usuarios
            </Link>
          </div>

          <div className="tarjeta-admin">
            <h3>Productos</h3>
            <p>Gestionar los productos de la tienda.</p>
            <Link to="/admin-productos">
              Administrar Productos
            </Link>
          </div>

        </div>
      </main>

    </div>
  );
}

export default HomeAdmin;
