import { useState, useEffect, useRef } from "react";

function ModalEditCoffee({
  onSubmit,
  modalId,
  initialData = {},
  origins = [],
}) {
  const [formData, setFormData] = useState({});
  const [touched, setTouched] = useState({});
  const [formValid, setFormValid] = useState(false);
  const formRef = useRef(null);

  // Prellenar campos desde initialData
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validarCampo = (name) => {
    const el = formRef.current?.elements[name];
    if (!el) return "";

    const touchedOrFilled = touched[name] || el.value?.toString().length > 0;
    if (!touchedOrFilled) return "";
    return !el.checkValidity() ? "is-invalid" : "";
  };

  useEffect(() => {
    if (formRef.current) {
      setFormValid(formRef.current.checkValidity());
    }
  }, [formData, touched]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    onSubmit(form);
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
      <div className="modal-dialog modal-lg">
        <div className="modal-content bg-dark text-light">
          <div className="modal-header">
            <h5 className="modal-title">Editar Café</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
              /* onClick={handleCancelar} */
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} ref={formRef} noValidate>
              <div className="row justify-content-center">
                {/* Columna izquierda */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="name">
                      Nombre <span className="text-danger">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name || ""}
                      required
                      minLength={2}
                      maxLength={100}
                      className={`form-control ${validarCampo("name")}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="invalid-feedback">
                      El nombre debe tener entre 2 y 100 caracteres.
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description">
                      Descripción <span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description || ""}
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

                  <div className="mb-3">
                    <label htmlFor="shortDescription">
                      Descripción Corta <span className="text-danger">*</span>
                    </label>
                    <input
                      id="shortDescription"
                      name="shortDescription"
                      value={formData.shortDescription || ""}
                      required
                      minLength={10}
                      maxLength={100}
                      className={`form-control ${validarCampo(
                        "shortDescription"
                      )}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="invalid-feedback">
                      La descripción debe tener entre 10 y 100 caracteres.
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="image">Imagen (archivo)</label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      className={`form-control ${validarCampo("image")}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="invalid-feedback">
                      Selecciona un archivo de imagen válido.
                    </div>
                  </div>

                  {formData.img && (
                    <div className="mb-3">
                      <label>Imagen actual:</label>
                      <div>
                        <img
                          src={formData.img}
                          alt="Imagen actual del producto"
                          style={{ maxWidth: "200px", maxHeight: "200px" }}
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Columna derecha */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="flavorNote">
                      Nota de Sabor <span className="text-danger">*</span>
                    </label>
                    <input
                      id="flavorNote"
                      name="flavorNote"
                      value={formData.flavorNote || ""}
                      required
                      maxLength={100}
                      className={`form-control ${validarCampo("flavorNote")}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="invalid-feedback">
                      La nota de sabor no debe superar los 100 caracteres.
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="origin">
                      Origen <span className="text-danger">*</span>
                    </label>
                    <select
                      id="origin"
                      name="origin"
                      value={formData.origin || ""}
                      required
                      className={`form-select ${validarCampo("origin")}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="" disabled>
                        Selecciona un origen
                      </option>
                      {origins.map((origin) => (
                        <option key={origin._id} value={origin._id}>
                          {origin.country}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">
                      Debes seleccionar un país de origen.
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="price">
                      Precio <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price || ""}
                      required
                      min={0}
                      step="0.01"
                      className={`form-control ${validarCampo("price")}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="invalid-feedback">
                      El precio debe ser un número positivo.
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="roastLevel">
                      Tostado <span className="text-danger">*</span>
                    </label>
                    <input
                      id="roastLevel"
                      name="roastLevel"
                      value={formData.roastLevel || ""}
                      required
                      maxLength={100}
                      className={`form-control ${validarCampo("roastLevel")}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="invalid-feedback">
                      El nivel de tostado es obligatorio.
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="row">
                <div className="col-6">
                  <button
                    type="button"
                    className="btn btn-secondary w-100 mt-3"
                    data-bs-dismiss="modal"
                    /* onClick={handleCancelar} */
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

export default ModalEditCoffee;
