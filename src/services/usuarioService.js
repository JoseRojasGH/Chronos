// Único archivo que toca localStorage para usuarios.
// Si el equipo cambia a una API, solo se reescribe este archivo.
import { Usuario, ROLES } from '../models/Usuario';

export const CLAVE_USUARIOS = 'chronos_usuarios'; // CONTRATO CON EL EQUIPO

// Administrador que existe desde el inicio, para poder entrar al panel la primera vez.
// Repositorio público y sin backend: estas credenciales son solo para la demostración.
export const ADMIN_INICIAL = {
  nombre: 'Admin',
  apellido: 'Duoc',
  correo: 'adminduoc@chronos.cl',
  contrasena: 'Duoc2026$#',
  rol: ROLES.ADMIN,
};

export const MENSAJE_ULTIMO_ADMIN =
  'No se puede dejar el sistema sin administradores. Crea otro administrador antes de hacer este cambio.';

function leer() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE_USUARIOS)) ?? [];
    return datos.map((d) => new Usuario(d));
  } catch {
    return [];
  }
}

function escribir(usuarios) {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
}

function contarAdmins(usuarios) {
  return usuarios.filter((u) => u.rol === ROLES.ADMIN).length;
}

export function obtenerTodos() {
  return leer();
}

export function obtenerPorId(id) {
  return leer().find((u) => u.id === id) ?? null;
}

// Para Login: buscar un usuario por correo sin tocar localStorage directamente.
export function obtenerPorCorreo(correo) {
  const normalizado = (correo ?? '').trim().toLowerCase();
  return leer().find((u) => u.correo === normalizado) ?? null;
}

export function existeCorreo(correo, idExcluido = null) {
  const normalizado = correo.trim().toLowerCase();
  return leer().some((u) => u.correo === normalizado && u.id !== idExcluido);
}

export function esUltimoAdmin(id) {
  const usuarios = leer();
  const usuario = usuarios.find((u) => u.id === id);
  return usuario?.rol === ROLES.ADMIN && contarAdmins(usuarios) === 1;
}

// Se llama una vez al iniciar la aplicación (index.js).
// Si no existe ningún administrador, crea el administrador inicial.
// Si ya existe un usuario con ese correo, lo convierte en administrador
// y restablece la contraseña documentada en el README.
export function asegurarAdminInicial() {
  const usuarios = leer();
  if (contarAdmins(usuarios) > 0) return null;

  const existente = usuarios.find((u) => u.correo === ADMIN_INICIAL.correo);
  if (existente) {
    return actualizar(existente.id, {
      rol: ROLES.ADMIN,
      contrasena: ADMIN_INICIAL.contrasena,
    });
  }
  return crear(ADMIN_INICIAL);
}

export function crear(datos) {
  const usuarios = leer();
  const nuevo = new Usuario(datos);
  escribir([...usuarios, nuevo]);
  return nuevo;
}

// Lanza un Error si el cambio dejaría el sistema sin administradores.
export function actualizar(id, cambios) {
  const usuarios = leer();
  const indice = usuarios.findIndex((u) => u.id === id);
  if (indice === -1) return null;

  const quitaRolAdmin = cambios.rol !== undefined && cambios.rol !== ROLES.ADMIN;
  if (quitaRolAdmin && esUltimoAdmin(id)) {
    throw new Error(MENSAJE_ULTIMO_ADMIN);
  }

  // Si la contraseña viene vacía, se conserva la anterior.
  const { contrasena, ...resto } = cambios;
  const actualizado = new Usuario({
    ...usuarios[indice],
    ...resto,
    contrasena: contrasena ? contrasena : usuarios[indice].contrasena,
  });
  usuarios[indice] = actualizado;
  escribir(usuarios);
  return actualizado;
}

// Lanza un Error si se intenta eliminar al último administrador.
export function eliminar(id) {
  if (esUltimoAdmin(id)) {
    throw new Error(MENSAJE_ULTIMO_ADMIN);
  }
  escribir(leer().filter((u) => u.id !== id));
}
