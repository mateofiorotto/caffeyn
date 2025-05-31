import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Caffeyn</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li><Link className="nav-link" to="/">Home</Link></li>
            <li><Link className="nav-link" to="/cafes">Cafés</Link></li>
            {token ? (
              <>
                <li><Link className="nav-link" to="/perfil">Perfil</Link></li>
                <li><button className="btn btn-link nav-link" onClick={handleLogout}>Salir</button></li>
              </>
            ) : (
              <>
                <li><Link className="nav-link" to="/login">Login</Link></li>
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
