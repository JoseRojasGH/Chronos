import React from 'react';
import { useNavigate } from 'react-router-dom';
import UsuarioForm from '../../components/usuarios/UsuarioForm';
import { crear } from '../../services/usuarioService';

function CrearUsuario() {
  const navigate = useNavigate();

  function guardar(datos) {
    crear(datos);
    navigate('/admin-usuarios-lista');
  }

  return (
    <main>
      <h1>Crear usuario</h1>
      <UsuarioForm modo="crear" onGuardar={guardar} />
    </main>
  );
}

export default CrearUsuario;
