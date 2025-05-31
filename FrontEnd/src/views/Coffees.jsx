import { useEffect, useState } from 'react';
import { fetchCafes } from '../services/api';
import CoffeeCard from '../components/CoffeeCard';

function Coffees() {
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    fetchCafes().then(setCafes);
  }, []);

  return (
    <div>
      <h2>Cafés Disponibles</h2>
      {cafes.length > 0 ? (
        cafes.map((cafe) => (
          <CoffeeCard
            key={cafe._id}
            name={cafe.name}
            price={cafe.price}
            description={cafe.description}
            roastLevel={cafe.roastLevel}
            flavorNote={cafe.flavorNote}
            image={cafe.image}
            origin={cafe.origin}
          />
        ))
      ) : (
        <p>No hay cafés disponibles.</p>
      )}
    </div>
  );
}

export default Coffees;
