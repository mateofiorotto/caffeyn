import { useState, useEffect, useRef } from "react";

function ModalEditUser({ onSubmit, modalId, initialData = {} }) {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({});
  const [formValid, setFormValid] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    setFormData({
      ...initialData,
      password: "",
      confirmPassword: "",
    });
    setTouched({});
    setFormValid(false);
    if (formRef.current) formRef.current.reset();
  }, [initialData]);

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

  const validarEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(formData.email || "");
  };

  useEffect(() => {
    if (formRef.current) {
      const formOk =
        formRef.current.checkValidity() &&
        validarEmail() &&
        formData.password === formData.confirmPassword;
      setFormValid(formOk);
    }
  }, [formData, touched]);

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

    const { confirmPassword, ...dataToSend } = formData;
    onSubmit(dataToSend);

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
            <h5 className="modal-title">Editar Usuario</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} ref={formRef} noValidate>
              <div className="mb-3">
                <label htmlFor="name-edit">
                  Nombre <span className="text-danger">*</span>
                </label>
                <input
                  id="name-edit"
                  name="name"
                  required
                  minLength={2}
                  maxLength={100}
                  value={formData.name || ""}
                  className={`form-control ${validarCampo("name")}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="invalid-feedback">
                  El nombre debe tener entre 2 y 100 caracteres.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email-edit">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  id="email-edit"
                  name="email"
                  type="email"
                  required
                  value={formData.email || ""}
                  className={`form-control ${
                    touched.email && !validarEmail() ? "is-invalid" : ""
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="invalid-feedback">Debe ser un email válido.</div>
              </div>

              <div className="mb-3">
                <label htmlFor="role-edit">
                  Rol <span className="text-danger">*</span>
                </label>
                <select
                  id="role-edit"
                  name="role"
                  required
                  value={formData.role || ""}
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

              <div className="mb-3">
                <label htmlFor="password-edit">
                  Contraseña <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  id="password-edit"
                  name="password"
                  required
                  minLength={8}
                  value={formData.password}
                  className={`form-control ${validarCampo("password")}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="invalid-feedback">
                  La contraseña debe tener al menos 8 caracteres.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword-edit">
                  Confirmar Contraseña <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword-edit"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
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

export default ModalEditUser;
