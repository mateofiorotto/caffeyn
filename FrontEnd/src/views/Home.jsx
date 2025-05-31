import { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <section id="home" className="container-fluid">
      <div className="hero">
        <p className="d-none">Seccion del hero</p>
      </div>

      <section className="pb-5 pt-5">
        <div className="mt-3 mb-5 pb-5 text-center banner">
          <div className="container">
            <h2>Somos Caffeyn</h2>
            <p>
              Somos una empresa dedicada a la venta de cafés, te ofrecemos la
              mejor calidad y el mejor servicio. Estamos contentos de que te
              encuentres en nuestra web.
            </p>
          </div>
        </div>
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6 col-12 text-center pe-5 ps-5">
            <div className="ps-5 pe-5">
              <h2 className="mb-4">Experiencia cafetera única</h2>
              <p>
                Desde el primer aroma que se desprende al abrir el paquete hasta
                el último sorbo en tu taza, buscamos que vivas una experiencia
                completa. No se trata solo de vender café, sino de conectar con
                las personas a través de un ritual cotidiano que puede
                convertirse en un momento especial. Nuestro equipo está
                conformado por personas apasionadas por el café, comprometidas
                con ofrecerte un producto de excelencia que respete tanto al
                consumidor como al productor. Nos esforzamos por brindarte
                atención personalizada, recomendaciones según tus gustos y una
                experiencia que te invite a volver. Porque cuando cuidamos los
                detalles, el resultado se siente en cada taza.
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-12 px-0">
            <img
              src="public/imgs/home-01.jpg"
              alt="Experiencia cafetera única"
              className="w-100"
            />
          </div>
        </div>

        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6 col-12 px-0 order-2 order-lg-1">
            <img
              src="public/imgs/home-02.jpg"
              alt="Origen natural"
              className="img-fluid w-100"
            />
          </div>
          <div className="col-lg-6 col-12 text-center ps-5 pe-5 order-1 order-lg-2">
            <div className="ps-5 pe-5">
              <h2 className="mb-4">Origen natural</h2>
              <p>
                Seleccionamos cuidadosamente granos provenientes de fincas
                ubicadas en regiones cafetaleras reconocidas por su calidad y
                tradición. Cada uno de nuestros cafés es el resultado de un
                proceso artesanal que comienza en el cultivo y termina en tu
                taza. Trabajamos con productores que comparten nuestros valores:
                respeto por la tierra, compromiso con la calidad y un enfoque
                sostenible. Los granos son cosechados a mano, secados al sol y
                tostados con precisión para resaltar sus notas naturales, ya sea
                que prefieras un café suave y frutado o uno intenso y
                achocolatado. Nuestro objetivo es que conozcas el verdadero
                sabor del café de origen, sin intermediarios ni procesos
                industriales que arruinen su esencia.
              </p>
            </div>
          </div>
        </div>

        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6 col-12 text-center">
            <div className="ps-5 pe-5">
              <h2 className="mb-4">Pasión por el sabor</h2>
              <p>
                Nuestro amor por el café se traduce en cada etapa del proceso.
                Desde la búsqueda de los mejores granos hasta la preparación
                final, cada paso está pensado para garantizar una experiencia
                sensorial superior. Sabemos que el café no es solo una bebida,
                sino un compañero en tus mañanas, en tus reuniones, en tus
                momentos de concentración o descanso. Por eso, trabajamos con
                métodos de tueste y molienda que respetan la complejidad de cada
                grano, potenciando su sabor y aroma natural. Nuestro objetivo es
                simple: que cada taza tenga carácter, que cuente una historia, y
                que al probarla, quieras volver a vivir ese momento una y otra
                vez.
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-12 px-0">
            <img
              src="public/imgs/home-03.jpg"
              alt="Pasion por el sabor"
              className="img-fluid w-100"
            />
          </div>
        </div>
      </section>

      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-4">¿Por qué elegirnos?</h2>
          <p className="lead">
            Porque no solo vendemos café, compartimos una pasión. Nos importa la
            calidad, el origen y tu experiencia como cliente. Apostamos por lo
            artesanal, por el trato personalizado y por brindarte lo mejor,
            siempre.
          </p>
        </div>
      </section>
    </section>
  );
}

export default Home;
