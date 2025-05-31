import React from 'react'

function UserTable({ users }) {
  return (
    <>
    <h2>Usuarios</h2>
      <table className="table table-dark table-bordered">
        <thead>
          <tr className="text-center">
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="text-center">
                <button className="btn btn-sm btn-warning me-2">Editar</button>
                <button className="btn btn-sm btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
  )
}

export default UserTable