import { useState, useRef, useEffect } from "react";

function ModalAddCoffee({ onSubmit, modalId, origins = [] }) {
  // Estado para guardar los datos del formulario
  const [formData, setFormData] = useState({});
  // Estado para marcar qué campos fueron tocados (para mostrar validación)
  const [touched, setTouched] = useState({});
  // Estado para indicar si el formulario es válido
  const [formValid, setFormValid] = useState(false);
  // Referencia al formulario
  const formRef = useRef(null);

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value, // Si es archivo, guarda el archivo, si no, el valor
    }));
  };

  // Marca un campo como "tocado" cuando pierde el foco
  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  // Verifica la validez de un campo si fue tocado
  const validarCampo = (name) => {
    const el = formRef.current?.elements[name];
    if (!el) return "";
    if (!touched[name]) return "";
    return !el.checkValidity() ? "is-invalid" : ""; // Clase Bootstrap para error
  };

  // Cada vez que cambia el formulario o los campos tocados, recalcula validez
  useEffect(() => {
    if (formRef.current) {
      setFormValid(formRef.current.checkValidity());
    }
  }, [formData, touched]);

  // Resetea el formulario completo
  const resetFormulario = () => {
    setFormData({});
    setTouched({});
    setFormValid(false);
    if (formRef.current) formRef.current.reset();
  };

  // Maneja el envio del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepara datos con FormData para permitir archivos
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    // Ejecuta la función pasada por props
    onSubmit(form);
    // Resetea estado y cierra el modal manualmente
    setFormData({});
    setTouched({});
    document
      .getElementById(modalId)
      ?.querySelector('[data-bs-dismiss="modal"]')
      ?.click();
  };

  // Limpia el formulario automáticamente cuando el modal se cierra
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
      <div className="modal-dialog modal-lg">
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
            <form onSubmit={handleSubmit} ref={formRef} noValidate>
              <div className="row">
                {/* Columna izquierda */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="name">
                      Nombre <span className="text-danger">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
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
                      required
                      minLength={10}
                      maxLength={1000}
                      style={{ height: "38px" }}
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
                    <label htmlFor="roastLevel">
                      Tostado <span className="text-danger">*</span>
                    </label>
                    <input
                      id="roastLevel"
                      name="roastLevel"
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

                {/* Columna derecha */}
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="flavorNote">
                      Nota de Sabor <span className="text-danger">*</span>
                    </label>
                    <input
                      id="flavorNote"
                      name="flavorNote"
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
                    <label htmlFor="image">
                      Imagen (archivo) <span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      required
                      accept="image/*"
                      className={`form-control ${validarCampo("image")}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className="invalid-feedback">
                      Selecciona un archivo de imagen válido.
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="origin">
                      Origen <span className="text-danger">*</span>
                    </label>
                    <select
                      id="origin"
                      name="origin"
                      required
                      className={`form-select ${validarCampo("origin")}`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">Selecciona un origen</option>
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

export default ModalAddCoffee;
