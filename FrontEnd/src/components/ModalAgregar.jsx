import { useState } from "react";

function ModalAgregar({ onSubmit, type, modalId, origins = [] }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    onSubmit(formData);
    setFormData({});
    document
      .getElementById(modalId)
      ?.querySelector('[data-bs-dismiss="modal"]')
      ?.click();
  };

  const renderFields = () => {
    switch (type) {
      case "cafe":
        return (
          <>
            <div className="mb-3">
              <label>Nombre</label>
              <input
                className="form-control"
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Descripción</label>
              <input
                className="form-control"
                name="description"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Tostado</label>
              <input
                className="form-control"
                name="roastLevel"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Nota de Sabor</label>
              <input
                className="form-control"
                name="flavorNote"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Imagen (nombre archivo)</label>
              <input
                className="form-control"
                name="image"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Origen</label>
              <select className="form-select" name="origin" onChange={handleChange} required>
                <option value="">Selecciona un origen</option>
                {origins.map((origin) => (
                  <option key={origin._id} value={origin._id}>
                    {origin.country}
                  </option>
                ))}
              </select>
            </div>
          </>
        );
      case "origen":
        return (
          <>
            <div className="mb-3">
              <label>País</label>
              <input
                className="form-control"
                name="country"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Región</label>
              <input
                className="form-control"
                name="region"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Clima</label>
              <input
                className="form-control"
                name="climate"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Descripción</label>
              <input
                className="form-control"
                name="description"
                onChange={handleChange}
              />
            </div>
          </>
        );
      case "usuario":
        return (
          <>
            <div className="mb-3">
              <label>Nombre</label>
              <input
                className="form-control"
                name="name"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input
                className="form-control"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Rol</label>
              <input
                className="form-control"
                name="role"
                onChange={handleChange}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="modal fade" id={modalId} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content bg-dark text-light">
          <div className="modal-header">
            <h5 className="modal-title">Agregar {type}</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {renderFields()}
              <button type="submit" className="btn btn-success mt-3">
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalAgregar;
