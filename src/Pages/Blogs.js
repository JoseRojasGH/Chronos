import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, Col, Container, Row } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Lista de artículos. Cada uno enlaza a su página (/blog1, /blog2) definida en App.js.
const BLOGS = [
  {
    ruta: '/blog1',
    titulo: 'Cómo elegir tu primer reloj automático',
    categoria: 'Guía de compra',
    fecha: '12 de octubre de 2026',
    resumen:
      'Mecanismo, tamaño de caja y resistencia al agua: los tres puntos que conviene revisar antes de comprar.',
  },
  {
    ruta: '/blog2',
    titulo: 'Cuidado y mantención de tu reloj',
    categoria: 'Mantención',
    fecha: '26 de octubre de 2026',
    resumen:
      'Hábitos simples para que tu reloj funcione bien por años: limpieza, campos magnéticos y servicio técnico.',
  },
];

function Blogs() {
  return (
    <>
      <Navbar />
      <Container as="main" className="py-4 py-md-5">
        <h1 className="mb-1">Blog</h1>
        <p className="text-muted mb-4">Guías y consejos sobre relojes.</p>

        {/* Responsivo: 1 tarjeta por fila en celular (xs), 2 por fila desde tablet (md) */}
        <Row xs={1} md={2} className="g-4">
          {BLOGS.map((blog) => (
            <Col key={blog.ruta}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <div className="mb-2">
                    <Badge bg="secondary">{blog.categoria}</Badge>
                  </div>
                  <Card.Title as="h2" className="fs-5">{blog.titulo}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted small">{blog.fecha}</Card.Subtitle>
                  <Card.Text>{blog.resumen}</Card.Text>
                  {/* mt-auto deja el botón abajo aunque los textos midan distinto */}
                  <Link to={blog.ruta} className="btn btn-dark mt-auto align-self-start">
                    Leer más
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Blogs;
