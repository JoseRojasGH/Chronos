import React, { useState, useEffect } from 'react';
import '../../css/productos.css';
import PanelAdmin from '../../components/admin/PanelAdmin';
import { Button, Modal, Card, Alert, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const PRODUCTOS_INICIALES = [
  { id: 1, nombre: 'Michael Kors', precio: 199990, imagen: '/img/relojmk.png', descripcion: 'Estilo moderno y sofisticado' },
  { id: 2, nombre: 'Rolex', precio: 8990000, imagen: '/img/relojrolex.png', descripcion: 'Rendimiento y elegancia legendaria' },
  { id: 3, nombre: 'Tommy Hilfiger', precio: 149990, imagen: '/img/relojtommy.png', descripcion: 'Diseño deportivo y elegante' },
  { id: 4, nombre: 'Armani', precio: 390990, imagen: '/img/relojarmani.png', descripcion: 'Diseño moderno y sofisticado' },
  { id: 5, nombre: 'Casio', precio: 59990, imagen: '/img/relojcasio.png', descripcion: 'Diseño elegante' },
  { id: 6, nombre: 'Seiko', precio: 249990, imagen: '/img/relojseiko.png', descripcion: 'Reloj automático de buceo' },
  { id: 7, nombre: 'Fossil', precio: 129990, imagen: '/img/relojfossil.png', descripcion: 'Estilo clásico y moderno' },
  { id: 8, nombre: 'Guess', precio: 179990, imagen: '/img/relojguess.png', descripcion: 'Cronógrafo moderno y elegante' },
  { id: 9, nombre: 'Citizen', precio: 299990, imagen: '/img/relojcitizen.png', descripcion: 'Cronógrafo deportivo y elegante' },
  { id: 10, nombre: 'Diesel', precio: 159990, imagen: '/img/relojdiesel.png', descripcion: 'Estilo urbano y rebelde' },
  { id: 11, nombre: 'Swatch', precio: 89990, imagen: '/img/relojswatch.png', descripcion: 'Reloj de origen suizo' },
  { id: 12, nombre: 'Tissot', precio: 450990, imagen: '/img/relojtissot.png', descripcion: 'Cronógrafo elegante' }
];

export default function ListarProductos() {
  const [porEliminar, setPorEliminar] = useState(null);
  const [mensajeError, setMensajeError] = useState('');
  const [productos, setProductos] = useState(() => {
  const guardados = localStorage.getItem('productos');
    if (guardados) {
      return JSON.parse(guardados);
    } else {
      localStorage.setItem('productos', JSON.stringify(PRODUCTOS_INICIALES));
      return PRODUCTOS_INICIALES;
    }
  });




  // Guardar en localStorage cada vez que cambia el estado
  useEffect(() => {
    if (productos.length === 0) {
      localStorage.setItem('productos', JSON.stringify([]));
    } else {
      localStorage.setItem('productos', JSON.stringify(productos));
    }
  }, [productos]);

  // Sincronización en tiempo real entre pestañas/vistas
  useEffect(() => {
    const sincronizarStorage = (e) => {
      if (e.key === 'productos') {
        setProductos(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };
    window.addEventListener('storage', sincronizarStorage);
    return () => window.removeEventListener('storage', sincronizarStorage);
  }, []);

  const formatearPrecio = (numero) => '$' + Number(numero).toLocaleString('es-CL');

  
  const eliminar = (id) => {
    setProductos(productosActuales => 
      productosActuales.filter(producto => producto.id !== id)
    );
  };

  function confirmarEliminacion() {
      try {
        eliminar(porEliminar.id);
        setMensajeError('');
      } catch (error) {
        setMensajeError(error.message);
      }
      setPorEliminar(null);
    }



  if (productos.length === 0) {
    return (
      <PanelAdmin>
        <h1>Productos</h1>
        <Card className="mt-3">
          <Card.Body className="p-4">
            <p>No se encontraron productos registrados.</p>
            <Link to="/admin-productos-nuevo" className="btn btn-chronos">Crear el primero</Link>
          </Card.Body>
        </Card>
      </PanelAdmin>
    );
  }


  return (
    <PanelAdmin>
      <div className="encabezado-pagina">
        <div>
          <h1>Productos</h1>
          <p className="texto-suave mb-0">{productos.length} en total</p>
        </div>
        <Link to="/admin-productos-nuevo" className="btn btn-chronos">Crear producto</Link>
      </div>

      {mensajeError && (
        <Alert variant="danger" dismissible onClose={() => setMensajeError('')}>{mensajeError}</Alert>
      )}

      <Table responsive hover className="tabla-usuarios">
        <thead>
          <tr><th>Nombre</th><th>Precio</th><th className="text-end">Acciones</th></tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{formatearPrecio(p.precio)}</td>
              <td className="text-end">
                <Link to={`/admin-productos-editar/${p.id}`} className="btn btn-chronos-contorno btn-sm me-2">
                  Editar
                </Link>
                <Button variant="outline-danger" size="sm" onClick={() => setPorEliminar(p)}>
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
          <Modal.Title>Eliminar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Eliminar a <strong>{porEliminar?.nombre}</strong>? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-chronos-contorno" onClick={() => setPorEliminar(null)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmarEliminacion}>Eliminar producto</Button>
        </Modal.Footer>
      </Modal>
    </PanelAdmin>    
  );
}



/*

<div>
      <div className="admin-container">
      <div className="admin-card">
        <h2 className="admin-titulo">Administración de Productos</h2>

        {productos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>No hay productos en el inventario.</p>
        ) : (
          <table className="tabla-productos">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th className="col-acciones">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod) => (
                <tr key={prod.id}>
                  {editandoId === prod.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          className="input-edicion"
                          value={formEdit.nombre}
                          onChange={(e) => setFormEdit({ ...formEdit, nombre: e.target.value })}
                          placeholder="Nombre del reloj"
                          required
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="input-edicion"
                          value={formEdit.precio}
                          min="1"
                          onChange={(e) => setFormEdit({ ...formEdit, precio: e.target.value })}
                          placeholder="Precio mayor a 0"
                          required
                        />
                      </td>
                      <td className="col-acciones">
                        <button
                          type="button"
                          className="btn-accion btn-guardar"
                          onClick={() => guardarEdicion(prod.id)}
                        >
                          Guardar
                        </button>
                        <button
                          type="button"
                          className="btn-accion btn-cancelar"
                          onClick={() => setEditandoId(null)}
                        >
                          Cancelar
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{prod.nombre}</td>
                      <td>{formatearPrecio(prod.precio)}</td>
                      <td className="col-acciones">
                        <button
                          type="button"
                          className="btn-accion btn-editar"
                          onClick={() => iniciarEdicion(prod)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn-accion btn-eliminar"
                          onClick={() => eliminarProducto(prod.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    </div>

*/