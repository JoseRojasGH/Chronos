// PRUEBAS DE CONTRATO DE USUARIOS
// Si una de estas pruebas falla, se rompió un acuerdo del que dependen otros módulos
// (Registro, Login, admin). No las "arregles" cambiando lo esperado sin avisar al equipo.
import {
  CLAVE_USUARIOS, crear, actualizar, obtenerPorId, existeCorreo,
} from './usuarioService';
import { ROLES } from '../models/Usuario';

const CAMPOS_CONTRATO = [
  'apellido', 'contrasena', 'correo', 'fechaCreacion', 'id', 'nombre', 'rol',
];

function leerCrudo() {
  return JSON.parse(localStorage.getItem('chronos_usuarios')) ?? [];
}

function crearAna() {
  return crear({ nombre: ' Ana ', apellido: 'Pérez', correo: ' Ana@Mail.COM ', contrasena: 'Clave1234' });
}

beforeEach(() => localStorage.clear());

describe('Contrato de usuarios', () => {
  test('la clave de almacenamiento es "chronos_usuarios"', () => {
    expect(CLAVE_USUARIOS).toBe('chronos_usuarios');
    crearAna();
    expect(leerCrudo()).toHaveLength(1);
  });

  test('cada usuario guardado tiene exactamente los campos acordados', () => {
    crearAna();
    expect(Object.keys(leerCrudo()[0]).sort()).toEqual(CAMPOS_CONTRATO);
  });

  test('todos los campos se guardan como texto', () => {
    crearAna();
    Object.values(leerCrudo()[0]).forEach((valor) => {
      expect(typeof valor).toBe('string');
    });
  });

  test('el correo se guarda en minúsculas y sin espacios', () => {
    crearAna();
    expect(leerCrudo()[0].correo).toBe('ana@mail.com');
  });

  test('nombre y apellido se guardan sin espacios al inicio ni al final', () => {
    crearAna();
    expect(leerCrudo()[0].nombre).toBe('Ana');
  });

  test('el rol por defecto es "cliente" y solo existen "admin" y "cliente"', () => {
    crearAna();
    expect(leerCrudo()[0].rol).toBe('cliente');
    expect(Object.values(ROLES).sort()).toEqual(['admin', 'cliente']);
  });

  test('la fecha de creación está en formato ISO', () => {
    crearAna();
    const { fechaCreacion } = leerCrudo()[0];
    expect(new Date(fechaCreacion).toISOString()).toBe(fechaCreacion);
  });

  test('al actualizar, el id y la fecha de creación no cambian', () => {
    const ana = crearAna();
    actualizar(ana.id, { nombre: 'Anita' });
    const guardado = obtenerPorId(ana.id);
    expect(guardado.id).toBe(ana.id);
    expect(guardado.fechaCreacion).toBe(ana.fechaCreacion);
    expect(guardado.nombre).toBe('Anita');
  });

  test('al actualizar con contraseña vacía se conserva la anterior', () => {
    const ana = crearAna();
    actualizar(ana.id, { contrasena: '' });
    expect(obtenerPorId(ana.id).contrasena).toBe('Clave1234');
  });

  test('la búsqueda de correo duplicado ignora mayúsculas y espacios', () => {
    const ana = crearAna();
    expect(existeCorreo('  ANA@mail.com ')).toBe(true);
    expect(existeCorreo('ana@mail.com', ana.id)).toBe(false); // excluye al propio usuario al editar
  });
});
