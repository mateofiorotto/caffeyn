import { useState } from "react";
import { register, saveToken } from "../services/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(name, email, password);
    if (res.token) {
      saveToken(res.token);
      navigate("/");
    } else {
      setError(res.message || "Error al registrarse");
    }
  };

  return (
    <section className="container d-flex justify-content-center py-5">
      <div
        className="card bg-dark text-light p-4 w-100"
        style={{ maxWidth: "500px" }}
      >
        <h2>Registro</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Nombre</label>
            <input
              type="text"
              className="form-control bg-dark text-light"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control bg-dark text-light"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Contraseña</label>
            <input
              type="password"
              className="form-control bg-dark text-light"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-success w-100">Registrarse</button>
        </form>
        <div>
          <p className="mt-3 text-center">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="text-primary">
              Inicia sesión aquí
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;
