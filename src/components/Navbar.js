import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../img/logo.png';
import '../css/navbar.css';

export default function Navbar({ totalItems = 0, onAbrirCarrito }) {
  return (
    <header className="header-home">
      <Link to="/" className="logo-home">
        <img src={logoImg} alt="CHRONOS" />
      </Link>

      <nav className="menu-home">
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/nosotros">Nosotros</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/contacto">Contacto</Link>
        <button 
          type="button" 
          className="carrito" 
          id="carrito-contador"
          onClick={onAbrirCarrito}
          style={{
            background: 'none',
            border: 'none',
            color: 'gold',
            fontSize: '16px',
            cursor: 'pointer',
            marginLeft: '15px'
          }}
        >
          🛒 Carrito ({totalItems})
        </button>
      </nav>

      <div className="cuenta-home">

        <Link to="/registro" className="enlace-registro">
          Registrarse
        </Link>

        <Link to="/login" className="boton-login">
          Iniciar sesión
        </Link>
      </div>
    </header>
  );
}