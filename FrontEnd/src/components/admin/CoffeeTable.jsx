import { useState } from "react";
import ModalAgregar from "../ModalAgregar";
import ModalEditar from "../ModalEditar";
import { createCafe, deleteCafeById, updateCoffee } from "../../services/api";

function CoffeeTable({ cafes, origins, refreshData }) {
  const [selectedCafe, setSelectedCafe] = useState(null);
  const modalId = "modalAgregarCafe";

  // Funcion para agregar un nuevo café
  const handleAgregar = async (data) => {
    try {
      const response = await createCafe(data);
      if (response && response.data) {
        console.log("Café creado:", response.data);
        refreshData();
      } else {
        console.error("Error al crear café:", response);
        alert("No se pudo crear el café. Revisa la consola.");
      }
    } catch (error) {
      console.error("Error en handleAgregar:", error);
    }
  };

  // Función para manejar la eliminación de un café
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este café?")) {
      try {
        await deleteCafeById(id);
        console.log("Café eliminado exitosamente");
        refreshData();
      } catch (error) {
        console.error("Error al eliminar el café:", error);
        alert(
          "Error al eliminar el café. Revisa la consola para más detalles."
        );
      }
    }
  };

  // Función para manejar la edición de un café
  const handleEdit = async (formData) => {
    try {
      const _id = formData.get("_id");
      if (!_id) {
        console.error("No se encontró el ID del café en el FormData");
        return;
      }

      await updateCoffee(_id, formData); // ← directamente paso el FormData
      refreshData();
      setSelectedCafe(null);
    } catch (error) {
      console.error("Error al actualizar el café:", error);
      alert("Error al actualizar el café. Revisa la consola.");
    }
  };

  return (
    <>
      <h2>Cafés</h2>
      <button
        className="btn btn-success mb-3"
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
      >
        Agregar Café
      </button>

      <table className="table table-dark table-bordered">
        <thead>
          <tr className="text-center">
            <th style={{ width: "12%" }}>Nombre</th>
            <th style={{ width: "20%" }}>Descripción</th>
            <th style={{ width: "18%" }}>Descripción Corta</th>
            <th style={{ width: "8%" }}>Precio</th>
            <th>Tostado</th>
            <th style={{ width: "15%" }}>Nota de Sabor</th>
            <th>Imagen</th>
            <th>Origen</th>
            <th style={{ width: "15%" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cafes.map((cafe) => (
            <tr key={cafe._id}>
              <td>{cafe.name}</td>
              <td>{cafe.description}</td>
              <td>{cafe.shortDescription || "-"}</td>
              <td>{cafe.price ? `$${cafe.price}` : "-"}</td>
              <td>{cafe.roastLevel}</td>
              <td>{cafe.flavorNote}</td>
              <td>
                {cafe.image ? (
                  <img
                    src={`/imgs/${cafe.image}`}
                    alt={cafe.name}
                    title={cafe.image}
                    className="d-block mx-auto"
                    style={{
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                ) : (
                  <span>Sin imagen</span>
                )}
              </td>
              <td>{cafe.origin?.country || "N/A"}</td>
              <td className="text-center">
                <button
                  className="btn btn-sm btn-warning me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#modalEditar"
                  onClick={() => setSelectedCafe(cafe)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(cafe._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalAgregar
        onSubmit={handleAgregar}
        type="cafe"
        modalId={modalId}
        origins={origins}
      />
      <ModalEditar
        onSubmit={handleEdit}
        type="cafe"
        modalId="modalEditar"
        initialData={selectedCafe || {}}
        origins={origins}
      />
    </>
  );
}

export default CoffeeTable;
