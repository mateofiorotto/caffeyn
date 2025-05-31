import { useEffect, useState } from "react";
import { fetchCafes } from "../services/api";
import CoffeeCard from "../components/CoffeeCard";

function Coffees() {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    fetchCafes().then(setCafes);
  }, []);

  return (
    <section className="container coffees">
    <div className="row justify-content-center align-items-center">
      <h2>Cafés Disponibles</h2>
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
                roastLevel={cafe.roastLevel}
                flavorNote={cafe.flavorNote}
                image={cafe.image}
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
