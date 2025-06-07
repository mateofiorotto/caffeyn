import { useState } from "react";

function ModalAddCoffee({ onSubmit, modalId, origins = [] }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    console.log("📤 Enviando FormData Café:", formData);
    onSubmit(form);
    setFormData({});
    document
      .getElementById(modalId)
      ?.querySelector('[data-bs-dismiss="modal"]')
      ?.click();
  };

  return (
    <div className="modal fade" id={modalId} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content bg-dark text-light">
          <div className="modal-header">
            <h5 className="modal-title">Agregar Café</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
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
                <label htmlFor="shortDescription">Descripción Corta</label>
                <input
                  id="shortDescription"
                  className="form-control"
                  name="shortDescription"
                  required
                  minLength={10}
                  maxLength={100}
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
                <label htmlFor="image">Imagen (archivo)</label>
                <input
                  type="file"
                  id="image"
                  className="form-control"
                  name="image"
                  required
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      image: e.target.files[0],
                    }))
                  }
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
              <div className="mb-3">
                <label htmlFor="price">Precio</label>
                <input
                  type="number"
                  id="price"
                  className="form-control"
                  name="price"
                  required
                  min="0"
                  step="0.01"
                  onChange={handleChange}
                />
              </div>

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

export default ModalAddCoffee;
