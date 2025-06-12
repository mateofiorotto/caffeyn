const API_URL = "http://localhost:3000/api";
import { getToken } from "./auth";

/* =================================== Cafe  ================================== */

// Función para obtener todos los cafés
export async function fetchCafes() {
  const res = await fetch(`${API_URL}/coffees`);
  const json = await res.json();
  console.log("Respuesta del backend:", json);
  return (await json.data) || [];
}

// Función para obtener un café por su ID
export async function fetchCafeById(id) {
  const res = await fetch(`${API_URL}/coffees/${id}`);
  const json = await res.json();
  if (!res.ok) {
    throw new Error("No se pudo obtener el café");
  }

  return (await json.data) || [];
}

// Función para crear un nuevo café
export async function createCafe(data) {
  const token = getToken();
  const res = await fetch(`${API_URL}/coffees`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // No se define Content-Type manualmente
    },
    body: data, // Se envía FormData (con archivos)
  });

  const json = await res.json();
  return json;
}


// Función para borrar un café por su ID
export async function deleteCafeById(id) {
  const token = getToken();
  const res = await fetch(`${API_URL}/coffees/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error al eliminar café:", errorText);
    throw new Error("No se pudo eliminar el café");
  }

  const json = await res.json();
  return json;
}

// Funcion para editar un café por su ID
export async function updateCoffee(id, data) {
  const token = getToken();

  const isFormData = data instanceof FormData;

  const res = await fetch(`${API_URL}/coffees/${id}`, {
    method: "PUT",
    headers: {
      ...(isFormData
        ? { Authorization: `Bearer ${token}` }
        : {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }),
    },
    body: isFormData ? data : JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Respuesta del backend:", errorText);
    throw new Error("No se pudo editar el Café");
  }

  return true;
}


/* =================================== Orígenes ================================== */

// Función para obtener todos los orígenes
export async function fetchOrigens() {
  const res = await fetch(`${API_URL}/origins`);
  const json = await res.json();
  return (await json.data) || [];
}

// Funcion para crear un nuevo origen
export async function createOrigin(data) {
  const token = getToken();
  const res = await fetch(`${API_URL}/origins`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return json;
}

// Función para borrar un origen por su ID
export async function deleteOriginById(id) {
  const token = getToken();
  const res = await fetch(`${API_URL}/origins/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error al eliminar origen:", errorText);
    throw new Error("No se pudo eliminar el origen");
  }

  const json = await res.json();
  return json;
}

// Funcion para editar un origen por su ID
export async function updateOrigin(id, data) {
  const token = getToken();
  const res = await fetch(`${API_URL}/origins/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data), // ← esto debe ser válido JSON plano
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Respuesta del backend:", errorText);
    throw new Error("No se pudo editar el origen");
  }

  return true;
}


/* =================================== Usuarios ================================== */

// Función para obtener todos los usuarios
export async function fetchUsers() {
  const res = await fetch(`${API_URL}/users`);
  const json = await res.json();
  return (await json.data) || [];
}

// Función para obtener el perfil del usuario autenticado
export async function fetchUserProfile(token) {
  const res = await fetch(`${API_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  console.log("Respuesta de perfil:", json);
  return (await json.data) || null;
}

// Funcion para crear un nuevo usuario
export async function createUser(data) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return json;
}

// Función para borrar un usuario por su ID
export async function deleteUserById(id) {
  const token = getToken();
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error al eliminar usuario:", errorText);
    throw new Error("No se pudo eliminar el usuario");
  }

  const json = await res.json();
  return json;
}

// Funcion para editar un usuario por su ID
export async function updateUser(id, data) {
  const token = getToken();
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data), // ← esto debe ser válido JSON plano
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Respuesta del backend:", errorText);
    throw new Error("No se pudo editar el usuario");
  }

  return true;
}
