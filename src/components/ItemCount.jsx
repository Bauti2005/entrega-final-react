import { useState } from 'react';

const botonStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  border: '1px solid #381154',
  backgroundColor: 'white',
  color: '#381154',
  fontSize: '20px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

export default function ItemCount({ onAdd, inicial = 1 }) {
  const [cantidad, setCantidad] = useState(inicial);

  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
        <button
          type="button"
          style={botonStyle}
          onClick={() => setCantidad((c) => Math.max(1, c - 1))}
          disabled={cantidad <= 1}
          aria-label="Restar una unidad"
        >
          −
        </button>
        <span style={{ minWidth: '24px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>
          {cantidad}
        </span>
        <button
          type="button"
          style={botonStyle}
          onClick={() => setCantidad((c) => c + 1)}
          aria-label="Sumar una unidad"
        >
          +
        </button>
      </div>

      <button
        type="button"
        className="btn-solid"
        style={{ cursor: 'pointer', fontSize: '16px' }}
        onClick={() => {
          onAdd(cantidad);
          setCantidad(inicial);
        }}
      >
        Agregar al carrito 🛒
      </button>
    </div>
  );
}
