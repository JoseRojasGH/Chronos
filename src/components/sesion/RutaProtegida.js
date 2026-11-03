import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { obtenerSesion } from '../../services/sesionService';
import { ROLES } from '../../models/Usuario';

// Se usa como ruta contenedora en App.js. Revisa la sesión cada vez que se
// navega a una de sus rutas hijas.
//   sin sesión          -> /login
//   rol distinto        -> /
export default function RutaProtegida({ rolRequerido = ROLES.ADMIN }) {
  const usuario = obtenerSesion();

  if (!usuario) return <Navigate to="/login" replace />;
  if (usuario.rol !== rolRequerido) return <Navigate to="/" replace />;

  return <Outlet />;
}
