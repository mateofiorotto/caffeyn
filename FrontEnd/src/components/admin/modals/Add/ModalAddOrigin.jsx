import { useState, useRef, useEffect } from "react";

function ModalAddOrigin({ onSubmit, modalId }) {
  const [formData, setFormData] = useState({});
  const [touched, setTouched] = useState({});
  const [formValid, setFormValid] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const validarCampo = (name) => {
    const el = formRef.current?.elements[name];
    if (!el) return "";
    if (!touched[name]) return "";
    return !el.checkValidity() ? "is-invalid" : "";
  };

  useEffect(() => {
    if (formRef.current) {
      setFormValid(formRef.current.checkValidity());
    }
  }, [formData, touched]);

  const resetFormulario = () => {
    setFormData({});
    setTouched({});
    setFormValid(false);
    if (formRef.current) formRef.current.reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({});
    setTouched({});
    document
      .getElementById(modalId)
      ?.querySelector('[data-bs-dismiss="modal"]')
      ?.click();
  };

  useEffect(() => {
    const modalElement = document.getElementById(modalId);
    if (!modalElement) return;

    const handleModalClose = () => resetFormulario();

    modalElement.addEventListener("hidden.bs.modal", handleModalClose);
    return () => {
      modalElement.removeEventListener("hidden.bs.modal", handleModalClose);
    };
  }, [modalId]);

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
              onClick={() => {
                setFormData({});
                setTouched({});
              }}
            ></button>
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
                  className={`form-control ${validarCampo("description")}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="invalid-feedback">
                  La descripción debe tener entre 10 y 1000 caracteres.
                </div>
              </div>

              {/* Botones de acción */}
              <div className="row">
                <div className="col-6">
                  <button
                    type="button"
                    className="btn btn-secondary w-100 mt-3"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      setFormData({});
                      setTouched({});
                    }}
                  >
                    Cancelar
                  </button>
                </div>
                <div className="col-6">
                  <button
                    type="submit"
                    className="btn btn-success w-100 mt-3"
                    disabled={!formValid}
                  >
                    Guardar
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

export default ModalAddOrigin;
