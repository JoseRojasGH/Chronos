// Único archivo que toca localStorage para la sesión.
// CONTRATO CON EL EQUIPO: la sesión guarda solo { id, rol }. Nunca la contraseña.
import { obtenerPorId } from './usuarioService';

export const CLAVE_SESION = 'chronos_sesion'; // CONTRATO CON EL EQUIPO

function leerCruda() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_SESION));
  } catch {
    return null;
  }
}

// Para Login: llamar después de validar correo y contraseña.
export function guardarSesion(usuario) {
  localStorage.setItem(
    CLAVE_SESION,
    JSON.stringify({ id: usuario.id, rol: usuario.rol }),
  );
}

// Devuelve el usuario actual leído de nuevo desde usuarioService, o null.
// Por eso el rol que vale es el del usuario guardado, no el de la sesión:
// si lo eliminaron, la sesión se borra; si le quitaron el rol admin, ya no es admin.
export function obtenerSesion() {
  const cruda = leerCruda();
  if (!cruda?.id) return null;

  const usuario = obtenerPorId(cruda.id);
  if (!usuario) {
    cerrarSesion();
    return null;
  }
  return usuario;
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}
