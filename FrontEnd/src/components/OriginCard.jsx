function OriginCard({ name, country }) {
  return (
    <div className="card bg-dark text-light mb-3 border-secondary">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text"><strong>País:</strong> {country}</p>
      </div>
    </div>
  );
}

export default OriginCard;
