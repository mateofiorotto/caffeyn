import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";

import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import { PrivateRoute } from "./utils/PrivateRoute";
import Header from "./components/Header";
import Products from "./views/Coffees";
import Contact from "./views/Contact";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <Header/>
     
      

      {/*  En está sección vamos a mostrar las vista */ }
      <Routes>
        <Route path='/'  element={ <Home />} />
        <Route path='/coffees' element={ <Products />} />
        <Route path='/contact' element={ <Contact />} />
        {/* <Route path='*' element={ <NotFound />} /> */}
      </Routes>
      
      <Footer/>
    </>
  )
}


export default App;