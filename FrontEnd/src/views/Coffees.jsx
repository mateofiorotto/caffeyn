import { useEffect, useState } from "react";
import { fetchCafes } from "../services/api";
import CoffeeCard from "../components/CoffeeCard";

function Coffees() {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    fetchCafes().then(setCafes);
  }, []);

  return (
    <section className="container coffees pt-5 pb-5">
    <div className="row justify-content-center align-items-center">
      <h2 className="text-center pt-5 pb-5 text-uppercase fw-bold">Cafés Disponibles</h2>
      {cafes.length > 0 ? (
        cafes.map((cafe) => (
          <div key={cafe._id} className="col-lg-4 col-12">
            <a
              href={`/details/${cafe._id}`}
              className="text-decoration-none text-light"
            >
              <CoffeeCard
                name={cafe.name}
                price={cafe.price}
                description={cafe.description}
                image={cafe.image}
                shortDescription={cafe.shortDescription}
                origin={cafe.origin}
              />
            </a>
          </div>
        ))
      ) : (
        <p>No hay cafés disponibles.</p>
      )}
    </div>
    </section>
  );
}

export default Coffees;
