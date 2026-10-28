import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import UsuarioForm from '../components/usuarios/UsuarioForm';
import { actualizar, obtenerPorId } from '../services/usuarioService';

function EditarUsuario() {
  const { id } = useParams(); // viene de la ruta /admin-usuarios-editar/:id
  const navigate = useNavigate();
  const usuario = obtenerPorId(id);

  if (!usuario) {
    return (
      <main>
        <h1>Usuario no encontrado</h1>
        <Link to="/admin-usuarios-lista">Volver a la lista</Link>
      </main>
    );
  }

  function guardar(datos) {
    actualizar(id, datos);
    navigate('/admin-usuarios-lista');
  }

  return (
    <main>
      <h1>Editar usuario</h1>
      <UsuarioForm modo="editar" usuarioInicial={usuario} onGuardar={guardar} />
    </main>
  );
}

export default EditarUsuario;
