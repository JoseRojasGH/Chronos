import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PanelAdmin from '../../components/admin/PanelAdmin';
import '../../css/productos.css';
import { Button } from 'react-bootstrap';

const PRODUCTOS_INICIALES = [
  { id: 1, nombre: 'Michael Kors', precio: 199990, imagen: '/img/relojmk.png', descripcion: 'Estilo moderno y sofisticado' },
  { id: 2, nombre: 'Rolex', precio: 8990000, imagen: '/img/relojrolex.png', descripcion: 'Rendimiento y elegancia legendaria' }
];

export default function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productoEncontrado, setProductoEncontrado] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: ''
  });
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    const guardados = localStorage.getItem('productos');
    const productos = guardados ? JSON.parse(guardados) : PRODUCTOS_INICIALES;
    
    const prod = productos.find((item) => item.id === Number(id));

    if (prod) {
      setFormData({
        nombre: prod.nombre,
        precio: prod.precio,
        descripcion: prod.descripcion || ''
      });
      setProductoEncontrado(true);
    } else {
      setProductoEncontrado(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensajeError('');

    const nombreLimpio = formData.nombre.trim();
    const descripcionLimpia = formData.descripcion.trim();
    const precioNumerico = parseInt(formData.precio, 10);

    // 1. Validar campos obligatorios no vacíos
    if (!nombreLimpio || !formData.precio || !descripcionLimpia) {
      setMensajeError('Por favor, completa todos los campos obligatorios (Nombre, Precio y Descripción).');
      return;
    }

    // 2. Validar precio positivo
    if (isNaN(precioNumerico) || precioNumerico <= 0) {
      setMensajeError('El precio debe ser un número entero mayor a 0.');
      return;
    }

    // 3. Actualizar en localStorage
    const guardados = localStorage.getItem('productos');
    const productos = guardados ? JSON.parse(guardados) : PRODUCTOS_INICIALES;

    const listaActualizada = productos.map((item) => {
      if (item.id === Number(id)) {
        return {
          ...item,
          nombre: nombreLimpio,
          precio: precioNumerico,
          descripcion: descripcionLimpia
        };
      }
      return item;
    });

    localStorage.setItem('productos', JSON.stringify(listaActualizada));

    // Notificar a otras pestañas/componentes
    window.dispatchEvent(new Event('storage'));

    // 4. Redirigir a la lista
    navigate('/admin/productos');
  };

  if (!productoEncontrado) {
    return (
      <PanelAdmin>
          <h1>Producto no encontrado</h1>
          <p className="texto-suave mb-0">El producto solicitado no existe o fue eliminado del inventario.</p>
          <Link to="/admin-productos-lista" className="btn btn-chronos-contorno">
            Volver a la lista
          </Link>
      </PanelAdmin>
    );
  }

  return (
    <PanelAdmin>
      <div className="encabezado-pagina">
            <div>
            <h1>Editar producto</h1>
            </div>
            <Link to="/admin-productos-lista" className="enlace-admin">Volver a la lista</Link>
      </div>

        {mensajeError && (
          <div style={{ color: '#e65c5c', backgroundColor: 'rgba(230, 92, 92, 0.1)', padding: '10px', borderRadius: '6px', marginBottom: '15px', textAlign: 'center' }}>
            {mensajeError}
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
    </PanelAdmin>
  );
}