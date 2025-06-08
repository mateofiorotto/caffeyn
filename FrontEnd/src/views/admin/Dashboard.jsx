import { useEffect, useState } from "react";
import { fetchCafes, fetchOrigens, fetchUsers } from "../../services/api";
import CoffeeTable from "../../components/admin/CoffeeTable";
import OriginTable from "../../components/admin/OriginTable";
import UserTable from "../../components/admin/UserTable";
import { getUserFromToken } from "../../services/auth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [cafes, setCafes] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTable, setSelectedTable] = useState("coffees");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); //para evitar el "parpadeo" q hay al entrar al admin si no sos user

  const navigate = useNavigate();

  const refreshData = () => {
    fetchCafes().then(setCafes);
    fetchOrigens().then(setOrigins);
    fetchUsers().then(setUsers);
  };

  useEffect(() => {
    const user = getUserFromToken();

    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    if (user.role !== "admin") {
      navigate("/", { replace: true });
      return;
    }

    // Si pasa validaciones
    refreshData();
    setIsCheckingAuth(false);
  }, [navigate]);

  if (isCheckingAuth) return null;

  return (
    <div className="container my-4">
      <h1 className="mb-4">Panel de Administración</h1>
      {/* Botones para alternar entre las diferentes tablas */}
      <div className="mb-4 d-flex gap-3">
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
