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

  if (!user) return <p className="fw-bold text-center pt-5 pb-5 mt-5 pb-5 mb-5 fs-2">Hubo un error al cargar el perfil.</p>;

  return (
    <section className="container d-flex justify-content-center py-5">
      <div
        className="card bg-dark text-light p-4 w-100"
        style={{ maxWidth: "500px" }}
      >
        <h2>Perfil de Usuario</h2>
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.role}</p>
      </div>
    </section>
  );
}

export default UserProfile;
