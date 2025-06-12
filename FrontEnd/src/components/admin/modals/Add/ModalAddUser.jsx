import { useState, useRef, useEffect } from "react";

function ModalAddUser({ onSubmit, modalId }) {
  // Estado del formulario, inicializa con campos de contraseña
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  // Estado para campos tocados (blur), útil para mostrar validación
  const [touched, setTouched] = useState({});
  // Estado que indica si todo el formulario es válido
  const [formValid, setFormValid] = useState(false);
  // Referencia al formulario
  const formRef = useRef(null);

  // Maneja el cambio en los inputs y actualiza el estado formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Marca un campo como tocado (para validación visual)
  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  // Valida individualmente un campo según su validez nativa
  const validarCampo = (name) => {
    const el = formRef.current?.elements[name];
    if (!el) return "";
    if (!touched[name]) return "";
    return !el.checkValidity() ? "is-invalid" : "";
  };

  // Valida el email
  const validarEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(formData.email || "");
  };

  // Efecto que valida el formulario completo al modificar campos o tocarlos
  useEffect(() => {
    if (formRef.current) {
      const formOk =
        formRef.current.checkValidity() &&
        validarEmail() &&
        formData.password === formData.confirmPassword;
      setFormValid(formOk);
    }
  }, [formData, touched]);

  // Restaura el formulario a su estado inicial
  const resetFormulario = () => {
    setFormData({ password: "", confirmPassword: "" });
    setTouched({});
    setFormValid(false);
    if (formRef.current) formRef.current.reset();
  };

  // Maneja el envío del formulario, con validación extra de email y contraseñas
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarEmail()) {
      alert("El email no es válido.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Se excluye confirmPassword del envío
    const { confirmPassword, ...dataToSend } = formData;
    onSubmit(dataToSend);

    // Cierra el modal manualmente
    document
      .getElementById(modalId)
      ?.querySelector('[data-bs-dismiss="modal"]')
      ?.click();
  };

  // Limpia el formulario automáticamente al cerrarse el modal
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
            <h5 className="modal-title">Agregar Usuario</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} ref={formRef} noValidate>
              {/* Nombre */}
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

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`form-control ${
                    touched.email && !validarEmail() ? "is-invalid" : ""
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="invalid-feedback">Debe ser un email válido.</div>
              </div>

              {/* Rol */}
              <div className="mb-3">
                <label htmlFor="role">
                  Rol <span className="text-danger">*</span>
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role || ""}
                  required
                  className={`form-select ${validarCampo("role")}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="" disabled>
                    Seleccionar rol...
                  </option>
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
                <div className="invalid-feedback">
                  Debe seleccionar un rol.
                </div>
              </div>

              {/* Contraseña */}
              <div className="mb-3">
                <label htmlFor="password">
                  Contraseña <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  minLength={8}
                  className={`form-control ${validarCampo("password")}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="invalid-feedback">
                  La contraseña debe tener al menos 8 caracteres.
                </div>
              </div>

              {/* Confirmar Contraseña */}
              <div className="mb-3">
                <label htmlFor="confirmPassword">
                  Confirmar Contraseña <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  className={`form-control ${
                    touched.confirmPassword &&
                    formData.password !== formData.confirmPassword
                      ? "is-invalid"
                      : ""
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="invalid-feedback">
                  Las contraseñas deben coincidir.
                </div>
              </div>

              {/* Botones */}
              <div className="row">
                <div className="col-6">
                  <button
                    type="button"
                    className="btn btn-secondary w-100 mt-3"
                    data-bs-dismiss="modal"
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

export default ModalAddUser;
