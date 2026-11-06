import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../css/productos.css';
import PanelAdmin from '../../components/admin/PanelAdmin';
import { Button, Card } from 'react-bootstrap';

const IMAGEN_PLACEHOLDER = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%231a1a1a"/><path d="M75 75 L225 225 M225 75 L75 225" stroke="%23c5a059" stroke-width="8" stroke-linecap="round"/></svg>`;

const PRODUCTOS_INICIALES = [
  { id: 1, nombre: 'Michael Kors', precio: 199990, imagen: '/img/relojmk.png', descripcion: 'Estilo moderno y sofisticado' },
  { id: 2, nombre: 'Rolex', precio: 8990000, imagen: '/img/relojrolex.png', descripcion: 'Rendimiento y elegancia legendaria' }
];

export default function CrearProducto() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: ''
  });

  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setExito('');

    const nombreLimpio = formData.nombre.trim();
    const descripcionLimpia = formData.descripcion.trim();
    const precioNumerico = parseInt(formData.precio, 10);

    // 1. Validar campos obligatorios
    if (!nombreLimpio || !formData.precio || !descripcionLimpia) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    // 2. Validar precio positivo
    if (isNaN(precioNumerico) || precioNumerico <= 0) {
      setError('El precio debe ser un número entero mayor a 0.');
      return;
    }

    // 3. Leer lista actual de localStorage
    const guardados = localStorage.getItem('productos');
    const listaActual = guardados ? JSON.parse(guardados) : PRODUCTOS_INICIALES;

    // 4. Crear nuevo producto asignando el placeholder con la "X"
    const nuevoProducto = {
      id: Date.now(),
      nombre: nombreLimpio,
      precio: precioNumerico,
      descripcion: descripcionLimpia,
      imagen: IMAGEN_PLACEHOLDER
    };

    // 5. Guardar en localStorage
    const nuevaLista = [...listaActual, nuevoProducto];
    localStorage.setItem('productos', JSON.stringify(nuevaLista));

    setExito('¡Producto creado con éxito! Redirigiendo al catálogo...');

    setTimeout(() => {
      navigate('/admin-productos-lista');
    }, 1500);
  };

  return (
      <PanelAdmin>
          <div className="encabezado-pagina">
            <div>
              <h1>Crear producto</h1>
            </div>
            <Link to="/admin-productos-lista" className="enlace-admin">Volver a la lista</Link>
          </div>

        <Card>
          <Card.Body className="p-4">
            {error && (
              <div style={{ color: '#e65c5c', backgroundColor: 'rgba(230, 92, 92, 0.1)', padding: '10px', borderRadius: '6px', marginBottom: '15px', textAlign: 'center' }}>
                {error}
              </div>
            )}

            {exito && (
              <div style={{ color: '#28a745', backgroundColor: 'rgba(40, 167, 69, 0.1)', padding: '10px', borderRadius: '6px', marginBottom: '15px', textAlign: 'center' }}>
                {exito}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#FFFFFF' }}>
                  Nombre del Reloj *
                </label>
                <input
                  type="text"
                  name="nombre"
                  className="input-edicion"
                  style={{ width: '100%', boxSizing: 'border-box' }}
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Tag Heuer Carrera"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#FFFFFF' }}>
                  Precio (CLP) *
                </label>
                <input
                  type="number"
                  name="precio"
                  min="1"
                  className="input-edicion"
                  style={{ width: '100%', boxSizing: 'border-box' }}
                  value={formData.precio}
                  onChange={handleChange}
                  placeholder="Ej: 350000"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#FFFFFF' }}>
                  Descripción *
                </label>
                <textarea
                  name="descripcion"
                  rows="4"
                  className="input-edicion"
                  style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'inherit' }}
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Detalles sobre el diseño, resistencia, tipo de correa, etc."
                  required
                />
              </div>

              <div className="d-grid d-sm-block mt-4">
                <Button
                  type="submit"
                  className="btn-chronos px-4"
                >
                  Guardar Cambios
                </Button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </PanelAdmin>
  );
}