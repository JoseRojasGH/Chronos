import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Col, Container, Row } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Blog1() {
  return (
    <>
      <Navbar />
      <Container as="main" className="py-4 py-md-5">
        <Row className="justify-content-center">
          {/* Responsivo: ancho completo en celular, columna centrada en pantallas grandes */}
          <Col xs={12} md={10} lg={8}>
            <Link to="/blogs">&larr; Volver al blog</Link>
            <article className="mt-3">
              <Badge bg="secondary" className="mb-2">Guía de compra</Badge>
              <h1 className="fs-2">Cómo elegir tu primer reloj automático</h1>
              <p className="text-muted">Equipo Chronos · 12 de octubre de 2026</p>
              <p className="lead">
                Mecanismo, tamaño de caja y resistencia al agua: los tres puntos que conviene revisar
                antes de comprar.
              </p>
              <p>
                Un reloj automático se carga con el movimiento de la muñeca, sin pila. Por eso, si no
                lo usas todos los días, puede detenerse y habrá que ajustarlo de nuevo. Si alternas
                varios relojes, considera un modelo con reserva de marcha de 40 horas o más.
              </p>
              <p>
                El tamaño de la caja cambia mucho la sensación en la muñeca. Para muñecas delgadas
                suelen funcionar mejor cajas de 36 a 40 mm; para muñecas más anchas, de 40 a 44 mm.
                Fíjate también en la distancia entre asas, que es lo que realmente define si el reloj
                sobresale.
              </p>
              <p>
                Por último, revisa la resistencia al agua. 30 metros solo protege de salpicaduras;
                para nadar busca al menos 100 metros y corona a rosca.
              </p>
            </article>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Blog1;
