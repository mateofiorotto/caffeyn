import { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import { Link } from "react-router-dom";

export function Home({}) {
  return (
    <section id="home">
      <div className="hero">
        <p className="d-none">Seccion del hero</p>
      </div>
      <h1 className="d-none"></h1>

      <section className="container p-5">
        <div className="row">
          <div className="col-lg-6 col-12">
            <h2>¡Llevate tu café!</h2>
            <p>
              Somos una empresa dedicada a la venta de cafés, te ofrecemos la
              mejor calidad y el mejor servicio. Estamos contentos de que te
              encuentres en nuestra web.
            </p>
          </div>

          <div className="col-lg-6 col-12"></div>
        </div>
      </section>
    </section>
  );
}

export default Home;
