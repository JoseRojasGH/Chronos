import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cerrarSesion } from '../../services/sesionService';

export default function BotonCerrarSesion({ className = '' }) {
  const navigate = useNavigate();

  function salir() {
    cerrarSesion();
    navigate('/login', { replace: true });
  }

  return (
    <button type="button" className={className} onClick={salir}>
      Cerrar sesión
    </button>
  );
}
