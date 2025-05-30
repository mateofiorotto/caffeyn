const API_URL = "http://localhost:3000";

export const obtenerCafes = async () => {
    const response = await fetch(`${API_URL}/api/coffees`);
    if (!response.ok) throw new Error("Error al obtener los cafés");
    return response.json();
}