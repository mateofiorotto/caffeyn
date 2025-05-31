function CoffeeCard({ name, description, roastLevel, flavorNote, image, origin }) {
  return (
    <div className="card bg-dark text-light mb-3 border-secondary">
      <img src={image} className="card-img-top" alt={name} style={{ maxHeight: '200px', objectFit: 'cover' }} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text"><strong>Nivel de tostado:</strong> {roastLevel}</p>
        <p className="card-text"><strong>Nota de sabor:</strong> {flavorNote}</p>
        {origin && (
          <p className="card-text">
            <strong>Origen:</strong> {origin.country}, {origin.region}
          </p>
        )}
      </div>
    </div>
  );
}
export default CoffeeCard;