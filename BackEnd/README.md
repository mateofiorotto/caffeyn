# APIs de Cafés

Esta es una API REST simple creada para el parcial de la materia Aplicaciones Hibridas en la escuela Da Vinci.

- [Consignas punto por punto](#consignas-punto-por-punto)
- [Uso](#uso)
- [Ir a Datos del proyecto (Alumno, profesor, materia, comisión)](#datos-del-proyecto)

---

## Consignas punto por punto

---

1. Página Principal (/public):
- Debe mostrar un HTML que informe sobre la API y permita acceder a los endpoints mediante URL.
- Debe incluir un pie de página con la siguiente información: Nombre y Apellido, Nombre de la materia, Nombre del docente, Comisión.

Se incluye un archivo estatico index.html donde esta descrita la forma de usar la API, con sus correspondientes endpoints, filtros y uso de JWT.
Tiene la información solicitada en el pie de pagina.

---

2. Rutas (/routes):
- Debe tener al menos 2 rutas, sin contar la ruta de usuarios

Contiene 3 rutas; usuarios, coffees (cafes) y origins (origenes)

- Funcionalidades requeridas que deben estar presentes en al menos una de las dos rutas:
    - Visualizar todos los documentos de una colección
    - Obtener un documento específico por su ID
    - Actualizar la información de un documento
    - Eliminar un documento
    - Incluir al menos dos métodos de filtrado
    - Búsqueda por nombre

Los controladores de cafes, origenes y usuarios cuentan con los metodos CRUD que se describen, get, get x id, post, put y delete.

El controlador de cafe incluye filtrado por roastLevel (nivel de tostado) y origen (mediante el nombre del origen). También cuenta con la busqueda de nombre.
Estas tres funciones solo estan en el controlador de cafes y en el mismo metodo GET.

---

3. Autenticación (/auth):
- Aplicar autenticación utilizando JSON Web Tokens (JWT)

Cuenta con un middleware en auth.js que utiliza JWT para verificar si el usuario esta logueado o no y otro metodo para verificar si el usuario tiene como rol ADMIN o USER. Se utiliza en los metodos POST, PUT y DELETE. El metodo GET es publico para todos los usuarios. Los usuarios puede crearlos cualquier persona con el rol que desee ya que es a modo de prueba, pero normalmente solo se crearian de forma automatica al mandar el post como user y los administradores a mano desde la DB.

---

4. Validaciones (En controladores y clases):
- Incluir las validaciones necesarias.

Hay validaciones basicas para campos vacios en los metodos POST o cuando se pasa una ID inexistente en metodos que lo requieran como get x id, delete o put.
Tambien se valida que NO haya mails (en el controlador de User) repetidos ya que en el Model aclara que es unico.
Se valida tambien en el Model, con required, max, min y se arroja un error personalizado en caso de haberlo, pero siempre se toma antes
el error del controlador.

---

Evaluación:
- Modelado de base de datos (/model - /config)
Se utiliza Mongo para la DB no relacional y Schemas para cada model/clase en /model.

- API (manejo correcto de las reglas básicas)
Se hace manejo de solicitudes y respuestas HTTP y el uso de un servidor local.

- División de responsabilidades (manejo correcto de views, models, controllers y
routes)
    - Vistas: todavia no hay vistas
    - Model: se encarga de modelar la entidad que ira en la DB
    - Controlador: comunica el modelo con el usuario que realiza peticiones HTTP y valida datos.
    - Rutas: establece las rutas que el usuario utilizara para realizar peticiones.

Cada vista, modelo, controlador y rutas cumple su funcion.

- Uso correcto de módulos

Se utiliza import y export con ES6Module.

- Uso correcto de Express

Se usa Express para establecer la conexion con el servidor y la API.

---

Instrucciones Adicionales:

- Para imágenes, si se requieren, pueden utilizar algún generador de imágenes
aleatorias (image placeholder)

No se utilizan imagenes, si bien hay un campo, es un string que tendria una direccion url de internet o local.

- El código debe estar alojado en GitHub. Enviar solo el enlace al repositorio.

- Incluir un archivo README.md con los datos del proyecto como ser: Nombre y Apellido, Nombre de la materia, Nombre del docente, Comisión.

### PD: En datos-prueba.txt se encuentran algunos JSON para copiar y pegar y no tener que estar escribiendo a mano

---

## Uso 

1. Clona el repositorio con 

```git clone https://github.com/mateofiorotto/API_cafes_express```

2. Entra a la carpeta del proyecto y descarga las dependencias <br>

``` cd API_cafes_express ```

``` npm install ```

3. Ejecutar proyecto

``` npm start ```

---

## Datos del proyecto
- **ALUMNO:** Mateo Fiorotto
- **MATERIA:** Aplicaciones Hibridas
- **DOCENTE:** Jonathan Emanuel Cruz
- **COMISIÓN:** DWT4AV
