import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import PanelAdmin from '../../components/admin/PanelAdmin';
import UsuarioForm from '../../components/usuarios/UsuarioForm';
import { crear } from '../../services/usuarioService';

function CrearUsuario() {
  const navigate = useNavigate();

  function guardar(datos) {
    crear(datos);
    navigate('/admin-usuarios-lista');
  }

  return (
    <PanelAdmin>
      <div className="encabezado-pagina">
        <div>
          <h1>Crear usuario</h1>
          <p className="texto-suave mb-0">La cuenta queda activa apenas la guardas.</p>
        </div>
        <Link to="/admin-usuarios-lista" className="enlace-admin">Volver a la lista</Link>
      </div>
      <Card>
        <Card.Body className="p-4">
          <UsuarioForm modo="crear" onGuardar={guardar} />
        </Card.Body>
      </Card>
    </PanelAdmin>
  );
}

export default CrearUsuario;
