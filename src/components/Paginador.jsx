export default function Paginador({ paginaActual, totalPaginas, onCambiar }) {
  if (totalPaginas <= 1) return null;

  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <nav className="paginador" aria-label="Paginación del catálogo">
      <button onClick={() => onCambiar(paginaActual - 1)} disabled={paginaActual === 1}>
        ← Anterior
      </button>
      {paginas.map((n) => (
        <button
          key={n}
          onClick={() => onCambiar(n)}
          className={n === paginaActual ? 'activa' : ''}
          aria-current={n === paginaActual ? 'page' : undefined}
        >
          {n}
        </button>
      ))}
      <button onClick={() => onCambiar(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
        Siguiente →
      </button>
    </nav>
  );
}
