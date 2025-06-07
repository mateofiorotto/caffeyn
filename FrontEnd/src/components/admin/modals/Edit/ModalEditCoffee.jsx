import { useState, useEffect } from "react";

function ModalEditCoffee({ onSubmit, modalId, initialData = {}, origins = [] }) {
  // Estado local para manejar los datos del formulario
  const [formData, setFormData] = useState({});

  // Al montar o actualizar `initialData`, actualizamos `formData`
  useEffect(() => {
    if (initialData.origin) {
      const processedData = {
        ...initialData,
        origin:
          typeof initialData.origin === "object"
            ? initialData.origin._id
            : initialData.origin,
      };
      setFormData(processedData);
    } else {
      setFormData(initialData);
    }
  }, [initialData]);

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Envía el formulario como FormData para permitir archivos
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    onSubmit(form);
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
            <h5 className="modal-title">Editar Café</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name">Nombre</label>
                <input
                  id="name"
                  className="form-control"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  required
                  minLength={2}
                  maxLength={100}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  className="form-control"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  required
                  minLength={10}
                  maxLength={1000}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="shortDescription">Descripción Corta</label>
                <input
                  id="shortDescription"
                  className="form-control"
                  name="shortDescription"
                  value={formData.shortDescription || ""}
                  onChange={handleChange}
                  required
                  minLength={10}
                  maxLength={100}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="roastLevel">Tostado</label>
                <input
                  id="roastLevel"
                  className="form-control"
                  name="roastLevel"
                  value={formData.roastLevel || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="flavorNote">Nota de Sabor</label>
                <input
                  id="flavorNote"
                  className="form-control"
                  name="flavorNote"
                  value={formData.flavorNote || ""}
                  onChange={handleChange}
                  required
                  maxLength={100}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image">Imagen (archivo)</label>
                <input
                  type="file"
                  id="image"
                  className="form-control"
                  name="image"
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
                  value={formData.origin || ""}
                  onChange={handleChange}
                  required
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
                  value={formData.price || ""}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <button type="submit" className="btn btn-primary mt-3">
                Actualizar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEditCoffee;
