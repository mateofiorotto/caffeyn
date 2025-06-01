import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer id="footer">
      <div className="container">
        <div className="row justify-content-center align-items-center gap-5 gap-lg-0">
          <div className="col-lg-4 col-md-12 text-center">
            <Link
              className="d-block m-auto"
              id="logo-footer"
              to="/"
            >
              <span className="d-none">Logo Caffeyn</span>
            </Link>
            <p className="text-light mt-4 volar">Descubri el mejor café</p>
          </div>
          <div className="col-lg-4 col-md-12 text-center">
            <h2>Explora</h2>
            <ul className="list-unstyled">
              <li className=""><Link to="/">Home</Link></li>
            <li><Link className="nav-link" to="/cafes">Cafés</Link></li>
            <li><Link className="nav-link" to="/contacto">Contacto</Link></li> 
            </ul>
          </div>
          <div className="col-lg-4 col-md-12 text-center">
            <h2 className="pb-2">Seguinos</h2>
            <ul className="list-unstyled d-flex gap-5 justify-content-center align-items-center">
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://x.com/caffeyn"
                >
                  <i className="bi bi-twitter-x">
                    <span className="d-none">X</span>
                  </i>
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/caffeyn"
                >
                  <i className="bi bi-instagram">
                    <span className="d-none">Instagram</span>
                  </i>
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.youtube.com/caffeyn"
                >
                  <i className="bi bi-youtube">
                    <span className="d-none">YouTube</span>
                  </i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
