import { useState } from "react";
import ModalAgregar from "./modals/Add/ModalAddUser";
import ModalEditar from "./modals/Edit/ModalEditUser";
import ModalEliminar from "./modals/Delete/ModalDelete";
import { createUser, deleteUserById, updateUser } from "../../services/api";

function UserTable({ users, refreshData }) {
  // Estado para almacenar el Usuario seleccionado
  const [selectedUser, setSelectedUser] = useState(null);
  // Estado para el usuario a eliminar
  const [itemToDelete, setItemToDelete] = useState(null);
  
  const modalId = "modalAgregarUsuario";

  // Funcion para agregar un nuevo usuario
  const handleAgregar = async (data) => {
    try {
      const response = await createUser(data); 
      if (response && response.data) {
        console.log("Usuario creado:", response.data);
        refreshData(); // Refresca la tabla
      } else {
        console.error("Error al crear usuario:", response);
        alert("No se pudo crear el usuario. Revisa la consola.");
      }
    } catch (error) {
      console.error("Error en handleAgregar:", error);
    }
  };

  // Función para manejar la eliminación de un usuario
  const handleDelete = async (id) => {
    try {
      await deleteUserById(id);
      console.log("Usuario eliminado exitosamente");
      refreshData();
      setItemToDelete(null); // Limpia el estado
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      alert(
        "Error al eliminar el usuario. Revisa la consola para más detalles."
      );
    }
  };

  // Funcion para manejar la edición de un usuario
  const handleEdit = async (formData) => {
    try {
      const { _id, ...cleanData } = formData;
      if (!_id) {
        console.error("No se encontró el ID del usuario");
        return;
      }
      await updateUser(_id, cleanData);
      refreshData();
      setSelectedUser(null); // Limpia la selección
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      alert("Error al actualizar el usuario. Revisa la consola.");
    }
  };

  return (
    <>
      <h2 className="text-center mb-0">Usuarios</h2>
      <button
        className="btn btn-agregar-crud"
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
      >
        <i className="bi bi-plus me-2"></i>Agregar Usuario
      </button>
      <table className="table table-dark table-bordered text-break mb-5">
        <thead>
          <tr className="text-center">
            <th className="text-nowrap" style={{ width: "15%" }}>
              Nombre
            </th>
            <th>Email</th>
            <th>Rol</th>
            <th className="text-nowrap text-center" style={{ width: "15%" }}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="text-center align-middle">
                <button
                  className="btn btn-editar-crud me-3"
                  data-bs-toggle="modal"
                  data-bs-target="#modalEditar"
                  onClick={() => setSelectedUser(user)}
                >
                  <i className="bi bi-pen-fill text-light fs-5"><span className="d-none">Editar</span></i>
                </button>
                <button
                  className="btn btn-eliminar-crud"
                  data-bs-toggle="modal"
                  data-bs-target="#modalDelete"
                  onClick={() => setItemToDelete(user)}
                >
                  <i className="bi bi-trash-fill fs-5 text-light"><span className="d-none">Eliminar</span></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalAgregar onSubmit={handleAgregar} type="usuario" modalId={modalId} />
      <ModalEditar
        onSubmit={handleEdit}
        type="usuario"
        modalId="modalEditar"
        initialData={selectedUser || {}}
      />
      <ModalEliminar
        modalId="modalDelete"
        type="usuario"
        itemName={itemToDelete?.name || itemToDelete?.email || ""}
        onConfirm={() => itemToDelete && handleDelete(itemToDelete._id)}
      />
    </>
  );
}

export default UserTable;
