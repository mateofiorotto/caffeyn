import { useEffect, useState } from 'react';
import { fetchOrigens } from '../services/api';
import OriginCard from '../components/OriginCard';

function Origins() {
  const [origenes, setOrigenes] = useState([]);

  useEffect(() => {
    fetchOrigens().then(setOrigenes);
  }, []);

  return (
    <div>
      <h2>Orígenes Disponibles</h2>
      {origenes.length > 0 ? (
        origenes.map((origen) => (
          <OriginCard
            key={origen._id}
            name={origen.name}
            country={origen.country}
          />
        ))
      ) : (
        <p>No hay orígenes disponibles.</p>
      )}
    </div>
  );
}

export default Origins;
