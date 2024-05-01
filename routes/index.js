import express from "express";
import {
  pagContacto,
  pagInicio,
  pagNosotros,
  pagTestimoniales,
  pagViajes,
  pagDetalleViaje
} from "../controller/paginasController.js";

import {guardarTestimonial} from "../controller/testimonialController.js"

const router = express.Router();

// Rutas de las diferentes pag de la aplicacion
router.get("/", pagInicio);

router.get("/nosotros", pagNosotros);

router.get("/contacto", pagContacto);

router.get("/viajes", pagViajes);

router.get("/viajes/:slug", pagDetalleViaje); //Enrutador cuanado se hace click en el btn de la pagina de viajes

router.get("/testimoniales", pagTestimoniales);

router.post("/testimoniales", guardarTestimonial);//Guarda los datos del form-testimoniales

export default router;
