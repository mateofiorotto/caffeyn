import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCafeById } from '../services/api';
import Coffee from '../components/Coffee';

function Details() {
  const { id } = useParams();
  const [cafe, setCafe] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCafeById(id)
      .then((data) => {
        setCafe(data);
      })
      .catch((err) => {
        if (err.message === "404") {
          navigate('/404', { replace: true }); // Redirige a la página 404
        } else {
          setError(err.message);
        }
      });
  }, [id, navigate]);

  if (error) return <div className="fw-bold text-center pt-5 pb-5 mt-5 pb-5 mb-5 fs-2">Ocurrió un error</div>;
  if (!cafe) return <p className="fw-bold text-center pt-5 pb-5 mt-5 pb-5 mb-5 fs-2">Cargando café...</p>;

  return (
    <section className="detalles-cafe">
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
    </section>
  );
}

export default Details;
