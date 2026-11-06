import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import PanelAdmin from '../components/admin/PanelAdmin';
import { obtenerSesion } from '../services/sesionService';



const SECCIONES = [
  {
    titulo: 'Usuarios',
    descripcion: 'Crea cuentas, cambia roles y elimina usuarios registrados.',
    ruta: '/admin-usuarios',
    textoBoton: 'Administrar usuarios',
    disponible: true,
  },
  {
    titulo: 'Productos',
    descripcion: 'Agrega relojes al catálogo, edita precios y retira modelos.',
    ruta: '/admin-productos',
    textoBoton: 'Administrar productos',
    disponible: true,
  },
];

function HomeAdmin() {
  const usuario = obtenerSesion();

  return (
    <PanelAdmin>
      <div className="encabezado-pagina">
        <div>
          <h1>Hola, {usuario?.nombre ?? 'Administrador'}</h1>
          <p className="texto-suave mb-0">Elige qué parte de la tienda quieres administrar.</p>
        </div>
      </div>

      <div className="opciones-admin">
        {SECCIONES.map((s) => (
          <Card key={s.ruta} className={`tarjeta-admin ${s.disponible ? '' : 'tarjeta-admin--pendiente'}`}>
            <Card.Body className="p-4 d-flex flex-column">
              <h2>{s.titulo}</h2>
              <p className="texto-suave flex-grow-1">{s.descripcion}</p>
              {s.disponible ? (
                <Link to={s.ruta} className="btn btn-chronos align-self-start">{s.textoBoton}</Link>
              ) : (
                <p className="aviso-pendiente mb-0">Disponible próximamente</p>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </PanelAdmin>
  );
}

export default HomeAdmin;
