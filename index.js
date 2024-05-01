import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";

//Asignar a app un metodo que sirve para arrancar-empezar--ES EL METODO PRINCIPAL
const app = express();

//Conectar a la base de datos
db.authenticate()
  .then(() => console.log("bd conectada"))
  .catch((error) => console.log(`Error: ${error}`));

//Definir puerto
const port = process.env.PORT || 4000;

//Habilitar pug --Es como un molde para el html
app.set("view engine", "pug");

//Obtener el año actual y otras variables globales???
app.use((req, res, next) => {
  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.nombreSitio = "Agencia de Viajes";
  next();
});

//Agregar body parser para leer datos de formulario
app.use(express.urlencoded( {extended: true} ));

//Definir la carpeta publica => Darle acceso a todas las partes del proyecto solo a public
app.use(express.static("public"));

app.use("/viajes", express.static("public")); // Le da acceso a las paginas creadas a partir de viajes

//Agregar Router
app.use("/", router);

//Se ejecuta
app.listen(port, () => {
  console.log(`http://localhost:${port} `);
});
