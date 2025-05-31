import React from 'react'

function CoffeeTable({ cafes }) {
  return (
    <>
    <h2>Cafés</h2>
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
              <td>{cafe.origin?.country || 'N/A'}</td>
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

export default CoffeeTable