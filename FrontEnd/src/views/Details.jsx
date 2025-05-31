import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCafeById } from '../services/api';
import Coffee from '../components/Coffee';

function Details() {
  const { id } = useParams();
  const [cafe, setCafe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCafeById(id)
      .then(setCafe)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!cafe) return <p className="text-light">Cargando café...</p>;

  return (
    <div className="container mt-5 mb-5">
      <Coffee
        name={cafe.name}
        price={cafe.price}
        description={cafe.description}
        roastLevel={cafe.roastLevel}
        flavorNote={cafe.flavorNote}
        image={cafe.image}
        origin={cafe.origin}
      />
    </div>
  );
}

export default Details;
