import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/productos.css';
import PanelAdmin from '../../components/admin/PanelAdmin';
import { Card } from 'react-bootstrap';

export default function HomeAdmin() {
  return (
    <PanelAdmin>
        <div className="encabezado-pagina">
          <div>
            <h1>Productos</h1>
          </div>
        </div>
        <Card>
        <Card.Body className="p-4 d-flex flex-column flex-sm-row gap-3 align-items-sm-center justify-content-between">
          <p className="mb-0">Crea nuevos productos o revisa, edita y elimina los existentes.</p>
          <div className="d-grid d-sm-flex gap-2">
            <Link to="/admin-productos-nuevo" className="btn btn-chronos">Crear Producto</Link>
            <Link to="/admin-productos-lista" className="btn btn-chronos-contorno">Ver Productos</Link>
          </div>
        </Card.Body>
      </Card>
    </PanelAdmin>
  );
}



/*

<div className="admin-container">
        <div className="admin-card" style={{ textAlign: 'center', padding: '40px 24px' }}>
          <h1 className="admin-titulo" style={{ marginBottom: '10px' }}>
            Panel de Administración
          </h1>
          <p style={{ color: '#666666', marginBottom: '35px', fontSize: '1rem' }}>
            Selecciona una opción para gestionar el inventario del catálogo de relojes.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-panel btn-panel-crear"
              onClick={() => navigate('/admin-productos-nuevo')}
            >
              Crear Producto
            </button>

            <button
              type="button"
              className="btn-panel btn-panel-listar"
              onClick={() => navigate('/admin-productos-lista')}
            >
              Mostrar Productos
            </button>
          </div>
        </div>
      </div>

*/