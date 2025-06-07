import { useState } from "react";

function ModalAddUser({ onSubmit, modalId }) {
  // Estado local para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

   // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica si las contraseñas coinciden
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Valida el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("El email no es válido");
      return;
    }
    // Excluye el campo confirmPassword antes de enviar
    const { confirmPassword, ...dataToSend } = formData;
    
    onSubmit(dataToSend);
    setFormData({
      password: "",
      confirmPassword: "",
    });
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
            <h5 className="modal-title">Agregar Usuario</h5>
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
                <label>Nombre</label>
                <input
                  className="form-control"
                  name="name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input
                  className="form-control"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>Confirmar Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Rol</label>
                <select
                  className="form-select"
                  name="role"
                  value={formData.role || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Seleccionar rol...
                  </option>
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
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

export default ModalAddUser;
