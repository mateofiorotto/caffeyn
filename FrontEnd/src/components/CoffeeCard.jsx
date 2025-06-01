function CoffeeCard({ name, description, roastLevel, flavorNote, image, origin }) {
  return (
    <div className="card bg-dark text-light mb-3 border-secondary">
      <img src={`/public/imgs/${image}`} className="card-img-top" alt={name} style={{ maxHeight: '200px', objectFit: 'cover' }} />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
}
export default CoffeeCard;