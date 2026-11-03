
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="home">

      <Navbar></Navbar>

      {/* Presentacion principal */}
      <main
        className="inicio-home"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,0,0,0.92), rgba(0,0,0,0.55)), url('/img/fondo.png')"
        }}
      >

        <div className="contenido-inicio">

          <p className="etiqueta-home">
            ELEGANCIA · PRECISIÓN · ESTILO
          </p>

          <h1>
            El tiempo define
            <span> tu estilo.</span>
          </h1>

          <p className="descripcion-home">
            Descubre una selección exclusiva de relojes
            diseñados para quienes valoran la elegancia,
            la calidad y cada segundo de su tiempo.
          </p>

          <div className="botones-home">

            <Link to="/productos" className="boton-principal">
              Explorar colección
            </Link>

            <Link to="/nosotros" className="boton-secundario">
              Conoce CHRONOS
            </Link>

          </div>

        </div>

      </main>

      {/* Caracteristicas */}
      <section className="beneficios-home">

        <div className="beneficio">
          <h3>Elegancia</h3>
          <p>Diseños que reflejan tu personalidad.</p>
        </div>

        <div className="beneficio">
          <h3>Calidad</h3>
          <p>Una selección de marcas reconocidas.</p>
        </div>

        <div className="beneficio">
          <h3>Estilo</h3>
          <p>El complemento perfecto para cada ocasión.</p>
        </div>

      </section>

      {/* Productos destacados */}
      <section className="productos-destacados">

        <p className="subtitulo-seccion">
          NUESTRA SELECCIÓN
        </p>

        <h2>Relojes destacados</h2>

        <p className="descripcion-seccion">
          Encuentra el reloj ideal para acompañarte
          en los momentos más importantes.
        </p>

        <div className="lista-relojes">

          {/* Rolex */}
          <div className="reloj">

            <div className="imagen-reloj">
              <img src="/img/relojrolex.png" alt="Rolex" />
            </div>

            <div className="informacion-reloj">
              <p className="marca-reloj">RELOJ DE LUJO</p>
              <h3>Rolex</h3>
              <p className="precio-reloj">$8.990.000</p>
              <Link to="/productos">Ver colección</Link>
            </div>

          </div>

          {/* Tommy */}
          <div className="reloj">

            <div className="imagen-reloj">
              <img
                src="/img/relojtommy.png"
                alt="Tommy Hilfiger"
              />
            </div>

            <div className="informacion-reloj">
              <p className="marca-reloj">ESTILO MODERNO</p>
              <h3>Tommy Hilfiger</h3>
              <p className="precio-reloj">$149.990</p>
              <Link to="/productos">Ver colección</Link>
            </div>

          </div>

          {/* Armani */}
          <div className="reloj">

            <div className="imagen-reloj">
              <img src="/img/relojarmani.png" alt="Armani" />
            </div>

            <div className="informacion-reloj">
              <p className="marca-reloj">DISEÑO ELEGANTE</p>
              <h3>Armani</h3>
              <p className="precio-reloj">$390.990</p>
              <Link to="/productos">Ver colección</Link>
            </div>

          </div>

        </div>

        <Link to="/productos" className="boton-todos">
          Ver todos los productos
        </Link>

      </section>

      {/* Invitacion */}
      <section className="invitacion-home">

        <p>DESCUBRE CHRONOS</p>

        <h2>
          Cada segundo merece
          <span> algo extraordinario.</span>
        </h2>

        <Link to="/productos" className="boton-principal">
          Descubrir relojes
        </Link>

      </section>   

      <Footer></Footer>   

    </div>
  );
}

export default Home;
