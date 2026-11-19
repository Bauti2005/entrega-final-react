import { createContext, useContext } from 'react';

export const CarritoContext = createContext(null);

// Hook propio para consumir el contexto de forma segura
export function useCarrito() {
  const contexto = useContext(CarritoContext);
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de un <CarritoProvider>');
  }
  return contexto;
}
