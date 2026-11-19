import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mensajeErrorAuth } from '../utils/erroresAuth';

export default function Registro() {
  const { registro } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (password !== confirmar) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setEnviando(true);
    try {
      await registro(email, password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(mensajeErrorAuth(err.code));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="form-card">
      <h2>Crear cuenta</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="password">Contraseña</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label htmlFor="confirmar">Repetir contraseña</label>
        <input id="confirmar" type="password" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} required />

        {error && <p className="mensaje-error" role="alert">{error}</p>}

        <button type="submit" className="btn-form" disabled={enviando}>
          {enviando ? 'Creando cuenta...' : 'Registrarme'}
        </button>
      </form>
      <p className="form-link">¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link></p>
    </div>
  );
}
