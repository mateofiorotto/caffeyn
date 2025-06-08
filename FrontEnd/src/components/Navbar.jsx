import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  //codigo para obtener el nombre del usuario
   let name = '';
   let role = '';
  if (token) {
    try {
      const decoded = jwtDecode(token);
      name = decoded.name;
      role = decoded.role;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link to="/" id="logo" className="navbar-brand"><span className="d-none">Logo
          caffeyn</span></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav me-auto">
            <li><Link className="nav-link" to="/">Home</Link></li>
            <li><Link className="nav-link" to="/cafes">Cafés</Link></li>
            <li><Link className="nav-link" to="/contacto">Contacto</Link></li> 
          </ul>

          <ul className="navbar-nav ms-auto d-flex align-items-baseline align-items-lg-center text-center"
            id="auth-acciones">
            
             {token ? (
              <>
                <li><Link className="nav-link" to="/perfil"><i className="bi bi-person-fill me-2"><span className="d-none">Icono user</span></i>{name}</Link></li>
                {/* Si es admin, mostrar btn de crud */}
                {role === 'admin' && (
                  <li><Link className="btn btn-link nav-link" to="/admin"><i className="bi bi-gear-fill me-2"><span className="d-none">Icono Dashboard</span></i>Dashboard</Link></li>
                )}
                <li><Link className="btn btn-link nav-link" onClick={handleLogout}><i className="bi bi-box-arrow-in-right me-2"><span className="d-none">Icono Salir</span></i>Salir</Link></li>
              </>
            ) : (
              <>
                <li><Link className="nav-link" to="/login" state={{ from: location.pathname }}>Login</Link></li>
                <li><Link className="nav-link" to="/register">Registro</Link></li>
              </>
            )}
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
