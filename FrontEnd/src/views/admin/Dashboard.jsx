import { useEffect, useState } from 'react';
import { fetchCafes, fetchOrigens, fetchUsers } from '../../services/api';
import CoffeeTable from '../../components/admin/CoffeeTable';
import OriginTable from '../../components/admin/OriginTable';
import UserTable from '../../components/admin/UserTable';
import { getUserFromToken } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [cafes, setCafes] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTable, setSelectedTable] = useState('coffees');
  const navigate = useNavigate();

  const refreshData = () => {
    fetchCafes().then(setCafes);
    fetchOrigens().then(setOrigins);
    fetchUsers().then(setUsers);
  };

  useEffect(() => {
  const user = getUserFromToken(); //obtener el token y ver si el rol es admin para prohibir o no el acceso al dashboard

  if (!user) {
    navigate('/login');
  } else if (user.role !== 'admin') {
    navigate('/');
  } else {
    refreshData();
  }
}, [navigate]);

  return (
    <div className="container my-4">
      <h1 className="mb-4">Panel de Administración</h1>

      <div className="mb-4 d-flex gap-3">
        <button className={`btn ${selectedTable === 'coffees' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSelectedTable('coffees')}>Cafés</button>
        <button className={`btn ${selectedTable === 'origins' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSelectedTable('origins')}>Orígenes</button>
        <button className={`btn ${selectedTable === 'users' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSelectedTable('users')}>Usuarios</button>
      </div>

      {selectedTable === 'coffees' && <CoffeeTable cafes={cafes} origins={origins} refreshData={refreshData}/>}
      {selectedTable === 'origins' && <OriginTable origins={origins} refreshData={refreshData}/>}
      {selectedTable === 'users' && <UserTable users={users} refreshData={refreshData}/>}
    </div>
  );
}

export default Dashboard;
