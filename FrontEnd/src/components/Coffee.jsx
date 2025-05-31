function Coffee({ name, description, roastLevel, flavorNote, image, origin }) {
  return (
    <div className="row justify-content-center align-items-center ">
      <div class="col-lg-6 col-12">
        <img src={`/public/imgs/${image}`} className="img-fluid d-block m-auto" alt={name}/>
      </div>
      <div className="col-lg-6 col-12">
        <h2 className="mb-3 card-title">{name}</h2>
        <p className="card-text">{description}</p>
        <p className="card-text"><strong>Nivel de tostado:</strong> {roastLevel}</p>
        <p className="card-text"><strong>Nota de sabor:</strong> {flavorNote}</p>
        {origin && (
          <p className="card-text">
            <strong>Origen:</strong> {origin.country}, {origin.region}
          </p>
        )}
        <a href="/cart" className="mt-3 me-4 btn btn-warning">Agregar al carrito</a>
        <a href="/cart" className="mt-3 btn btn-primary">Comprar</a>
      </div>
    </div>
  );
}
export default Coffee;