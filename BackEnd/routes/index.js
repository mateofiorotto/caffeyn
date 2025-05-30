//Importar rutas
import coffeeRouter from "./coffeRouter.js";
import originRouter from "./originRouter.js";
import userRouter from "./userRouter.js";

//llamamos a las rutas en esta funcion y las exportamos para usar en server.js
function routerAPI(app) {
    app.use("/api/coffees", coffeeRouter);
    app.use("/api/origins", originRouter);
    app.use("/api/users", userRouter);
}

export default routerAPI;