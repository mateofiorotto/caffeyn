import { useState } from "react";
import ModalAgregar from "./modals/Add/ModalAddCoffee";
import ModalEditar from "./modals/Edit/ModalEditCoffee";
import ModalEliminar from "./modals/Delete/ModalDelete";
import { createCafe, deleteCafeById, updateCoffee } from "../../services/api";

function CoffeeTable({ cafes, origins, refreshData }) {
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

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
    try {
      await deleteCafeById(id);
      console.log("Café eliminado exitosamente");
      refreshData();
      setItemToDelete(null);
    } catch (error) {
      console.error("Error al eliminar el café:", error);
      alert("Error al eliminar el café. Revisa la consola para más detalles.");
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
      await updateCoffee(_id, formData);
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
            <th style={{ width: "15%" }}>Nombre</th>
            <th style={{ width: "20%" }}>Descripción</th>
            <th style={{ width: "15%" }}>Descripción Corta</th>
            <th style={{ width: "5%" }}>Precio</th>
            <th style={{ width: "5%" }}>Tostado</th>
            <th style={{ width: "15%" }}>Nota de Sabor</th>
            <th style={{ width: "5%" }}>Imagen</th>
            <th style={{ width: "5%" }}>Origen</th>
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
                  data-bs-toggle="modal"
                  data-bs-target="#modalDelete"
                  onClick={() => setItemToDelete(cafe)}
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
      <ModalEliminar
        modalId="modalDelete"
        type="cafe"
        itemName={itemToDelete?.name || ""}
        onConfirm={() => itemToDelete && handleDelete(itemToDelete._id)}
      />
    </>
  );
}

export default CoffeeTable;
