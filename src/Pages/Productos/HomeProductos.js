import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/productos.css';

export default function HomeAdmin() {
  const navigate = useNavigate();

  return (
    <>

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
    </>
  );
}