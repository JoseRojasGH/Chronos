import React, { useState, useEffect } from 'react';
import '../css/productos.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import relojMk from '../img/relojmk.png';
import relojRolex from '../img/relojrolex.png';
import relojTommy from '../img/relojtommy.png';
import relojArmani from '../img/relojarmani.png';
import relojCasio from '../img/relojcasio.png';
import relojSeiko from '../img/relojseiko.png';
import relojFossil from '../img/relojfossil.png';
import relojGuess from '../img/relojguess.png';
import relojCitizen from '../img/relojcitizen.png';
import relojDiesel from '../img/relojdiesel.png';
import relojSwatch from '../img/relojswatch.png';
import relojTissot from '../img/relojtissot.png';

const PRODUCTOS_INICIALES = [
  { id: 1, nombre: 'Michael Kors', precio: 199990, imagen: relojMk, descripcion: 'Estilo moderno y sofisticado, Cronógrafo con caja de acero inoxidable y diseño icónico' },
  { id: 2, nombre: 'Rolex', precio: 8990000, imagen: relojRolex, descripcion: 'Rendimiento y elegancia en una pieza legendaria. Resistente al agua hasta 300 metros' },
  { id: 3, nombre: 'Tommy Hilfiger', precio: 149990, imagen: relojTommy, descripcion: 'Diseño deportivo y elegante, correa de cuero, cronógrafo y detalles en los colores icónicos' },
  { id: 4, nombre: 'Armani', precio: 390990, imagen: relojArmani, descripcion: 'Diseño moderno y sofisticado. Cronógrafo con caja de acero inoxidable y estilo icónico' },
  { id: 5, nombre: 'Casio', precio: 59990, imagen: relojCasio, descripcion: 'Diseño elegante. Cronógrafo con presición japonesa y resistente al agua' },
  { id: 6, nombre: 'Seiko', precio: 249990, imagen: relojSeiko, descripcion: 'Reloj automático de buceo. Cronógrafo con resistencia al agua de 200 metros' },
  { id: 7, nombre: 'Fossil', precio: 129990, imagen: relojFossil, descripcion: 'Estilo clásico y moderno. Cronógrafo con caja de acero inoxidable y correa de cuero' },
  { id: 8, nombre: 'Guess', precio: 179990, imagen: relojGuess, descripcion: 'Cronógrafo moderno y elegante. Diseño con caja de acero inoxidable, esfera azul y brazalete metálico' },
  { id: 9, nombre: 'Citizen', precio: 299990, imagen: relojCitizen, descripcion: 'Cronógrafo deportivo y elegante. Funciona con tecnologia Eco-Drive, se carga con la luz y no requiere cambio de batería' },
  { id: 10, nombre: 'Diesel', precio: 159990, imagen: relojDiesel, descripcion: 'Estilo urbano y rebelde. Cronógrafo con caja de acero inoxidable y diseño icónico' },
  { id: 11, nombre: 'Swatch', precio: 89990, imagen: relojSwatch, descripcion: 'Reloj de origen suizo. Diesño moderno icónico, ligero y colorido' },
  { id: 12, nombre: 'Tissot', precio: 450990, imagen: relojTissot, descripcion: 'Cronógrafo elegante. Diseño suizo con caja de acero inoxidable' }
];

