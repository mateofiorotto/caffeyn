import React from "react";
import { useState, useEffect } from "react";
import CardProduct from "../components/CardProduct";

function Coffees() {
  const [productos, setProductos] = useState([]);
  const [logueado, setLogueado] = useState(true); // podés ponerlo en false para simular login

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/coffees/");
        const data = await res.json();
        setProductos(data.data);
      } catch (error) {
        console.error("Error al traer productos:", error);
      }
    };

    getProducts();
  }, []);
  return (
    <div className="container">
      <h2>Productos</h2>
      <div className="row">
        
        {productos.map((prod) => (
          <div key={prod._id} className="col-lg-4 col-12 p-4">
          <CardProduct
            key={prod._id}
            id={prod.id}
            name={prod.name}
            image={prod.image}
            origin={prod.origin.country}
          />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Coffees;
