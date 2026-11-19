import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout';
import ItemListContainer from './components/ItemListContainer';
import DetalleProducto from './components/DetalleProducto';
import Carrito from './components/Carrito';
import CarritoProvider from './context/CarritoProvider';
import AuthProvider from './context/AuthProvider';
import Login from './components/Login';
import Registro from './components/Registro';
import Admin from './components/Admin';
import RutaProtegida from './components/RutaProtegida';

function App() {
  return (
    <AuthProvider>
    <CarritoProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          
          {/* RUTA INICIO */}
          <Route index element={
            <div className="hero-container">
              <h1 className="hero-title">¡Atrapalos a todos en PokeMarket!</h1>
              <p className="hero-subtitle">La mejor tienda de cartas sueltas y cajas selladas de Argentina.</p>
              
              <div className="hero-image-container" style={{ height: 'auto', margin: '40px 0' }}>
                <img src="/medio.png" alt="PokeMarket Banner" style={{ width: '100%', maxWidth: '750px', objectFit: 'contain' }} />
              </div>

              <div className="hero-buttons">
                <Link to="/productos" className="btn-solid">Explorar Catálogo de Cartas</Link>
                <Link to="/productos" className="btn-outline">Ver Cajas Selladas</Link>
              </div>

              <div className="shipping-banner">
                Envíos a toda la Argentina
              </div>
            </div>
          } />
          
          {/* OTRAS RUTAS */}
          <Route path="productos" element={<ItemListContainer />} />
          <Route path="producto/:id" element={<DetalleProducto />} />
          
          {/* RUTA CARRITO ACTUALIZADA */}
          <Route path="carrito" element={<Carrito />} />

          {/* AUTENTICACIÓN */}
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Registro />} />

          {/* PANEL DE GESTIÓN: solo el admin */}
          <Route path="admin" element={
            <RutaProtegida soloAdmin>
              <Admin />
            </RutaProtegida>
          } />
          
        </Route>
      </Routes>
    </BrowserRouter>
    </CarritoProvider>
    </AuthProvider>
  );
}

export default App;