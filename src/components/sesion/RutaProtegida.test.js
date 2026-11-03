// Criterios 1, 2 y 3 del Módulo 3: quién puede entrar al panel admin.
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RutaProtegida from './RutaProtegida';
import { guardarSesion } from '../../services/sesionService';
import { crear } from '../../services/usuarioService';
import { ROLES } from '../../models/Usuario';

function renderEn(ruta) {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/" element={<p>Inicio tienda</p>} />
        <Route path="/login" element={<p>Pantalla login</p>} />
        <Route element={<RutaProtegida />}>
          <Route path="/admin-usuarios" element={<p>Panel usuarios</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

const usuario = (rol) =>
  crear({ nombre: 'X', apellido: 'Y', correo: `${rol}@chronos.cl`, contrasena: 'Clave1234', rol });

beforeEach(() => localStorage.clear());

test('sin sesión, /admin-usuarios redirige a /login', () => {
  renderEn('/admin-usuarios');
  expect(screen.getByText('Pantalla login')).toBeInTheDocument();
});

test('un cliente con sesión termina en /', () => {
  guardarSesion(usuario(ROLES.CLIENTE));
  renderEn('/admin-usuarios');
  expect(screen.getByText('Inicio tienda')).toBeInTheDocument();
});

test('un admin con sesión accede al panel', () => {
  guardarSesion(usuario(ROLES.ADMIN));
  renderEn('/admin-usuarios');
  expect(screen.getByText('Panel usuarios')).toBeInTheDocument();
});
