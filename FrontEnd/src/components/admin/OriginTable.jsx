import { useState } from "react";
import ModalAgregar from "./modals/Add/ModalAddOrigin";
import ModalEditar from "./modals/Edit/ModalEditOrigin";
import ModalEliminar from "./modals/Delete/ModalDelete";
import { createOrigin, deleteOriginById, updateOrigin, } from "../../services/api";

function OriginTable({ origins, refreshData }) {
  // Estado para el origen seleccionado al editar
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  // Estado para el origen seleccionado al eliminar
  const [itemToDelete, setItemToDelete] = useState(null);
  
  const modalId = "modalAgregarOrigen";

  // Funcion para agregar un nuevo origen
  const handleAgregar = async (data) => {
    try {
      const response = await createOrigin(data);
      if (response && response.data) {
        console.log("Origen creado:", response.data);
        refreshData();
      } else {
        console.error("Error al crear origen:", response);
        alert("No se pudo crear el origen. Revisa la consola.");
      }
    } catch (error) {
      console.error("Error en handleAgregar:", error);
    }
  };

  // Función para manejar la eliminación de un origen
  const handleDelete = async (id) => {
    try {
      await deleteOriginById(id);
      console.log("Origen eliminado exitosamente");
      refreshData();
      setItemToDelete(null);
    } catch (error) {
      console.error("Error al eliminar el origen:", error);
      alert(
        "Error al eliminar el origen. Revisa la consola para más detalles."
      );
    }
  };

  // Funcion para manejar la edición de un origen
  const handleEdit = async (formData) => {
    try {
      const { _id, ...cleanData } = formData;
      if (!_id) {
        console.error("No se encontró el ID del origen");
        return;
      }
      await updateOrigin(_id, cleanData);
      refreshData();
      setSelectedOrigin(null);
    } catch (error) {
      console.error("Error al actualizar el origen:", error);
      alert("Error al actualizar el origen. Revisa la consola.");
    }
  };

  return (
    <>
      <h2 className="text-center mb-0">Orígenes</h2>
      <button
        className="btn btn-agregar-crud"
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
      >
        <i className="bi bi-plus me-2"></i>Agregar Origen
      </button>
      <table className="table table-dark table-bordered">
        <thead>
          <tr className="text-center">
            <th className="text-nowrap" style={{ width: "15%" }}>
              País
            </th>
            <th className="text-nowrap" style={{ width: "15%" }}>
              Región
            </th>
            <th className="text-nowrap" style={{ width: "15%" }}>
              Clima
            </th>
            <th className="text-nowrap" style={{ width: "40%" }}>
              Descripción
            </th>
            <th className="text-nowrap text-center" style={{ width: "15%" }}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {origins.map((origin) => (
            <tr key={origin._id}>
              <td>{origin.country}</td>
              <td>{origin.region}</td>
              <td>{origin.climate}</td>
              <td>{origin.description}</td>
              <td className="text-center align-middle">
                <button
                  className="btn-editar-crud btn me-3"
                  data-bs-toggle="modal"
                  data-bs-target="#modalEditar"
                  onClick={() => setSelectedOrigin(origin)}
                >
                  <i className="bi bi-pen-fill text-light fs-5"><span className="d-none">Editar</span></i>
                </button>
                <button
                  className="btn-eliminar-crud btn"
                  data-bs-toggle="modal"
                  data-bs-target="#modalDelete"
                  onClick={() => setItemToDelete(origin)}
                >
                  <i className="bi bi-trash-fill fs-5 text-light"><span className="d-none">Eliminar</span></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalAgregar
        onSubmit={handleAgregar}
        type="origen"
        modalId={modalId}
        origins={origins}
      />
      <ModalEditar
        onSubmit={handleEdit}
        type="origen"
        modalId="modalEditar"
        initialData={selectedOrigin || {}}
        origins={origins}
      />
      <ModalEliminar
        modalId="modalDelete"
        type="origen"
        itemName={itemToDelete?.country || ""}
        onConfirm={() => itemToDelete && handleDelete(itemToDelete._id)}
      />
    </>
  );
}

export default OriginTable;