export default function Productos() {
  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem('productos');
    if (guardados) {
      return JSON.parse(guardados);
    } else {
      localStorage.setItem('productos', JSON.stringify(PRODUCTOS_INICIALES));
      return PRODUCTOS_INICIALES;
    }
  });

  // Escuchador para actualizar los productos en tiempo real al navegar o cambiar de pestaña
  useEffect(() => {
    const actualizarProductos = (e) => {
      if (e.key === 'productos') {
        setProductos(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };
    window.addEventListener('storage', actualizarProductos);
    return () => window.removeEventListener('storage', actualizarProductos);
  }, []);

  // Carrito persistente en localStorage
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carrito');
    return guardado ? JSON.parse(guardado) : [];
  });

  const [cantidades, setCantidades] = useState({});
  const [productoModal, setProductoModal] = useState(null);
  const [cantidadModal, setCantidadModal] = useState(1);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const formatearPrecio = (numero) => {
    return '$' + numero.toLocaleString('es-CL');
  };

  const cambiarCantidad = (id, delta) => {
    setCantidades((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  const agregarAlCarrito = (producto, cantidad) => {
    if (cantidad <= 0) return;

    setCarrito((prev) => {
      const idx = prev.findIndex((item) => item.id === producto.id);
      if (idx >= 0) {
        const nuevo = [...prev];
        nuevo[idx].cantidad += cantidad;
        return nuevo;
      }
      return [...prev, { ...producto, cantidad }];
    });

    setCantidades((prev) => ({ ...prev, [producto.id]: 0 }));
  };

  const abrirModal = (producto) => {
    setProductoModal(producto);
    setCantidadModal(1);
  };

  const cambiarCantidadModal = (delta) => {
    setCantidadModal((prev) => Math.max(1, prev + delta));
  };

  const cambiarCantidadCarrito = (id, delta) => {
    setCarrito((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nuevaCantidad = item.cantidad + delta;
            return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalMonto = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <>
      <Navbar 
        totalItems={totalItems} 
        onAbrirCarrito={() => setCarritoAbierto(true)} 
      />

      <div className="productos-container">
        <h2 className="titulo-catalogo">Catálogo Disponible</h2>

        <div className="productos-grid">
          {/* ✅ AQUÍ CAMBIAMOS PRODUCTOS_INICIALES POR productos */}
          {productos.map((prod) => (
            <div key={prod.id} className="producto-card" data-nombre={prod.nombre} data-precio={prod.precio}>
              <img
                src={prod.imagen}
                alt={prod.nombre}
                className="producto-img"
                onClick={() => abrirModal(prod)}
              />
              <h3>{prod.nombre}</h3>
              <p className="precio">{formatearPrecio(prod.precio)}</p>

              <div className="cantidad-selector">
                <button type="button" onClick={() => cambiarCantidad(prod.id, -1)}>-</button>
                <input
                  type="text"
                  className="cantidad-input"
                  value={cantidades[prod.id] || 0}
                  readOnly
                />
                <button type="button" onClick={() => cambiarCantidad(prod.id, 1)}>+</button>
              </div>

              <button
                type="button"
                onClick={() => agregarAlCarrito(prod, cantidades[prod.id] || 0)}
              >
                Añadir
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Detalle */}
      <div
        id="modal-overlay"
        className={`modal-overlay ${productoModal ? 'activo' : ''}`}
        onClick={(e) => e.target.id === 'modal-overlay' && setProductoModal(null)}
      >
        {productoModal && (
          <div className="modal-producto">
            <button type="button" className="modal-cerrar" onClick={() => setProductoModal(null)}>
              &times;
            </button>
            <img
              id="modal-img"
              className="producto-img modal-img"
              src={productoModal.imagen}
              alt={productoModal.nombre}
            />
            <h3 id="modal-nombre">{productoModal.nombre}</h3>
            <p className="precio" id="modal-precio">{formatearPrecio(productoModal.precio)}</p>
            <p className="modal-descripcion" id="modal-descripcion">
              {productoModal.descripcion || 'Descripción del producto próximamente.'}
            </p>

            <div className="cantidad-selector">
              <button type="button" onClick={() => cambiarCantidadModal(-1)}>-</button>
              <input
                type="text"
                id="modal-cantidad"
                className="cantidad-input"
                value={cantidadModal}
                readOnly
              />
              <button type="button" onClick={() => cambiarCantidadModal(1)}>+</button>
            </div>

            <button
              type="button"
              onClick={() => {
                agregarAlCarrito(productoModal, cantidadModal);
                setProductoModal(null);
              }}
            >
              Añadir al carrito
            </button>
          </div>
        )}
      </div>

      {/* Modal Carrito Lateral */}
      <div
        id="carrito-overlay"
        className={`carrito-overlay ${carritoAbierto ? 'activo' : ''}`}
        onClick={(e) => e.target.id === 'carrito-overlay' && setCarritoAbierto(false)}
      >
        <div className="carrito-panel">
          <div className="carrito-header">
            <h3>Tu Carrito</h3>
            <button type="button" className="carrito-cerrar" onClick={() => setCarritoAbierto(false)}>
              &times;
            </button>
          </div>

          <div className="carrito-lista" id="carrito-lista">
            {carrito.length === 0 ? (
              <p className="carrito-vacio">Tu carrito está vacío</p>
            ) : (
              carrito.map((item) => (
                <div key={item.id} className="carrito-item">
                  <div className="carrito-item-info">
                    <span className="nombre">{item.nombre}</span>
                    <span className="precio-unitario">{formatearPrecio(item.precio)} c/u</span>
                  </div>

                  <div className="carrito-item-controles">
                    <button type="button" onClick={() => cambiarCantidadCarrito(item.id, -1)}>-</button>
                    <span className="cantidad">{item.cantidad}</span>
                    <button type="button" onClick={() => cambiarCantidadCarrito(item.id, 1)}>+</button>
                    <button
                      type="button"
                      className="carrito-item-eliminar"
                      onClick={() => eliminarDelCarrito(item.id)}
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="carrito-total">
            <span>Total</span>
            <span id="carrito-total-monto">{formatearPrecio(totalMonto)}</span>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}