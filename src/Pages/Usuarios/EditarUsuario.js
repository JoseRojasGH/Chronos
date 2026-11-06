import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Alert, Card } from 'react-bootstrap';
import PanelAdmin from '../../components/admin/PanelAdmin';
import UsuarioForm from '../../components/usuarios/UsuarioForm';
import { actualizar, obtenerPorId } from '../../services/usuarioService';

function EditarUsuario() {
  const { id } = useParams(); // viene de la ruta /admin-usuarios-editar/:id
  const navigate = useNavigate();
  const usuario = obtenerPorId(id);
  const [mensajeError, setMensajeError] = useState(''); 

  if (!usuario) {
    return (
      <PanelAdmin>
        <h1>Usuario no encontrado</h1>
        <p className="texto-suave">Puede que lo hayan eliminado. Revisa la lista actualizada.</p>
        <Link to="/admin-usuarios-lista" className="btn btn-chronos-contorno">Volver a la lista</Link>
      </PanelAdmin>
    );
  }

  function guardar(datos) {
    try {
      actualizar(id, datos);
      navigate('/admin-usuarios-lista');
    } catch (error) {
      setMensajeError(error.message);
    }
  }

  return (
    <PanelAdmin>
      <div className="encabezado-pagina">
        <div>
          <h1>Editar usuario</h1>
          <p className="texto-suave mb-0">{usuario.nombreCompleto}</p>
        </div>
        <Link to="/admin-usuarios-lista" className="enlace-admin">Volver a la lista</Link>
      </div>
      {mensajeError && (
        <Alert variant="danger" dismissible onClose={() => setMensajeError('')}>{mensajeError}</Alert>
      )}
      <Card>
        <Card.Body className="p-4">
          <UsuarioForm modo="editar" usuarioInicial={usuario} onGuardar={guardar} />
        </Card.Body>
      </Card>
    </PanelAdmin>
  );
}

export default EditarUsuario;
