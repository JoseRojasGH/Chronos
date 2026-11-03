import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';

export default function Footer() {
    return(
        <div>
            <footer className="footer-home">

                <div className="footer-contenido">

                <div className="footer-marca">
                    <h2>CHRONOS</h2>
                    <p>Elegancia y estilo en cada segundo.</p>
                </div>

                <div className="footer-enlaces">
                    <h3>Explorar</h3>
                    <Link to="/">Inicio</Link>
                    <Link to="/productos">Productos</Link>
                    <Link to="/nosotros">Nosotros</Link>
                </div>

                <div className="footer-enlaces">
                    <h3>Tu cuenta</h3>
                    <Link to="/login">Iniciar sesión</Link>
                    <Link to="/registro">Registrarse</Link>
                    <Link to="/contacto">Contacto</Link>
                </div>

                </div>

                <div className="footer-final">
                © 2026 CHRONOS. Todos los derechos reservados.
                </div>

            </footer>
      </div>
    );
}

