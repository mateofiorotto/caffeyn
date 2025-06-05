import { useState, useEffect } from "react";

function ModalEditar({
  onSubmit,
  type,
  modalId,
  initialData = {},
  origins = [],
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (type === "cafe" && initialData.origin) {
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
  }, [initialData, type]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();

    for (const key in formData) {
      form.append(key, formData[key]);
    }

    console.log("📤 Enviando FormData para edición:", formData);

    onSubmit(form); // el componente padre debe manejar FormData
    document
      .getElementById(modalId)
      ?.querySelector('[data-bs-dismiss="modal"]')
      ?.click();
  };

  const renderFields = () => {
    switch (type) {
      case "cafe":
        return (
          <>
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
                minLength={5}
                maxLength={300}
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
              <label htmlFor="image">Imagen (nombre archivo)</label>
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
                min={1}
              />
            </div>
          </>
        );

      case "origen":
        return (
          <>
            <div className="mb-3">
              <label htmlFor="country">País</label>
              <input
                id="country"
                className="form-control"
                name="country"
                value={formData.country || ""}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={100}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="region">Región</label>
              <input
                id="region"
                className="form-control"
                name="region"
                value={formData.region || ""}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={100}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="climate">Clima</label>
              <input
                id="climate"
                className="form-control"
                name="climate"
                value={formData.climate || ""}
                onChange={handleChange}
                required
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
          </>
        );

      case "usuario":
        return (
          <>
            <div className="mb-3">
              <label>Nombre</label>
              <input
                className="form-control"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input
                className="form-control"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Rol</label>
              <input
                className="form-control"
                name="role"
                value={formData.role || ""}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                placeholder="Dejar vacío para no cambiar"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="modal fade" id={modalId} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content bg-dark text-light">
          <div className="modal-header">
            <h5 className="modal-title">Editar {type}</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {renderFields()}
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

export default ModalEditar;
