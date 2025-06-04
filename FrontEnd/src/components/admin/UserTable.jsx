import { useState } from "react";
import ModalAgregar from "../ModalAgregar";
import ModalEditar from "../ModalEditar";
import { createUser, deleteUserById, updateUser } from "../../services/api";

function UserTable({ users, refreshData }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const modalId = "modalAgregarUsuario";

  // Funcion para agregar un nuevo usuario
  const handleAgregar = async (data) => {
    try {
      const response = await createUser(data);
      if (response && response.data) {
        console.log("Usuario creado:", response.data);
        refreshData();
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
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      try {
        await deleteUserById(id);
        console.log("Usuario eliminado exitosamente");
        refreshData();
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        alert(
          "Error al eliminar el usuario. Revisa la consola para más detalles."
        );
      }
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
      // Limpiar el usuario seleccionado luego de la actualización
      setSelectedUser(null);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      alert("Error al actualizar el usuario. Revisa la consola.");
    }
  };

  return (
    <>
      <h2>Usuarios</h2>
      <table className="table table-dark table-bordered">
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
              <td className="text-center">
                <button
                  className="btn btn-sm btn-warning me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#modalEditar"
                  onClick={() => setSelectedUser(user)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(user._id)}
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
        type="usuario"
        modalId={modalId}
      />
      <ModalEditar
        onSubmit={handleEdit}
        type="usuario"
        modalId="modalEditar"
        initialData={selectedUser || {}}
      />
    </>
  );
}

export default UserTable;
