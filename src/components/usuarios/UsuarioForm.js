import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { ROLES } from '../../models/Usuario';
import { validarUsuario } from '../../utils/validacionesUsuario';

// Formulario compartido por CrearUsuario y EditarUsuario (admin).
// Props:
//   modo: "registro" | "crear" | "editar"
//   usuarioInicial: objeto usuario (solo en modo "editar")
//   onGuardar: función que recibe los datos válidos; la página decide qué hacer con ellos
const TEXTO_BOTON = {
  registro: 'Crear cuenta',
  crear: 'Crear usuario',
  editar: 'Guardar cambios',
};

function UsuarioForm({ modo = 'crear', usuarioInicial = null, onGuardar }) {
  const esEdicion = modo === 'editar';
  const mostrarRol = modo !== 'registro';

  const [datos, setDatos] = useState({
    nombre: usuarioInicial?.nombre ?? '',
    apellido: usuarioInicial?.apellido ?? '',
    correo: usuarioInicial?.correo ?? '',
    contrasena: '', // al editar se deja vacía: vacía = no cambiar
    confirmacion: '',
    rol: usuarioInicial?.rol ?? ROLES.CLIENTE,
  });
  const [errores, setErrores] = useState({});

  function manejarCambio(e) {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  }

  function manejarEnvio(e) {
    e.preventDefault();
    const nuevosErrores = validarUsuario(datos, {
      idExcluido: usuarioInicial?.id ?? null,
      esEdicion,
    });
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    const { confirmacion, ...datosLimpios } = datos;
    // En registro el rol siempre es cliente, aunque alguien manipule el formulario.
    if (!mostrarRol) datosLimpios.rol = ROLES.CLIENTE;
    onGuardar(datosLimpios);
  }

  return (
    <Form onSubmit={manejarEnvio} noValidate>
      <div className="row g-3">
        <div className="col-12 col-sm-6">
          <Campo etiqueta="Nombre" name="nombre" valor={datos.nombre}
            onChange={manejarCambio} error={errores.nombre} autoComplete="given-name" />
        </div>
        <div className="col-12 col-sm-6">
          <Campo etiqueta="Apellido" name="apellido" valor={datos.apellido}
            onChange={manejarCambio} error={errores.apellido} autoComplete="family-name" />
        </div>
        <div className="col-12">
          <Campo etiqueta="Correo" name="correo" type="email" valor={datos.correo}
            onChange={manejarCambio} error={errores.correo} autoComplete="email" />
        </div>
        <div className="col-12 col-sm-6">
          <Campo
            etiqueta={esEdicion ? 'Nueva contraseña' : 'Contraseña'}
            ayuda={esEdicion ? 'Déjala vacía para no cambiarla.' : 'Mínimo 8 caracteres, con una mayúscula y un número.'}
            name="contrasena" type="password" valor={datos.contrasena}
            onChange={manejarCambio} error={errores.contrasena} autoComplete="new-password" />
        </div>
        <div className="col-12 col-sm-6">
          <Campo etiqueta="Confirmar contraseña" name="confirmacion" type="password"
            valor={datos.confirmacion} onChange={manejarCambio} autoComplete="new-password" />
        </div>

        {mostrarRol && (
          <div className="col-12 col-sm-6">
            <Form.Group controlId="rol">
              <Form.Label>Rol</Form.Label>
              <Form.Select name="rol" value={datos.rol} onChange={manejarCambio}>
                <option value={ROLES.CLIENTE}>Cliente</option>
                <option value={ROLES.ADMIN}>Administrador</option>
              </Form.Select>
            </Form.Group>
          </div>
        )}
      </div>

      <div className="d-grid d-sm-block mt-4">
        <Button type="submit" className="btn-chronos px-4">{TEXTO_BOTON[modo]}</Button>
      </div>
    </Form>
  );
}

// Componente interno para no repetir etiqueta + campo + ayuda + error.
// Mismo patrón que Contacto: isInvalid + Form.Control.Feedback enlazado con aria-describedby.
function Campo({ etiqueta, ayuda, name, type = 'text', valor, onChange, error, autoComplete }) {
  const idAyuda = ayuda ? `${name}-ayuda` : undefined;
  const idError = error ? `${name}-error` : undefined;
  const descritoPor = [idAyuda, idError].filter(Boolean).join(' ') || undefined;

  return (
    <Form.Group controlId={name}>
      <Form.Label>{etiqueta}</Form.Label>
      <Form.Control
        name={name}
        type={type}
        value={valor}
        onChange={onChange}
        autoComplete={autoComplete}
        isInvalid={Boolean(error)}
        aria-invalid={Boolean(error)}
        aria-describedby={descritoPor}
      />
      {ayuda && <Form.Text id={idAyuda} className="texto-suave">{ayuda}</Form.Text>}
      <Form.Control.Feedback id={idError} type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
}

export default UsuarioForm;
