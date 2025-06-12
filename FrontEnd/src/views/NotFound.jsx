function NotFound() {
  
  return (
    <section className="container pt-5 pb-5">
        <div className="error-404 d-flex flex-column justify-content-center align-items-center">
            <h2 className="text-center">404 - No encontrado</h2>
            <i className="bi bi-emoji-frown emoji-404"></i>
            <p className="text-center">Parece que el recurso o página que buscas no se encuentra disponible</p>
            <a className="btn btn-primary mt-5 volver" href="/">Volver a la home</a>
        </div>
    </section>
  );
}

export default NotFound;
