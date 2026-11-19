export default function Cargando({ mensaje = 'Cargando...' }) {
  return (
    <div className="estado-carga" role="status">
      <div className="spinner" />
      <p>{mensaje}</p>
    </div>
  );
}
