import Home from './Pages/Home';
import Productos from './Pages/Productos';
import Contacto from './Pages/Contacto';
import Registro from './Pages/Registro';
import Login from './Pages/Login';
import Nosotros from './Pages/Nosotros';
import Blogs from './Pages/Blogs';
import Blog1 from './Pages/Blog1';
import Blog2 from './Pages/Blog2';
import HomeAdmin from './Pages/HomeAdmin';
import HomeProductos from './Pages/HomeProductos'; 
import CrearProducto from './Pages/CrearProducto';
import MostrarProductos from './Pages/MostrarProductos';
import EditarProducto from './Pages/EditarProducto';
import HomeUsuarios from './Pages/Usuarios/HomeUsuarios';
import CrearUsuario from './Pages/Usuarios/CrearUsuario';
import MostrarUsuarios from './Pages/Usuarios/MostrarUsuarios';
import EditarUsuario from './Pages/Usuarios/EditarUsuario';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog1" element={<Blog1 />} />
          <Route path="/blog2" element={<Blog2 />} />
          <Route path="/admin-home" element={<HomeAdmin />} />
          <Route path="/admin-productos" element={<HomeProductos />} />
          <Route path="/admin-usuarios" element={<HomeUsuarios />} />
          <Route path="/admin-usuarios-nuevo" element={<CrearUsuario />} />
          <Route path="/admin-productos-nuevo" element={<CrearProducto />} />
          <Route path="/admin-usuarios-lista" element={<MostrarUsuarios />} />
          <Route path="/admin-productos-lista" element={<MostrarProductos />} />
          <Route path="/admin-usuarios-editar/:id" element={<EditarUsuario />} />
          <Route path="/admin-productos-editar/:id" element={<EditarProducto />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
