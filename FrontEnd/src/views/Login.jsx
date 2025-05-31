import { useState, useContext } from 'react';
import { login as loginAPI } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginAPI(email, password);

    if (res.token) {
      login(res.token);
      navigate('/cafes');
    } else {
      setError(res.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="card bg-dark text-light p-4">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control bg-dark text-light" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input type="password" className="form-control bg-dark text-light" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary w-100">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;
