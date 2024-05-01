import { Viaje } from "../models/viaje.js";
import { Testimonial } from "../models/testimoniales.js";

const pagInicio = async (req, res) => {
  //--req = lo que enviamos, res= lo que se responde

  const promiseDB = []; // Async bloquea cuando hay mas de una promesa por eso el promise DB para ejecutar las 2 al mismo tiempo

  //Consultar 3 viajes del modelo Viaje y pasarlo a la vista
  promiseDB.push(Viaje.findAll( {limit: 3} ));
  promiseDB.push(Testimonial.findAll( {limit: 3} ));

  try {

    const resultado = await Promise.all(promiseDB);
    res.render("inicio", {
      texto: "Inicio",
      clase: "home",
      viajes: resultado[0],// como es un arr especificar la posicion, orden 
      testimonios: resultado[1]
    });
  } catch (error) {
    console.log(error);
  }
};

const pagNosotros = (req, res) => {
  //--req = lo que enviamos, res= lo que se responde

  res.render("nosotros", {
    texto: "Nosotros",
  });
};

const pagContacto = (req, res) => {
  //--req = lo que enviamos, res= lo que se responde
  res.send("Contacto");
};

const pagViajes = async (req, res) => {
  //--req = lo que enviamos, res= lo que se responde
  //Consultar BD
  const viajes = await Viaje.findAll(); //Se trae los registros de la tabla

  // console.log(viajes);

  res.render("viajes", {
    texto: "Proximos viajes",
    viajes,
  });
};

const pagTestimoniales = async (req, res) => {
  try {
    //Consulta la bd
    const testimonios = await Testimonial.findAll(); // Esto es hacer un select en sql

    //Pasar los datos a la pag
    res.render("testimoniales", {
      texto: "Testimonios",
      testimonios,
    });
  } catch (error) {
    console.log(error);
  }
};

//Muestra un viaje por su slug
const pagDetalleViaje = async (req, res) => {
  const { slug } = req.params;

  try {
    const viaje = await Viaje.findOne({ where: { slug } });
    res.render("viaje", {
      texto: viaje.titulo,
      viaje,
    });
  } catch (error) {
    console.log(`Error ${error}`);
  }
};

export {
  pagInicio,
  pagNosotros,
  pagContacto,
  pagViajes,
  pagTestimoniales,
  pagDetalleViaje,
};
