import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './views/Login';
import Register from './views/Register';
import CoffeeList from './views/Coffees';
import Coffee from './views/Details';
import UserProfile from './views/UserProfile';
import Dashboard from './views/admin/Dashboard';
import Home from './views/Home';

function App() {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cafes" element={<CoffeeList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/perfil" element={<UserProfile />} />
          <Route path="/details/:id" element={<Coffee />} />
          <Route path="/admin" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
