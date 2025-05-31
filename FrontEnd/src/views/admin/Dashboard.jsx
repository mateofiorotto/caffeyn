import { useEffect, useState } from 'react';
import { fetchCafes, fetchOrigens, fetchUsers } from '../../services/api';
import { getToken } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

import CoffeeTable from './componentes/CoffeeTable';
import OriginTable from './componentes/OriginTable';
import UserTable from './componentes/UserTable';

function Admin() {
  const [cafes, setCafes] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/login');
      return;
    }

    fetchCafes().then(setCafes);
    fetchOrigens().then(setOrigins);
    fetchUsers().then(setUsers);
  }, [navigate]);

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container my-4">
      <h1 className="mb-4">Panel de Administración</h1>
      <CoffeeTable cafes={cafes} />
      <OriginTable origins={origins} />
      <UserTable users={users} />
      
    </div>
  );
}

export default Admin;
