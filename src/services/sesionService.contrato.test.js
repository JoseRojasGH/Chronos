// PRUEBAS DE CONTRATO DE SESIÓN
// Si una falla, se rompió un acuerdo del que dependen Login, la barra de navegación
// y las rutas protegidas. No cambies lo esperado sin avisar al equipo.
import { CLAVE_SESION, guardarSesion } from './sesionService';
import { crear } from './usuarioService';
import { ROLES } from '../models/Usuario';

const leerCruda = () => JSON.parse(localStorage.getItem('chronos_sesion'));

beforeEach(() => localStorage.clear());

describe('Contrato de sesión', () => {
  test('la clave de almacenamiento es "chronos_sesion"', () => {
    expect(CLAVE_SESION).toBe('chronos_sesion');
  });

  test('la sesión guarda exactamente { id, rol } y nunca la contraseña', () => {
    const ana = crear({ nombre: 'Ana', apellido: 'Pérez', correo: 'ana@mail.com', contrasena: 'Clave1234', rol: ROLES.ADMIN });
    guardarSesion(ana);
    const cruda = leerCruda();
    expect(Object.keys(cruda).sort()).toEqual(['id', 'rol']);
    expect(JSON.stringify(cruda)).not.toContain('Clave1234');
  });

  test('id y rol se guardan como texto', () => {
    const ana = crear({ nombre: 'Ana', apellido: 'Pérez', correo: 'ana@mail.com', contrasena: 'Clave1234' });
    guardarSesion(ana);
    Object.values(leerCruda()).forEach((v) => expect(typeof v).toBe('string'));
  });
});
