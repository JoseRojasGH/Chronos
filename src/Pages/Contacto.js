import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css/contacto-blogs.css';

// Misma regla de correo que src/utils/validacionesUsuario.js (registro de usuarios).
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_NOMBRE = 100;
const MAX_COMENTARIO = 500;

// Formulario de contacto con react-hook-form v7.
// No guarda los mensajes: el proyecto no tiene backend y el contrato de datos
// (README) aún no define un área "Mensajes". Si se agrega, crear un servicio.
function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({ mode: 'onTouched' });

  // Limpiar después del envío (no dentro de onSubmit): así el siguiente mensaje
  // vuelve a validarse al salir de cada campo y no con cada tecla.
  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  const largoComentario = (watch('comentario') ?? '').length;

  function onSubmit() {
    setEnviado(true);
  }

  return (
    <>
      <Navbar />
      <Container as="main" className="pagina-chronos py-4 py-md-5">
        <Row className="justify-content-center">
          {/* Ancho completo en celular, más angosto en pantallas grandes */}
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <h1 className="fs-3 mb-1">Contacto</h1>
                <p className="text-muted">¿Tienes dudas sobre un reloj o tu pedido? Escríbenos.</p>

                {enviado && (
                  <Alert variant="success" dismissible onClose={() => setEnviado(false)}>
                    ¡Gracias! Recibimos tu mensaje y te responderemos pronto.
                  </Alert>
                )}

                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3" controlId="nombre">
                    <Form.Label>Nombre completo</Form.Label>
                    <Form.Control
                      type="text"
                      isInvalid={Boolean(errors.nombre)}
                      aria-invalid={Boolean(errors.nombre)}
                      aria-describedby="nombre-error"
                      {...register('nombre', {
                        required: 'El nombre es obligatorio.',
                        validate: (v) => v.trim().length > 0 || 'El nombre es obligatorio.',
                        maxLength: { value: MAX_NOMBRE, message: `Máximo ${MAX_NOMBRE} caracteres.` },
                      })}
                    />
                    <Form.Control.Feedback id="nombre-error" type="invalid">{errors.nombre?.message}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="correo">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="nombre@ejemplo.com"
                      isInvalid={Boolean(errors.correo)}
                      aria-invalid={Boolean(errors.correo)}
                      aria-describedby="correo-error"
                      {...register('correo', {
                        required: 'El correo es obligatorio.',
                        pattern: { value: REGEX_CORREO, message: 'El correo no tiene un formato válido.' },
                      })}
                    />
                    <Form.Control.Feedback id="correo-error" type="invalid">{errors.correo?.message}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="comentario">
                    <Form.Label>Comentario</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      isInvalid={Boolean(errors.comentario)}
                      aria-invalid={Boolean(errors.comentario)}
                      aria-describedby="comentario-error comentario-largo"
                      {...register('comentario', {
                        required: 'El comentario es obligatorio.',
                        validate: (v) => v.trim().length > 0 || 'El comentario es obligatorio.',
                        maxLength: { value: MAX_COMENTARIO, message: `Máximo ${MAX_COMENTARIO} caracteres.` },
                      })}
                    />
                    <Form.Text id="comentario-largo" muted>{largoComentario}/{MAX_COMENTARIO}</Form.Text>
                    <Form.Control.Feedback id="comentario-error" type="invalid">{errors.comentario?.message}</Form.Control.Feedback>
                  </Form.Group>

                  {/* d-grid: botón a todo el ancho en celular; d-sm-block: tamaño normal desde 576px */}
                  <div className="d-grid d-sm-block">
                    <Button type="submit" className="btn-chronos" disabled={isSubmitting}>
                      Enviar mensaje
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Contacto;
