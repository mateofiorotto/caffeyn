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
        refreshData(); // <-- solo si fue exitoso
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
      await deleteCafeById(id);
      refreshData();
    }
  };

  // Funcion para manejar la edición de un café
  const handleEdit = async (data) => {
  try {
    const { _id, ...updateData } = data; // 🔥 Excluimos _id
    await updateCoffee(_id, updateData); // _id solo para la URL
    refreshData();
  } catch (error) {
    console.error("Error al actualizar el café:", error);
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
            <th>Nombre</th>
            <th>Tostado</th>
            <th>Nota de Sabor</th>
            <th>Origen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cafes.map((cafe) => (
            <tr key={cafe._id}>
              <td>{cafe.name}</td>
              <td>{cafe.roastLevel}</td>
              <td>{cafe.flavorNote}</td>
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
        onSubmit={(updatedData) => handleEdit(selectedCafe._id, updatedData)}
        type="cafe"
        modalId="modalEditar"
        initialData={selectedCafe || {}}
        origins={origins}
      />
    </>
  );
}

export default CoffeeTable;
