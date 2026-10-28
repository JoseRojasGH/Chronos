// Funciones puras: reciben un valor y devuelven un mensaje de error o null.
import { existeCorreo } from '../services/usuarioService';

const REGEX_NOMBRE = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'-]{2,50}$/;
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// PENDIENTE: reglas de contraseña por confirmar con el equipo.
const REGEX_CONTRASENA = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

export function validarNombre(valor, etiqueta = 'El nombre') {
  const v = valor.trim();
  if (!v) return `${etiqueta} es obligatorio.`;
  if (!REGEX_NOMBRE.test(v)) return `${etiqueta} debe tener entre 2 y 50 letras.`;
  return null;
}

export function validarCorreo(valor, idExcluido = null) {
  const v = valor.trim();
  if (!v) return 'El correo es obligatorio.';
  if (!REGEX_CORREO.test(v)) return 'El correo no tiene un formato válido.';
  if (existeCorreo(v, idExcluido)) return 'Ya existe un usuario con ese correo.';
  return null;
}

// esEdicion: al editar, la contraseña vacía significa "no cambiarla".
export function validarContrasena(valor, confirmacion, esEdicion = false) {
  if (esEdicion && !valor && !confirmacion) return null;
  if (!valor) return 'La contraseña es obligatoria.';
  if (!REGEX_CONTRASENA.test(valor)) {
    return 'Mínimo 8 caracteres, con al menos una mayúscula y un número.';
  }
  if (valor !== confirmacion) return 'Las contraseñas no coinciden.';
  return null;
}

// Devuelve un objeto { campo: mensaje } solo con los campos con error.
export function validarUsuario(datos, { idExcluido = null, esEdicion = false } = {}) {
  const errores = {
    nombre: validarNombre(datos.nombre, 'El nombre'),
    apellido: validarNombre(datos.apellido, 'El apellido'),
    correo: validarCorreo(datos.correo, idExcluido),
    contrasena: validarContrasena(datos.contrasena, datos.confirmacion, esEdicion),
  };
  return Object.fromEntries(Object.entries(errores).filter(([, msg]) => msg));
}
