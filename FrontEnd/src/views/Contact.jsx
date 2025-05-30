import React from 'react'

function Contact(){
  return (
    // Formularios de contacto
    <div className="container">
        <h2 className="text-center my-4">Cuentanos tu experiencia</h2>
        <form>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="name" placeholder="Ingrese su nombre" required />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" placeholder="Ingrese su email" required />
            </div>
            <div className="mb-3">
                <label htmlFor="message" className="form-label">Mensage</label>
                <textarea className="form-control" id="message" rows="4" placeholder="Ingrese su mensaje" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Enviar</button>
            <button type="reset" className="btn btn-secondary ms-2">Borrar</button>
        </form>
    </div>
  )
}

export default Contact