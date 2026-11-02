// PRUEBAS DE REGLAS DEL ADMINISTRADOR
// Protegen que el panel nunca quede sin administradores y que Login
// pueda buscar usuarios por correo sin tocar localStorage.
import {
  ADMIN_INICIAL, MENSAJE_ULTIMO_ADMIN, asegurarAdminInicial, crear, actualizar,
  eliminar, obtenerTodos, obtenerPorId, obtenerPorCorreo, esUltimoAdmin,
} from './usuarioService';
import { ROLES } from '../models/Usuario';

const admins = () => obtenerTodos().filter((u) => u.rol === ROLES.ADMIN);

beforeEach(() => localStorage.clear());

describe('Administrador inicial', () => {
  test('con localStorage vacío crea adminduoc@chronos.cl con rol admin', () => {
    asegurarAdminInicial();
    const admin = obtenerPorCorreo('adminduoc@chronos.cl');
    expect(admin).not.toBeNull();
    expect(admin.rol).toBe(ROLES.ADMIN);
    expect(admin.contrasena).toBe('Duoc2026$#');
  });

  test('llamarlo varias veces no duplica al administrador', () => {
    asegurarAdminInicial();
    asegurarAdminInicial();
    expect(obtenerTodos()).toHaveLength(1);
  });

  test('si ya existe otro administrador, no crea el inicial', () => {
    crear({ nombre: 'Otra', apellido: 'Admin', correo: 'otra@chronos.cl', contrasena: 'Clave1234', rol: ROLES.ADMIN });
    asegurarAdminInicial();
    expect(obtenerPorCorreo(ADMIN_INICIAL.correo)).toBeNull();
  });

  test('si el correo existe como cliente y no hay admins, lo convierte en admin', () => {
    const cliente = crear({ ...ADMIN_INICIAL, rol: ROLES.CLIENTE, contrasena: 'OtraClave1' });
    asegurarAdminInicial();
    const usuario = obtenerPorId(cliente.id);
    expect(usuario.rol).toBe(ROLES.ADMIN);
    expect(usuario.contrasena).toBe(ADMIN_INICIAL.contrasena);
    expect(obtenerTodos()).toHaveLength(1);
  });
});

describe('Último administrador', () => {
  test('no se puede eliminar y el usuario sigue existiendo', () => {
    const admin = asegurarAdminInicial();
    expect(esUltimoAdmin(admin.id)).toBe(true);
    expect(() => eliminar(admin.id)).toThrow(MENSAJE_ULTIMO_ADMIN);
    expect(obtenerPorId(admin.id)).not.toBeNull();
  });

  test('no se le puede quitar el rol admin y nada cambia', () => {
    const admin = asegurarAdminInicial();
    expect(() => actualizar(admin.id, { rol: ROLES.CLIENTE, nombre: 'Cambiado' }))
      .toThrow(MENSAJE_ULTIMO_ADMIN);
    const guardado = obtenerPorId(admin.id);
    expect(guardado.rol).toBe(ROLES.ADMIN);
    expect(guardado.nombre).toBe(ADMIN_INICIAL.nombre);
  });

  test('sí se pueden editar sus otros datos', () => {
    const admin = asegurarAdminInicial();
    actualizar(admin.id, { nombre: 'Administrador', rol: ROLES.ADMIN });
    expect(obtenerPorId(admin.id).nombre).toBe('Administrador');
  });

  test('con dos administradores, sí se puede eliminar o degradar a uno', () => {
    const admin = asegurarAdminInicial();
    const otro = crear({ nombre: 'Otra', apellido: 'Admin', correo: 'otra@chronos.cl', contrasena: 'Clave1234', rol: ROLES.ADMIN });
    actualizar(otro.id, { rol: ROLES.CLIENTE });
    expect(admins()).toHaveLength(1);
    const tercero = crear({ nombre: 'Tercera', apellido: 'Admin', correo: 'tres@chronos.cl', contrasena: 'Clave1234', rol: ROLES.ADMIN });
    eliminar(admin.id);
    expect(admins().map((u) => u.id)).toEqual([tercero.id]);
  });

  test('los clientes se pueden eliminar sin restricción', () => {
    asegurarAdminInicial();
    const cliente = crear({ nombre: 'Ana', apellido: 'P', correo: 'ana@mail.com', contrasena: 'Clave1234' });
    eliminar(cliente.id);
    expect(obtenerPorId(cliente.id)).toBeNull();
  });
});

describe('Búsqueda por correo (para Login)', () => {
  test('ignora mayúsculas y espacios', () => {
    asegurarAdminInicial();
    expect(obtenerPorCorreo('  AdminDuoc@Chronos.CL ').correo).toBe('adminduoc@chronos.cl');
  });

  test('devuelve null si el correo no existe o viene vacío', () => {
    expect(obtenerPorCorreo('nadie@chronos.cl')).toBeNull();
    expect(obtenerPorCorreo('')).toBeNull();
    expect(obtenerPorCorreo(undefined)).toBeNull();
  });
});
