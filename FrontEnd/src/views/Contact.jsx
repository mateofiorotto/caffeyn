import React from "react";

function Contact() {
  return (
    // Formularios de contacto
    <section className="container d-flex justify-content-center pt-5 pb-5">
      <div data-aos="fade-up" className="form-container card pt-5 p-4 bg-dark text-light">
        <h2 className="text-center my-4 pt-5">Cuentanos tu experiencia</h2>
        <form className="p-5 pt-3">
          <div className="mb-4 mt-4">
            <label htmlFor="name" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control bg-dark text-light"
              id="name"
              required
            />
          </div>
          <div className="mb-4 mt-4">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control bg-dark text-light"
              id="email"
              required
            />
          </div>
          <div className="mb-5 mt-4">
            <label htmlFor="message" className="form-label">
              Mensaje
            </label>
            <textarea
              className="form-control bg-dark text-light"
              id="message"
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" className="boton-form btn">Enviar</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
