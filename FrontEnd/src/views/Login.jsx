import { useState, useContext } from "react";
import { login as loginAPI } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginAPI(email, password);

    if (res.token) {
      login(res.token);
      navigate("/");
    } else {
      setError(res.error || "Error al iniciar sesión");
    }
  };

  return (
    <section className="container d-flex justify-content-center pt-5 pb-5">
      <div data-aos="fade-up" className="card pt-5 p-4 bg-dark form-container text-light">
        <h2 className="text-center">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form className="p-5 pt-3" onSubmit={handleSubmit}>
          <div className="mb-4 mt-4">
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
          <button type="submit" className="boton-form btn">Iniciar Sesión</button>
        </form>
        <div>
          <p className="text-center mt-4">
            ¿No tienes una cuenta?{" "}
            <a href="/register" className="text-primary">
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
