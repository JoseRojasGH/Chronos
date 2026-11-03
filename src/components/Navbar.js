import React from 'react';
import { Link } from 'react-router-dom';

// Importas la imagen desde la carpeta src/img/
import logoImg from '../img/logo.png'; 

export default function Navbar({ totalItems = 0, onAbrirCarrito }) {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <Link to="/">
              {/* Usas la variable importada entre llaves {} */}
              <img src={logoImg} width="350" alt="Logo" />
            </Link>
          </td>
          <td><Link to="/">Inicio</Link></td>
          <td><Link to="/productos">Productos</Link></td>
          <td><Link to="/registro">Registro</Link></td>
          <td><Link to="/login">Iniciar Sesión</Link></td>
          <td><Link to="/nosotros">Nosotros</Link></td>
          <td><Link to="/blogs">Blogs</Link></td>
          <td><Link to="/contacto">Contacto</Link></td>
          <td 
            className="carrito" 
            id="carrito-contador" 
            onClick={onAbrirCarrito}
          >
            🛒 Carrito ({totalItems})
          </td>
        </tr>
      </tbody>
    </table>
  );
}