import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

export default function Carrito() {
  const {
    carrito,
    eliminarDelCarrito,
    incrementar,
    decrementar,
    vaciarCarrito,
    totalUnidades,
    totalPrecio,
  } = useCarrito();

  const vacio = carrito.length === 0;
  const formato = (n) => `$${n.toLocaleString('es-AR')}`;

  return (
    <div className="carrito-container">
      <h2 className="carrito-titulo">Carrito de compras</h2>

      <div className="carrito-contenido">
        {vacio ? (
          <div className="carrito-vacio">
            <img src="/pikachu-carrito.png" alt="Carrito vacío" className="pikachu-img" />
            <h3>¡Vaya! Parece que tu carrito está vacío.</h3>
            <p>Añade algunos artículos increíbles de nuestro catálogo.</p>
            <Link to="/productos" className="btn-explorar">Explorar el Catálogo 🔍</Link>
          </div>
        ) : (
          <div className="carrito-items">
            {carrito.map((item) => (
              <div key={item.id} className="carrito-item">
                <img src={item.imagen} alt={item.nombre} className="carrito-item-img" />

                <div className="carrito-item-info">
                  <h4>{item.nombre}</h4>
                  <span className="carrito-item-precio">{formato(item.precio)} c/u</span>
                </div>

                <div className="carrito-item-cantidad">
                  <button
                    type="button"
                    onClick={() => decrementar(item.id)}
                    disabled={item.cantidad <= 1}
                    aria-label={`Restar una unidad de ${item.nombre}`}
                  >
                    −
                  </button>
                  <span>{item.cantidad}</span>
                  <button
                    type="button"
                    onClick={() => incrementar(item.id)}
                    aria-label={`Sumar una unidad de ${item.nombre}`}
                  >
                    +
                  </button>
                </div>

                <div className="carrito-item-subtotal">
                  {formato(item.precio * item.cantidad)}
                </div>

                <button
                  type="button"
                  className="btn-eliminar"
                  onClick={() => eliminarDelCarrito(item.id)}
                  aria-label={`Eliminar ${item.nombre}`}
                >
                  🗑️
                </button>
              </div>
            ))}

            <button type="button" className="btn-vaciar" onClick={vaciarCarrito}>
              Vaciar carrito
            </button>
          </div>
        )}

        <div className="carrito-resumen">
          <h3>Resumen de Compra</h3>
          <div className="resumen-item">
            <span>Unidades</span>
            <span>{totalUnidades}</span>
          </div>
          <div className="resumen-item">
            <span>Subtotal</span>
            <span>{formato(totalPrecio)}</span>
          </div>
          <div className="resumen-item">
            <span>Envío</span>
            <span>—</span>
          </div>
          <hr />
          <div className="resumen-total">
            <span>Total</span>
            <span>{formato(totalPrecio)}</span>
          </div>
          <button className="btn-pagar" disabled={vacio}>Proceder al Pago</button>
        </div>
      </div>
    </div>
  );
}
