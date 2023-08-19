const express = require('express');
const controllers = require("../controllers");
/* const middlewares = require("../middlewares"); */
//para manejo de imagenes 
//const upload = require("../helpers/multer");
//para almacenar en cloudinary
//const cloudinary = require("../helpers/cloudinary");

const router = express.Router();


//rutas

//trae todas las recetas 
router.get('/', controllers.getAllRecetas);

//trae por ID
router.get('/:_id', controllers.getRecetaById);

//crea
router.post('/', controllers.createReceta);

//edita
router.post('/:_id', controllers.editaReceta);

//elimina
router.delete('/:_id', controllers.eleminaReceta);






module.exports = router;