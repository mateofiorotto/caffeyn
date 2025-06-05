const API_URL = 'http://localhost:3000/api';


/**
 * Funcion para iniciar sesion
 * 
 * @param {string} email 
 * @param {string} password
 * 
 * @return token o error
 */
export async function login(email, password) {
  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  //console.log("Respuesta del backend:", data);

  if (data.msg === 'success' && data.data && data.data.jwt) {
    
    return { token: data.data.jwt };
  } else {
    return { error: data.msg || 'Error al iniciar sesión' };
  }
}

/**
 * Funcion para registrar y redirigir al login
 * 
 * @param {string} name
 * @param {string} email 
 * @param {string} password
 * 
 * @return token o error
 */
export async function register(name, email, password) {
  const res = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();

  console.log('Respuesta register:', data);

  // Si existe el jwt en la raíz de la respuesta, lo devolvemos
  if (data.jwt) {
    return { token: data.jwt };
  }

  // Si hay mensaje de error, lo devolvemos
  return { error: data.msg || 'Error al registrar usuario' };
}

/**
 * Guardar token jwt en localStorage
 * 
 * @param {string} token
 * 
 * @return token o error
 */
export function saveToken(token) {
  localStorage.setItem('token', token);
}

/**
 * Funcion para obtener token jwt del localStorage
 * 
 * @param {string} email 
 * @param {string} password
 * 
 * @return token o error
 */
export function getToken() {
  const token = localStorage.getItem('token');
  return token;
}

/**
 * Remover token JWT del localStorage y redirigir a la pantalla de login
 */
export function logout() {
  localStorage.removeItem('token');
  window.location.href = '/login';
}
