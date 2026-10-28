// Modelo de Usuario: solo datos. No conoce el DOM ni el almacenamiento.
// CONTRATO CON EL EQUIPO: cualquier módulo que lea o guarde usuarios usa esta forma.

export const ROLES = {
  ADMIN: 'admin',
  CLIENTE: 'cliente',
};

export class Usuario {
  constructor({ id, nombre, apellido, correo, contrasena, rol, fechaCreacion } = {}) {
    this.id = id ?? Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    this.nombre = (nombre ?? '').trim();
    this.apellido = (apellido ?? '').trim();
    this.correo = (correo ?? '').trim().toLowerCase();
    // DEUDA TÉCNICA: contraseña en texto plano (sin backend). No es un login real.
    this.contrasena = contrasena ?? '';
    this.rol = rol ?? ROLES.CLIENTE;
    this.fechaCreacion = fechaCreacion ?? new Date().toISOString();
  }

  get nombreCompleto() {
    return `${this.nombre} ${this.apellido}`;
  }
}
