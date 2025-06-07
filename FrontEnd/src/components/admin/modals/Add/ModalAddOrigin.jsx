import { useState } from "react";

function ModalAddOrigin({ onSubmit, modalId }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📤 Enviando Origen como objeto:", formData);
    onSubmit(formData);
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
            <h5 className="modal-title">Agregar Origen</h5>
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

export default ModalAddOrigin;
