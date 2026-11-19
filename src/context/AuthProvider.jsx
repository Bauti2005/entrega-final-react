import { useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { AuthContext, ADMIN_EMAIL } from './AuthContext';

export default function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  // true hasta que Firebase nos dice si hay sesión iniciada o no
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cancelar = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCargando(false);
    });
    return cancelar;
  }, []);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const registro = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const esAdmin = usuario?.email === ADMIN_EMAIL;

  return (
    <AuthContext.Provider
      value={{ usuario, cargando, esAdmin, login, registro, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
