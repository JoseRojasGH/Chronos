import React from 'react';
import { Link } from 'react-router-dom';
import BotonCerrarSesion from '../sesion/BotonCerrarSesion';
import '../../css/tema-chronos.css';

// Contenedor común de las páginas de administración: encabezado con la marca,
// enlace al panel y botón para cerrar sesión.
function PanelAdmin({ children }) {
  return (
    <div className="tema-chronos" data-bs-theme="dark">
      <header className="barra-admin">
        <Link to="/admin-home" className="marca-admin">
          CHRONOS
          <small>Panel de administración</small>
        </Link>
        <nav className="acciones-admin" aria-label="Administración">
          <Link to="/admin-home" className="enlace-admin">Inicio del panel</Link>
          <BotonCerrarSesion className="btn btn-chronos-contorno btn-sm" />
        </nav>
      </header>
      <main className="contenido-admin">{children}</main>
    </div>
  );
}

export default PanelAdmin;
