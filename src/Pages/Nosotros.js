import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/tema-chronos.css';

// PENDIENTE: reemplazar por la dirección real de la tienda.
const DIRECCION_TIENDA = 'Santiago, Chile';
const URL_MAPA = `https://www.google.com/maps?q=${encodeURIComponent(DIRECCION_TIENDA)}&output=embed`;

// BORRADOR: textos por confirmar con el equipo.
function Nosotros() {
  return (
    <div className="tema-chronos" data-bs-theme="dark">
      <Navbar />
      <main className="pagina-nosotros">
        <Container>
          <h1>Sobre nosotros</h1>
          <div className="nosotros-intro mt-4">
            <p>
              En CHRONOS creemos que un reloj dice tanto de ti como la ropa que eliges.
              Por eso reunimos en un solo lugar marcas de lujo, clásicas y modernas,
              para que encuentres el que va con tu estilo.
            </p>
          </div>

          <Row className="g-5">
            <Col xs={12} lg={5} className="nosotros-bloque">
              <h2>Quiénes somos</h2>
              <p>
                Somos una tienda chilena dedicada a la venta de relojes. Elegimos cada
                modelo por su calidad y su diseño, y te ayudamos a encontrar el adecuado
                para tu día a día o para una ocasión especial.
              </p>
              <p className="mb-0">
                Si tienes dudas sobre un modelo o tu pedido, escríbenos desde la{' '}
                <Link to="/contacto">página de contacto</Link> y te responderemos.
              </p>
            </Col>
            <Col xs={12} lg={7} className="nosotros-bloque">
              <h2>Dónde estamos</h2>
              <p className="direccion-tienda">{DIRECCION_TIENDA}</p>
              <iframe
                className="mapa-tienda"
                title="Ubicación de la tienda en Google Maps"
                src={URL_MAPA}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default Nosotros;
