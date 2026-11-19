import { useState, useEffect } from 'react';
import Item from './Item';
import Paginador from './Paginador';
import Cargando from './Cargando';
import { obtenerProductos } from '../services/productosService';

const PRODUCTOS_POR_PAGINA = 8;

// Quita tildes y pasa a minúsculas para que "pokémon" encuentre "Pokemon"
const normalizar = (texto) =>
  texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export default function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    obtenerProductos()
      .then(setProductos)
      .catch(() => setError('No se pudieron cargar los productos. Intentá nuevamente más tarde.'))
      .finally(() => setCargando(false));
  }, []);

  // Filtrado en tiempo real
  const filtrados = productos.filter((p) =>
    normalizar(p.nombre).includes(normalizar(busqueda))
  );

  const totalPaginas = Math.ceil(filtrados.length / PRODUCTOS_POR_PAGINA);
  const inicio = (pagina - 1) * PRODUCTOS_POR_PAGINA;
  const productosPagina = filtrados.slice(inicio, inicio + PRODUCTOS_POR_PAGINA);

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPagina(1); // al buscar, volvemos a la primera página
  };

  const cambiarPagina = (n) => {
    setPagina(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (cargando) return <Cargando mensaje="Cargando catálogo..." />;
  if (error) return <p className="mensaje-error catalogo-estado" role="alert">{error}</p>;

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#381154', marginBottom: '30px' }}>Nuestro Catálogo</h2>

      <input
        type="search"
        className="barra-busqueda"
        placeholder="Buscar por nombre..."
        aria-label="Buscar productos"
        value={busqueda}
        onChange={handleBusqueda}
      />

      {filtrados.length === 0 ? (
        <p className="catalogo-estado">No encontramos productos para "{busqueda}".</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
          {productosPagina.map((producto) => (
            <Item key={producto.id} producto={producto} />
          ))}
        </div>
      )}

      <Paginador paginaActual={pagina} totalPaginas={totalPaginas} onCambiar={cambiarPagina} />
    </div>
  );
}
