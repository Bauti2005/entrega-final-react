import { useState, useEffect } from 'react';
import { CarritoContext } from './CarritoContext';

const STORAGE_KEY = 'pokemarket-carrito';

// Lee el carrito guardado (si existe) para no perderlo al recargar la página
function leerCarritoGuardado() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY);
    return guardado ? JSON.parse(guardado) : [];
  } catch {
    return [];
  }
}

export default function CarritoProvider({ children }) {
  // Cada ítem: { id, nombre, precio, imagen, categoria, cantidad }
  const [carrito, setCarrito] = useState(leerCarritoGuardado);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
    } catch {
      // si localStorage no está disponible, el carrito igual funciona en memoria
    }
  }, [carrito]);

  // Agrega un producto; si ya está en el carrito, suma la cantidad
  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito((prev) => {
      const existe = prev.some((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prev, { ...producto, cantidad }];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const incrementar = (id) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  // Nunca baja de 1; para sacar el producto se usa eliminarDelCarrito
  const decrementar = (id) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  // Valores derivados
  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const value = {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    incrementar,
    decrementar,
    vaciarCarrito,
    totalUnidades,
    totalPrecio,
  };

  return (
    <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
  );
}
