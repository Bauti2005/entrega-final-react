import { useState } from 'react';

const VACIO = { nombre: '', precio: '', categoria: 'cartas', descripcion: '', imagen: '' };

// Se usa tanto para crear (inicial = null) como para editar (inicial = producto)
export default function ProductoForm({ inicial, onGuardar, onCancelar, procesando }) {
  const [valores, setValores] = useState(inicial ? { ...VACIO, ...inicial } : VACIO);
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    const nuevos = {};
    if (!valores.nombre.trim()) nuevos.nombre = 'El nombre es obligatorio.';
    if (!(Number(valores.precio) > 0)) nuevos.precio = 'El precio debe ser mayor que cero.';
    if (!valores.descripcion.trim()) nuevos.descripcion = 'La descripción es obligatoria.';
    if (!valores.imagen.trim()) nuevos.imagen = 'La imagen es obligatoria (ej: /charizard.webp o una URL).';
    return nuevos;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    onGuardar({
      nombre: valores.nombre.trim(),
      precio: Number(valores.precio),
      categoria: valores.categoria,
      descripcion: valores.descripcion.trim(),
      imagen: valores.imagen.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="producto-form">
      <h3>{inicial?.id ? 'Editar producto' : 'Nuevo producto'}</h3>

      <label htmlFor="nombre">Nombre</label>
      <input id="nombre" name="nombre" value={valores.nombre} onChange={handleChange} />
      {errores.nombre && <p className="mensaje-error">{errores.nombre}</p>}

      <label htmlFor="precio">Precio ($)</label>
      <input id="precio" name="precio" type="number" min="0" value={valores.precio} onChange={handleChange} />
      {errores.precio && <p className="mensaje-error">{errores.precio}</p>}

      <label htmlFor="categoria">Categoría</label>
      <select id="categoria" name="categoria" value={valores.categoria} onChange={handleChange}>
        <option value="cartas">Cartas</option>
        <option value="cajas">Cajas selladas</option>
      </select>

      <label htmlFor="descripcion">Descripción</label>
      <textarea id="descripcion" name="descripcion" rows="3" value={valores.descripcion} onChange={handleChange} />
      {errores.descripcion && <p className="mensaje-error">{errores.descripcion}</p>}

      <label htmlFor="imagen">Imagen (ruta o URL)</label>
      <input id="imagen" name="imagen" value={valores.imagen} onChange={handleChange} />
      {errores.imagen && <p className="mensaje-error">{errores.imagen}</p>}

      <div className="form-acciones">
        <button type="submit" className="btn-form" disabled={procesando}>
          {procesando ? 'Guardando...' : 'Guardar'}
        </button>
        <button type="button" className="btn-secundario" onClick={onCancelar} disabled={procesando}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
