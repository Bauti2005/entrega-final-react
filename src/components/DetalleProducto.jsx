import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ItemCount from './ItemCount';
import Cargando from './Cargando';
import { obtenerProducto } from '../services/productosService';
import { useCarrito } from '../context/CarritoContext';

export default function DetalleProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [agregado, setAgregado] = useState(false);
  const { agregarAlCarrito } = useCarrito();

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    obtenerProducto(id)
      .then(setProducto)
      .catch(() => setError('No se pudo cargar el producto. Intentá nuevamente.'))
      .finally(() => setCargando(false));
  }, [id]);

  const handleAdd = (cantidad) => {
    agregarAlCarrito(producto, cantidad);
    setAgregado(true);
  };

  if (cargando) return <Cargando mensaje="Cargando detalle..." />;
  if (error) return <p className="mensaje-error catalogo-estado" role="alert">{error}</p>;
  if (!producto) {
    return (
      <p className="catalogo-estado">
        Producto no encontrado. <Link to="/productos">Volver al catálogo</Link>
      </p>
    );
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px', maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '30px', backgroundColor: 'white' }}>
      <img src={producto.imagen} alt={producto.nombre} style={{ width: '300px', objectFit: 'contain', borderRadius: '10px' }} />
      <div>
        <h2>{producto.nombre}</h2>
        <p style={{ textTransform: 'capitalize', color: 'gray' }}>{producto.categoria}</p>
        <p>{producto.descripcion}</p>
        <h3 style={{ color: '#6C318C', fontSize: '28px' }}>${producto.precio}</h3>
        <ItemCount onAdd={handleAdd} />
        {agregado && (
          <p style={{ color: '#2e7d32', fontWeight: 'bold' }}>
            ✓ Producto agregado. <Link to="/carrito" style={{ color: '#6C318C' }}>Ir al carrito</Link>
          </p>
        )}
        <Link to="/productos" style={{ display: 'inline-block', marginTop: '20px', color: '#6C318C', fontWeight: 'bold', textDecoration: 'none' }}>
          ← Volver al catálogo
        </Link>
      </div>
    </div>
  );
}