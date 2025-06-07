import { useState, useEffect } from "react";

function ModalEditOrigin({ onSubmit, modalId, initialData = {} }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📤 Enviando objeto para edición origen:", formData);
    onSubmit(formData);
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
            <h5 className="modal-title">Editar Origen</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {["country", "region", "climate"].map((field) => (
                <div className="mb-3" key={field}>
                  <label htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    id={field}
                    className="form-control"
                    name={field}
                    value={formData[field] || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

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

export default ModalEditOrigin;
