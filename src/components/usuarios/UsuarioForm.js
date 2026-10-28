import React, { useState } from 'react';
import { ROLES } from '../../models/Usuario';
import { validarUsuario } from '../../utils/validacionesUsuario';

// Formulario compartido por Registro (tienda), CrearUsuario y EditarUsuario (admin).
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
    <form onSubmit={manejarEnvio} noValidate>
      <Campo etiqueta="Nombre" name="nombre" valor={datos.nombre}
        onChange={manejarCambio} error={errores.nombre} />
      <Campo etiqueta="Apellido" name="apellido" valor={datos.apellido}
        onChange={manejarCambio} error={errores.apellido} />
      <Campo etiqueta="Correo" name="correo" type="email" valor={datos.correo}
        onChange={manejarCambio} error={errores.correo} />
      <Campo
        etiqueta={esEdicion ? 'Nueva contraseña (dejar vacía para no cambiarla)' : 'Contraseña'}
        name="contrasena" type="password" valor={datos.contrasena}
        onChange={manejarCambio} error={errores.contrasena} />
      <Campo etiqueta="Confirmar contraseña" name="confirmacion" type="password"
        valor={datos.confirmacion} onChange={manejarCambio} />

      {mostrarRol && (
        <div>
          <label htmlFor="rol">Rol</label>
          <select id="rol" name="rol" value={datos.rol} onChange={manejarCambio}>
            <option value={ROLES.CLIENTE}>Cliente</option>
            <option value={ROLES.ADMIN}>Administrador</option>
          </select>
        </div>
      )}

      <button type="submit">{TEXTO_BOTON[modo]}</button>
    </form>
  );
}

// Componente interno para no repetir label + input + error en cada campo.
function Campo({ etiqueta, name, type = 'text', valor, onChange, error }) {
  return (
    <div>
      <label htmlFor={name}>{etiqueta}</label>
      <input id={name} name={name} type={type} value={valor} onChange={onChange}
        aria-invalid={Boolean(error)} />
      {error && <p role="alert">{error}</p>}
    </div>
  );
}

export default UsuarioForm;
