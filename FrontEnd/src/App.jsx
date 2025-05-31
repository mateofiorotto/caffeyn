import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './views/Login';
import Register from './views/Register';
import CoffeeList from './views/Coffees';
import OriginList from './views/Origins';
import UserProfile from './views/UserProfile';
import Home from './views/Home';

function App() {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cafes" element={<CoffeeList />} />
          <Route path="/origenes" element={<OriginList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/perfil" element={<UserProfile />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
