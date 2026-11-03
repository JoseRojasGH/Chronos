import React, { useState, useEffect } from 'react';
import '../../css/productos.css';

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
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem('productos');
    if (guardados) {
      return JSON.parse(guardados);
    } else {
      localStorage.setItem('productos', JSON.stringify(PRODUCTOS_INICIALES));
      return PRODUCTOS_INICIALES;
    }
  });

  const [editandoId, setEditandoId] = useState(null);
  const [formEdit, setFormEdit] = useState({ nombre: '', precio: '' });

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

  const eliminarProducto = (id) => {
    if (window.confirm('¿Deseas eliminar este producto?')) {
      const nuevaLista = productos.filter((p) => p.id !== id);
      setProductos(nuevaLista);
    }
  };

  const iniciarEdicion = (prod) => {
    setEditandoId(prod.id);
    setFormEdit({
      nombre: prod.nombre,
      precio: prod.precio
    });
  };

  const guardarEdicion = (id) => {
    const nombreLimpio = formEdit.nombre.trim();
    const precioNumerico = parseInt(formEdit.precio, 10);

    // Validación 1: Campos vacíos
    if (!nombreLimpio || !formEdit.precio) {
      alert('El nombre y el precio no pueden estar vacíos.');
      return;
    }

    // Validación 2: Números negativos o cero
    if (isNaN(precioNumerico) || precioNumerico <= 0) {
      alert('El precio debe ser un número mayor a 0.');
      return;
    }

    setProductos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, nombre: nombreLimpio, precio: precioNumerico } : p
      )
    );
    setEditandoId(null);
  };

  return (
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
    
  );
}