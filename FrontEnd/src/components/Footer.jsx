import React from "react";

function Footer() {
  return (
     <footer id="footer" className="bg-dark text-light">
        <div className="container">
            <div className="row justify-content-center align-items-center gap-5 gap-lg-0">
                <div className="col-lg-4 col-md-12 text-center">
                    <a className="d-block m-auto" id="logo-footer" href="{{ route('home') }}"><span className="d-none">Logo
                            MC</span></a>
                    <p className="text-light mt-4 volar">Deja volar tu imaginación</p>
                </div>
                <div className="col-lg-4 col-md-12 text-center">
                    <h2>Explora</h2>
                    <ul className="list-unstyled">
                        <li className=""><a href="{{ route('home') }}">Home</a></li>
                        <li className="nav-link"><a href="{{ route('editions') }}">Ediciones</a></li>
                        <li><a href="{{ route('posts') }}">Noticias</a></li>
                        <li><a href="{{ route('contact') }}">Contacto</a></li>
                    </ul>
                </div>
                <div className="col-lg-4 col-md-12 text-center">
                    <h2 className="pb-2">Seguinos</h2>
                    <ul className="list-unstyled d-flex gap-5 justify-content-center align-items-center">
                        <li><a target="_blank" rel="noopener noreferrer" href="https://x.com/Minecraft"><i
                                    className="bi bi-twitter-x"><span className="d-none">X</span></i></a></li>
                        <li><a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/minecraft"><i
                                    className="bi bi-instagram"><span className="d-none">Instagram</span></i></a></li>
                        <li><a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/minecraft"><i
                                    className="bi bi-youtube"><span className="d-none">YouTube</span></i></a></li>
                        <li><a target="_blank" rel="noopener noreferrer"
                                href="https://www.github.com/mateofiorotto"><i className="bi bi-github"><span
                                        className="d-none">Github</span></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
  );
}

export default Footer;
