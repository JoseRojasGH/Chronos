import React from 'react';

// PENDIENTE: reemplazar por la dirección real de la tienda.
const DIRECCION_TIENDA = 'Santiago, Chile';
const URL_MAPA = `https://www.google.com/maps?q=${encodeURIComponent(DIRECCION_TIENDA)}&output=embed`;

function Nosotros() {
  return (
    <main>
      <h1>Sobre nosotros</h1>
      <section>
        <h2>Quiénes somos</h2>
        <p>PENDIENTE: historia y propuesta de la tienda.</p>
      </section>
      <section>
        <h2>Dónde estamos</h2>
        <p>{DIRECCION_TIENDA}</p>
        <iframe
          title="Ubicación de la tienda en Google Maps"
          src={URL_MAPA}
          width="100%"
          height="350"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </main>
  );
}

export default Nosotros;
