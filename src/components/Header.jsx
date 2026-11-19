import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { totalUnidades } = useCarrito();
  const { usuario, esAdmin, logout } = useAuth();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 40px', flexWrap: 'wrap', gap: '10px', backgroundColor: '#381154', color: 'white', alignItems: 'center' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'white' }}>
        <img src="/tu-nueva-master-ball.png" alt="Logo" style={{ width: '35px' }} />
        <h2 style={{ margin: 0, fontSize: '24px' }}>PokeMarket</h2>
      </Link>
      <nav style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Inicio</Link>
        <Link to="/productos" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Catálogo</Link>
        <Link to="/carrito" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
          🛒 Carrito
          {totalUnidades > 0 && (
            <span
              aria-label={`${totalUnidades} unidades en el carrito`}
              style={{ backgroundColor: '#823b9e', color: 'white', borderRadius: '999px', minWidth: '22px', padding: '2px 7px', fontSize: '13px', textAlign: 'center' }}
            >
              {totalUnidades}
            </span>
          )}
        </Link>
        {esAdmin && (
          <Link to="/admin" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Admin</Link>
        )}
        {usuario ? (
          <button
            onClick={logout}
            style={{ background: 'transparent', border: '1px solid white', color: 'white', borderRadius: '20px', padding: '5px 14px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Salir
          </button>
        ) : (
          <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Ingresar</Link>
        )}
      </nav>
    </header>
  );
}