import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebase/config';

const productosRef = collection(db, 'productos');

// READ: todos los productos
export async function obtenerProductos() {
  const snapshot = await getDocs(productosRef);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// READ: un producto por id (devuelve null si no existe)
export async function obtenerProducto(id) {
  const snapshot = await getDoc(doc(db, 'productos', id));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

// CREATE
export function crearProducto(datos) {
  return addDoc(productosRef, datos);
}

// UPDATE
export function actualizarProducto(id, datos) {
  return updateDoc(doc(db, 'productos', id), datos);
}

// DELETE
export function eliminarProducto(id) {
  return deleteDoc(doc(db, 'productos', id));
}

// Sube los productos de public/productos.json a Firestore.
// Usa el id original como id del documento, así que se puede ejecutar más de
// una vez sin duplicar productos.
export async function importarProductosIniciales() {
  const respuesta = await fetch('/productos.json');
  if (!respuesta.ok) throw new Error('No se pudo leer productos.json');
  const lista = await respuesta.json();
  await Promise.all(
    lista.map(({ id, ...resto }) => setDoc(doc(db, 'productos', String(id)), resto))
  );
}
