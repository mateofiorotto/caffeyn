const API_URL = 'http://localhost:3000/api'; // Ajusta el puerto si es necesario

export async function fetchCafes() {
  const res = await fetch(`${API_URL}/coffees`);
  const json = await res.json();
  console.log("Respuesta del backend:", json); // Agrega este console.log
  return json.data || [];
}


export async function fetchOrigens() {
  const res = await fetch(`${API_URL}/origins`);
  const json = await res.json();
  return json.data || [];
}



export async function fetchUserProfile(token) {
  const res = await fetch(`${API_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  console.log("Respuesta de perfil:", json);
  return json.data || null; // Devuelve solo la info del usuario
}