import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, Modal, Table } from 'react-bootstrap';
import PanelAdmin from '../../components/admin/PanelAdmin';
import { eliminar, obtenerTodos } from '../../services/usuarioService';
import { ROLES } from '../../models/Usuario';

function MostrarUsuarios() {
  const [usuarios, setUsuarios] = useState(() => obtenerTodos());
  const [mensajeError, setMensajeError] = useState('');
  const [porEliminar, setPorEliminar] = useState(null); // usuario esperando confirmación

  function confirmarEliminacion() {
    try {
      eliminar(porEliminar.id);
      setMensajeError('');
      setUsuarios(obtenerTodos());
    } catch (error) {
      setMensajeError(error.message);
    }
    setPorEliminar(null);
  }
  

  if (usuarios.length === 0) {
    return (
      <PanelAdmin>
        <h1>Usuarios</h1>
        <Card className="mt-3">
          <Card.Body className="p-4">
            <p>Todavía no hay usuarios registrados.</p>
            <Link to="/admin-usuarios-nuevo" className="btn btn-chronos">Crear el primero</Link>
          </Card.Body>
        </Card>
      </PanelAdmin>
    );
  }

  return (
    <PanelAdmin>
      <div className="encabezado-pagina">
        <div>
          <h1>Usuarios</h1>
          <p className="texto-suave mb-0">{usuarios.length} en total</p>
        </div>
        <Link to="/admin-usuarios-nuevo" className="btn btn-chronos">Crear usuario</Link>
      </div>

      {mensajeError && (
        <Alert variant="danger" dismissible onClose={() => setMensajeError('')}>{mensajeError}</Alert>
      )}

      <Table responsive hover className="tabla-usuarios">
        <thead>
          <tr><th>Nombre</th><th>Correo</th><th>Rol</th><th className="text-end">Acciones</th></tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.nombreCompleto}</td>
              <td>{u.correo}</td>
              <td>
                <span className={`rol-usuario ${u.rol === ROLES.ADMIN ? 'rol-usuario--admin' : ''}`}>
                  {u.rol === ROLES.ADMIN ? 'Administrador' : 'Cliente'}
                </span>
              </td>
              <td className="text-end">
                <Link to={`/admin-usuarios-editar/${u.id}`} className="btn btn-chronos-contorno btn-sm me-2">
                  Editar
                </Link>
                <Button variant="outline-danger" size="sm" onClick={() => setPorEliminar(u)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        show={Boolean(porEliminar)}
        onHide={() => setPorEliminar(null)}
        centered
        data-bs-theme="dark"
        contentClassName="modal-chronos"
      >
        <Modal.Header closeButton>
          <Modal.Title>Eliminar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Eliminar a <strong>{porEliminar?.nombreCompleto}</strong>? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-chronos-contorno" onClick={() => setPorEliminar(null)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmarEliminacion}>Eliminar usuario</Button>
        </Modal.Footer>
      </Modal>
    </PanelAdmin>
  );
}

export default MostrarUsuarios;
