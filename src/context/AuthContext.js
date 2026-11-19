import { createContext, useContext } from 'react';

export const AuthContext = createContext(null);

// Único usuario con permisos de administrador (panel de gestión)
export const ADMIN_EMAIL = 'admin@gmail.com';

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de un <AuthProvider>');
  }
  return contexto;
}
