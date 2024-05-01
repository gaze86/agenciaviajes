
import {Testimonial} from '../models/testimoniales.js';

const guardarTestimonial = async (req,res) =>{

  //Validar campos...

  const {nombre, correo, mensaje} = req.body;

  const errores = [];

  if(nombre.trim() === ""){
    errores.push({mensaje: 'El nombre esta vacio'});
  }

  if(correo.trim() === ""){
    errores.push({mensaje: 'El correo esta vacio'});

  }

  if(mensaje.trim() === ""){
    errores.push({mensaje: 'El mensaje esta vacio'});

  }
  if(errores.length > 0){

    //Consultar testimonios existentes
    const testimonios = await Testimonial.findAll(); // Esto es hacer un select en sql


    // Mostrar vista con errores
    res.render("testimoniales", {
      pagina: "Testimonios",
      errores,
      nombre,
      correo,
      mensaje,
      testimonios
    });
  }
  else{

    //Si todo ok almacenar en la base de datos
    try {
        await Testimonial.create({
          nombre,
          correo,
          mensaje
        });
        res.redirect('/testimoniales');

    } catch (error) {
      console.log(error)
    }

  }
};

export {
  guardarTestimonial
}