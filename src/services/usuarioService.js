// Único archivo que toca localStorage para usuarios.
// Si el equipo cambia a una API, solo se reescribe este archivo.
import { Usuario } from '../models/Usuario';

export const CLAVE_USUARIOS = 'chronos_usuarios'; // CONTRATO CON EL EQUIPO

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

export function obtenerTodos() {
  return leer();
}

export function obtenerPorId(id) {
  return leer().find((u) => u.id === id) ?? null;
}

export function existeCorreo(correo, idExcluido = null) {
  const normalizado = correo.trim().toLowerCase();
  return leer().some((u) => u.correo === normalizado && u.id !== idExcluido);
}

export function crear(datos) {
  const usuarios = leer();
  const nuevo = new Usuario(datos);
  escribir([...usuarios, nuevo]);
  return nuevo;
}

export function actualizar(id, cambios) {
  const usuarios = leer();
  const indice = usuarios.findIndex((u) => u.id === id);
  if (indice === -1) return null;
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

export function eliminar(id) {
  escribir(leer().filter((u) => u.id !== id));
}
