const API_URL = 'http://localhost:3000/api'; // Ajusta el puerto si es necesario
/* Cafe */
export async function fetchCafes() { // Función para obtener todos los cafés
  const res = await fetch(`${API_URL}/coffees`);
  const json = await res.json();
  console.log("Respuesta del backend:", json);
  return await json.data || [];
}

export async function fetchCafeById(id){ // Función para obtener un café por su ID
  const res = await fetch(`${API_URL}/coffees/${id}`);
   const json = await res.json();
  if (!res.ok) {
    throw new Error('No se pudo obtener el café');
  }
  
  return await json.data || [];
}

/*  */


export async function fetchOrigens() { // Función para obtener todos los orígenes
  const res = await fetch(`${API_URL}/origins`);
  const json = await res.json();
  return await json.data || [];
}

export async function fetchUsers() { // Función para obtener todos los usuarios
  const res = await fetch(`${API_URL}/users`);
  const json = await res.json();
  return await json.data || [];
}





export async function fetchUserProfile(token) { // Función para obtener el perfil del usuario autenticado
  const res = await fetch(`${API_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  console.log("Respuesta de perfil:", json);
  return await json.data || null; // Devuelve solo la info del usuario
}