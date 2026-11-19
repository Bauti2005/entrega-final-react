// Traduce los códigos de error de Firebase Auth a mensajes para el usuario
export function mensajeErrorAuth(codigo) {
  switch (codigo) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Email o contraseña incorrectos.';
    case 'auth/invalid-email':
      return 'El email no tiene un formato válido.';
    case 'auth/email-already-in-use':
      return 'Ya existe una cuenta con ese email.';
    case 'auth/weak-password':
      return 'La contraseña debe tener al menos 6 caracteres.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Probá de nuevo en unos minutos.';
    case 'auth/network-request-failed':
      return 'Error de conexión. Revisá tu internet.';
    default:
      return 'Ocurrió un error. Intentá nuevamente.';
  }
}
