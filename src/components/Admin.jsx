import { useState, useEffect, useCallback } from 'react';
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  importarProductosIniciales,
} from '../services/productosService';
import ProductoForm from './ProductoForm';
import Cargando from './Cargando';

export default function Admin() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [editando, setEditando] = useState(null); // null = cerrado | {} = nuevo | producto = editar
  const [aEliminar, setAEliminar] = useState(null); // producto pendiente de confirmar
  const [procesando, setProcesando] = useState(false);

  const cargar = useCallback(async () => {
    try {
      setProductos(await obtenerProductos());
      setError('');
    } catch {
      setError('No se pudieron cargar los productos. Revisá tu conexión y las reglas de Firestore.');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  // Ejecuta una operación de escritura mostrando "procesando" y manejando el error
  const ejecutar = async (operacion, mensajeError) => {
    setProcesando(true);
    try {
      await operacion();
      await cargar();
      return true;
    } catch {
      setError(mensajeError);
      return false;
    } finally {
      setProcesando(false);
    }
  };

  const guardar = async (datos) => {
    const ok = await ejecutar(
      () => (editando.id ? actualizarProducto(editando.id, datos) : crearProducto(datos)),
      'No se pudo guardar el producto.'
    );
    if (ok) setEditando(null);
  };

  const confirmarEliminar = async () => {
    await ejecutar(() => eliminarProducto(aEliminar.id), 'No se pudo eliminar el producto.');
    setAEliminar(null);
  };

  const importar = () =>
    ejecutar(importarProductosIniciales, 'No se pudieron importar los productos iniciales.');

  if (cargando) return <Cargando mensaje="Cargando productos..." />;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Panel de gestión</h2>
        <button className="btn-form" onClick={() => setEditando({})}>+ Nuevo producto</button>
      </div>

      {error && <p className="mensaje-error" role="alert">{error}</p>}

      {editando && (
        <ProductoForm
          key={editando.id || 'nuevo'}
          inicial={editando.id ? editando : null}
          onGuardar={guardar}
          onCancelar={() => setEditando(null)}
          procesando={procesando}
        />
      )}

      {productos.length === 0 && !error ? (
        <div className="admin-vacio">
          <p>No hay productos en la base de datos.</p>
          <button className="btn-form" onClick={importar} disabled={procesando}>
            Importar productos iniciales
          </button>
        </div>
      ) : (
        <div className="tabla-scroll">
          <table className="tabla-admin">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td><img src={p.imagen} alt={p.nombre} /></td>
                  <td>{p.nombre}</td>
                  <td>{p.categoria}</td>
                  <td>${Number(p.precio).toLocaleString('es-AR')}</td>
                  <td className="acciones">
                    <button className="btn-secundario" onClick={() => setEditando(p)}>Editar</button>
                    <button className="btn-vaciar" onClick={() => setAEliminar(p)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {aEliminar && (
        <div className="modal-fondo" role="dialog" aria-modal="true">
          <div className="modal">
            <h3>¿Eliminar producto?</h3>
            <p>Vas a eliminar <strong>{aEliminar.nombre}</strong>. Esta acción no se puede deshacer.</p>
            <div className="form-acciones">
              <button className="btn-vaciar" onClick={confirmarEliminar} disabled={procesando}>
                {procesando ? 'Eliminando...' : 'Sí, eliminar'}
              </button>
              <button className="btn-secundario" onClick={() => setAEliminar(null)} disabled={procesando}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
