import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './views/Login';
import Register from './views/Register';
import CoffeeList from './views/Coffees';
import Contact from './views/Contact';
import Coffee from './views/Details';
import UserProfile from './views/UserProfile';
import Dashboard from './views/admin/Dashboard';
import NotFound from './views/NotFound';
import Home from './views/Home';
import Thanks from './views/Thanks';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { fetchUserProfile } from "./services/api";


function App() {
  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  useEffect(() => {
  const verificarToken = async () => {
    const token = localStorage.getItem("token");
    
    if (!token) return;

    try {
      const profile = await fetchUserProfile(token);
      // si el perfil no existe, se borra el token del localStorage
      if (!profile) {
        localStorage.removeItem("token");
        //si el usuario esta en el CRUD mandar al login, si no recargar la pagina para que se cierra la sesion
        if (window.location.pathname.startsWith('/admin')) {
          window.location.href = "/";
        } else {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error al verificar el perfil:", error);
      localStorage.removeItem("token");
      if (window.location.pathname.startsWith('/admin')) {
          window.location.href = "/";
        } else {
          window.location.reload();
        }
    }
  };

  verificarToken();
}, []);

  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main>
        {/* caffey | nombre de la vista*/}
        <h1 className="d-none">Caffeyn | Los mejores cafés</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cafes" element={<CoffeeList />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/perfil" element={<UserProfile />} />
          <Route path="/details/:id" element={<Coffee />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/thanks" element={<Thanks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
