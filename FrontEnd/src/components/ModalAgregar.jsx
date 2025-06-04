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
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                className="form-control"
                name="name"
                required
                minLength={2}
                maxLength={100}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                className="form-control"
                name="description"
                required
                minLength={10}
                maxLength={1000}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="roastLevel">Tostado</label>
              <input
                id="roastLevel"
                className="form-control"
                name="roastLevel"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="flavorNote">Nota de Sabor</label>
              <input
                id="flavorNote"
                className="form-control"
                name="flavorNote"
                required
                maxLength={100}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image">Imagen (nombre del archivo)</label>
              <input
                id="image"
                className="form-control"
                name="image"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="origin">Origen</label>
              <select
                id="origin"
                className="form-select"
                name="origin"
                required
                onChange={handleChange}
              >
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
              <label htmlFor="country">País</label>
              <input
                id="country"
                className="form-control"
                name="country"
                required
                minLength={2}
                maxLength={100}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="region">Región</label>
              <input
                id="region"
                className="form-control"
                name="region"
                required
                minLength={2}
                maxLength={100}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="climate">Clima</label>
              <input
                id="climate"
                className="form-control"
                name="climate"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                className="form-control"
                name="description"
                required
                minLength={10}
                maxLength={1000}
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
