import { useEffect, useState } from "react";
import { fetchCafes, fetchOrigens, fetchUsers } from "../../services/api";
import CoffeeTable from "../../components/admin/CoffeeTable";
import OriginTable from "../../components/admin/OriginTable";
import UserTable from "../../components/admin/UserTable";
import { getUserFromToken } from "../../services/auth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  // Estado para los datos de cada tabla
  const [cafes, setCafes] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [users, setUsers] = useState([]);
  // Estado para saber qué tabla mostrar
  const [selectedTable, setSelectedTable] = useState("coffees");
  // Estado para evitar el "parpadeo" si el usuario no está autenticado
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const navigate = useNavigate();

  // Función que consulta todos los datos de las tres tablas
  const refreshData = () => {
    fetchCafes().then(setCafes);
    fetchOrigens().then(setOrigins);
    fetchUsers().then(setUsers);
  };

  // Verifica la autenticación y rol del usuario al montar el componente
  useEffect(() => {
    const user = getUserFromToken();

    if (!user) {
      // Si no hay token o usuario inválido, redirige al login
      navigate("/login", { replace: true });
      return;
    }

    if (user.role !== "admin") {
      // Si el usuario no es admin, lo redirige al home
      navigate("/", { replace: true });
      return;
    }

    // Si el usuario es válido y tiene rol admin, carga los datos
    refreshData();
    setIsCheckingAuth(false); // Finaliza la verificación
  }, [navigate]);

  // Mientras se verifica la autenticación, no se muestra nada
  if (isCheckingAuth) return null;

  return (
    <div className="container my-4">
      <h2 className="mt-5 mb-5 text-center fw-bold">Panel de Administración</h2>
      {/* Botones para alternar entre las diferentes tablas */}
      <div className="mb-4 d-flex gap-3 justify-content-center mb-5">
        <button
          className={`btn ${
            selectedTable === "coffees" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => setSelectedTable("coffees")}
        >
          Cafés
        </button>
        <button
          className={`btn ${
            selectedTable === "origins" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => setSelectedTable("origins")}
        >
          Orígenes
        </button>
        <button
          className={`btn ${
            selectedTable === "users" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => setSelectedTable("users")}
        >
          Usuarios
        </button>
      </div>

      {/* Renderizado condicional de la tabla según el botón seleccionado */}
      {selectedTable === "coffees" && (
        <CoffeeTable cafes={cafes} origins={origins} refreshData={refreshData} />
      )}
      {selectedTable === "origins" && (
        <OriginTable origins={origins} refreshData={refreshData} />
      )}
      {selectedTable === "users" && (
        <UserTable users={users} refreshData={refreshData} />
      )}
    </div>
  );
}

export default Dashboard;
