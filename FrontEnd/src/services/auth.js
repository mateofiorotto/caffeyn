const API_URL = 'http://localhost:3000/api';

export async function login(email, password) {
  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  console.log("Respuesta del backend:", data);

  if (data.msg === 'success' && data.data && data.data.jwt) {
    return { token: data.data.jwt };
  } else {
    return { error: data.msg || 'Error al iniciar sesión' };
  }
}

export async function register(name, email, password) {
  const res = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();

  if (data.msg === 'success' && data.data && data.data.jwt) {
    return { token: data.data.jwt };
  } else {
    return { error: data.msg || 'Error al registrar usuario' };
  }
}

export function saveToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  const token = localStorage.getItem('token');
  return token;
}

export function logout() {
  localStorage.removeItem('token');
}
