import { useEffect, useState } from 'react';
import { fetchUserProfile } from '../services/api';
import { getToken } from '../services/auth';

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchUserProfile(token).then(setUser);
    }
  }, []);

  if (!user) return <div className="alert alert-warning">No se pudo cargar el perfil.</div>;

  return (
    <div className="card bg-dark text-light p-4">
      <h2>Perfil de Usuario</h2>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Rol:</strong> {user.role}</p>
    </div>
  );
}

export default UserProfile;
