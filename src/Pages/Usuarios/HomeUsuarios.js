import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import PanelAdmin from '../../components/admin/PanelAdmin';
import { obtenerTodos } from '../../services/usuarioService';
import { ROLES } from '../../models/Usuario';

function HomeUsuarios() {
  const usuarios = obtenerTodos();
  const admins = usuarios.filter((u) => u.rol === ROLES.ADMIN).length;
  const clientes = usuarios.length - admins;

  return (
    <PanelAdmin>
      <div className="encabezado-pagina">
        <div>
          <h1>Usuarios</h1>
          <p className="texto-suave mb-0">
            {usuarios.length} {usuarios.length === 1 ? 'usuario registrado' : 'usuarios registrados'}:{' '}
            {admins} {admins === 1 ? 'administrador' : 'administradores'} y{' '}
            {clientes} {clientes === 1 ? 'cliente' : 'clientes'}.
          </p>
        </div>
      </div>

      <Card>
        <Card.Body className="p-4 d-flex flex-column flex-sm-row gap-3 align-items-sm-center justify-content-between">
          <p className="mb-0">Crea cuentas nuevas o revisa, edita y elimina las existentes.</p>
          <div className="d-grid d-sm-flex gap-2">
            <Link to="/admin-usuarios-nuevo" className="btn btn-chronos">Crear usuario</Link>
            <Link to="/admin-usuarios-lista" className="btn btn-chronos-contorno">Ver usuarios</Link>
          </div>
        </Card.Body>
      </Card>
    </PanelAdmin>
  );
}

export default HomeUsuarios;
