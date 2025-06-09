import { useState, useEffect, useRef } from "react";

function ModalEditOrigin({ onSubmit, modalId, initialData = {} }) {
  const [formData, setFormData] = useState({});
  const [touched, setTouched] = useState({});
  const [formValid, setFormValid] = useState(false);
  const formRef = useRef(null);

  // Al abrir la modal o cambiar initialData
  useEffect(() => {
    setFormData(initialData || {});
    setTouched({});
    setFormValid(false);
    if (formRef.current) formRef.current.reset();
  }, [initialData]);

  // Actualiza los valores del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const validarCampo = (name) => {
    const el = formRef.current?.elements[name];
    if (!el || !touched[name]) return "";
    return !el.checkValidity() ? "is-invalid" : "";
  };

  useEffect(() => {
    if (formRef.current) {
      setFormValid(formRef.current.checkValidity());
    }
  }, [formData, touched]);

  /* const resetFormulario = () => {
    setFormData({});
    setTouched({});
    setFormValid(false);
    if (formRef.current) formRef.current.reset();
  }; */

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    /* resetFormulario(); */
    document
      .getElementById(modalId)
      ?.querySelector('[data-bs-dismiss="modal"]')
      ?.click();
  };

  useEffect(() => {
    const modalElement = document.getElementById(modalId);
    if (!modalElement) return;

    const handleModalClose = () => {
      setFormData({ ...initialData, password: "", confirmPassword: "" });
      setTouched({});
      setFormValid(false);
      if (formRef.current) formRef.current.reset();
    };

    modalElement.addEventListener("hidden.bs.modal", handleModalClose);
    return () => {
      modalElement.removeEventListener("hidden.bs.modal", handleModalClose);
    };
  }, [modalId, initialData]);

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
              aria-label="Cerrar"
              /* onClick={resetFormulario} */
            />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} ref={formRef} noValidate>
              <div className="mb-3">
                <label htmlFor="country">
                  País <span className="text-danger">*</span>
                </label>
                <input
                  id="country"
                  name="country"
                  required
                  minLength={2}
                  maxLength={100}
                  value={formData.country || ""}
                  className={`form-control ${validarCampo("country")}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="invalid-feedback">
                  El país debe tener entre 2 y 100 caracteres.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="region">
                  Región <span className="text-danger">*</span>
                </label>
                <input
                  id="region"
                  name="region"
                  required
                  minLength={2}
                  maxLength={100}
                  value={formData.region || ""}
                  className={`form-control ${validarCampo("region")}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="invalid-feedback">
                  La región debe tener entre 2 y 100 caracteres.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="climate">
                  Clima <span className="text-danger">*</span>
                </label>
                <input
                  id="climate"
                  name="climate"
                  required
                  maxLength={100}
                  value={formData.climate || ""}
                  className={`form-control ${validarCampo("climate")}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="invalid-feedback">
                  El clima es obligatorio y no debe superar los 100 caracteres.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="description">
                  Descripción <span className="text-danger">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  minLength={10}
                  maxLength={1000}
                  style={{ height: "38px", resize: "none" }}
                  value={formData.description || ""}
                  className={`form-control ${validarCampo("description")}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="invalid-feedback">
                  La descripción debe tener entre 10 y 1000 caracteres.
                </div>
              </div>

              {/* Botones */}
              <div className="row">
                <div className="col-6">
                  <button
                    type="button"
                    className="btn btn-secondary w-100 mt-3"
                    data-bs-dismiss="modal"
                    /* onClick={resetFormulario} */
                  >
                    Cancelar
                  </button>
                </div>
                <div className="col-6">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 mt-3"
                    disabled={!formValid}
                  >
                    Actualizar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEditOrigin;
