import React from 'react'

function OriginTable({ origins }) {
  return (
    <>
        <h2>Orígenes</h2>
      <table className="table table-dark table-bordered">
        <thead>
          <tr className="text-center">
            <th>País</th>
            <th>Región</th>
            <th>Clima</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {origins.map((origin) => (
            <tr key={origin._id}>
              <td>{origin.country}</td>
              <td>{origin.region}</td>
              <td>{origin.climate}</td>
              <td>{origin.description}</td>
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

export default OriginTable