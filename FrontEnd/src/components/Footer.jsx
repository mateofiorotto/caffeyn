import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer id="footer" className="bg-dark text-light py-4">
      <div className="container">
        <div className="row justify-content-center align-items-center gap-5 gap-lg-0">
          <div className="col-lg-4 col-md-12 text-center">
            <Link className="navbar-brand" to="/">Caffeyn</Link>
            <p className="text-light mt-4">Descubrí el mundo del café con nosotros</p>
          </div>
          <div className="col-lg-4 col-md-12 text-center">
            <h5>Explora</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/cafes">Cafés</Link></li>
              <li><Link to="/perfil">Perfil</Link></li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-12 text-center">
            <h5>Seguinos</h5>
            <ul className="list-unstyled d-flex gap-4 justify-content-center align-items-center">
              <li><a target="_blank" rel="noopener noreferrer" href="https://twitter.com/"><i className="bi bi-twitter-x"></i></a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/"><i className="bi bi-instagram"></i></a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/"><i className="bi bi-youtube"></i></a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/"><i className="bi bi-github"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
