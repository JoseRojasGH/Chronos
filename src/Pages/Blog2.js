import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, Col, Container, Row } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/contacto-blogs.css';

function Blog2() {
  return (
    <>
      <Navbar />
      <Container as="main" className="pagina-chronos py-4 py-md-5">
        <Row className="justify-content-center">
          {/* Responsivo: ancho completo en celular, columna centrada en pantallas grandes */}
          <Col xs={12} md={10} lg={8}>
            <Link to="/blogs" className="enlace-volver">&larr; Volver al blog</Link>
            <Card as="article" className="mt-3 shadow-sm">
              <Card.Body className="p-4">
                <Badge bg="secondary" className="mb-2">Mantención</Badge>
                <h1 className="fs-2">Cuidado y mantención de tu reloj</h1>
                <p className="text-muted">Equipo Chronos · 26 de octubre de 2026</p>
                <p className="lead">
                  Hábitos simples para que tu reloj funcione bien por años: limpieza, campos magnéticos
                  y servicio técnico.
                </p>
                <p>
                  Limpia la caja y el brazalete con un paño de microfibra. Si el reloj es resistente al
                  agua, puedes usar un cepillo suave con agua tibia, siempre con la corona cerrada.
                </p>
                <p>
                  Evita dejarlo cerca de parlantes, imanes o el cierre magnético de algunas fundas de
                  celular. El magnetismo puede hacer que un reloj mecánico se adelante varios minutos
                  al día.
                </p>
                <p>
                  Un reloj mecánico necesita servicio cada 4 a 6 años: limpieza del movimiento,
                  lubricación y cambio de empaques. Si notas que pierde precisión o que la reserva de
                  marcha dura menos, adelanta la revisión.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Blog2;
