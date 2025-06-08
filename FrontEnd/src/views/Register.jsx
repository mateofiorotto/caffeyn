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
    navigate("/login");
  } else {
    setError(res.error || "Error al registrarse");
  }
};

  return (
    <section className="container d-flex justify-content-center pt-5 pb-5">
      <div data-aos="fade-up"
        className="card bg-dark text-light p-4 pt-5 w-75">
        <h2 class="text-center">Registro</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form className="p-5 pt-3" onSubmit={handleSubmit}>
          <div className="mb-4 mt-4">
            <label>Nombre</label>
            <input
              type="text"
              className="form-control bg-dark text-light"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label>Email</label>
            <input
              type="email"
              className="form-control bg-dark text-light"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label>Contraseña</label>
            <input
              type="password"
              className="form-control bg-dark text-light"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="boton-form btn">Registrarse</button>
        </form>
        <div>
          <p className="text-center mt-4">
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
