// PRUEBAS DE REGLAS DE SESIÓN
// La sesión se vuelve a validar contra los usuarios guardados en cada lectura.
import { guardarSesion, obtenerSesion, cerrarSesion, CLAVE_SESION } from './sesionService';
import { crear, actualizar, eliminar } from './usuarioService';
import { ROLES } from '../models/Usuario';

const nuevoAdmin = (correo) =>
  crear({ nombre: 'Admin', apellido: 'X', correo, contrasena: 'Clave1234', rol: ROLES.ADMIN });

beforeEach(() => localStorage.clear());

describe('Reglas de sesión', () => {
  test('sin sesión guardada devuelve null', () => {
    expect(obtenerSesion()).toBeNull();
  });

  test('después de guardarla devuelve al usuario (persiste al recargar)', () => {
    const admin = nuevoAdmin('a@chronos.cl');
    guardarSesion(admin);
    expect(obtenerSesion().id).toBe(admin.id);
  });

  test('cerrar sesión la borra', () => {
    guardarSesion(nuevoAdmin('a@chronos.cl'));
    cerrarSesion();
    expect(obtenerSesion()).toBeNull();
    expect(localStorage.getItem(CLAVE_SESION)).toBeNull();
  });

  test('si el usuario fue eliminado, la sesión se invalida y se borra', () => {
    nuevoAdmin('otro@chronos.cl'); // para no chocar con la regla del último admin
    const admin = nuevoAdmin('a@chronos.cl');
    guardarSesion(admin);
    eliminar(admin.id);
    expect(obtenerSesion()).toBeNull();
    expect(localStorage.getItem(CLAVE_SESION)).toBeNull();
  });

  test('si le quitaron el rol admin, la sesión refleja el rol nuevo', () => {
    nuevoAdmin('otro@chronos.cl');
    const admin = nuevoAdmin('a@chronos.cl');
    guardarSesion(admin);
    actualizar(admin.id, { rol: ROLES.CLIENTE });
    expect(obtenerSesion().rol).toBe(ROLES.CLIENTE);
  });

  test('una sesión corrupta en localStorage se trata como sin sesión', () => {
    localStorage.setItem(CLAVE_SESION, '{no es json');
    expect(obtenerSesion()).toBeNull();
  });
});
