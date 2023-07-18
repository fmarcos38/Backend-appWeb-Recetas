const express = require('express');
const controllers = require("../controllers");
const Receta = require('../models/receta');
/* const middlewares = require("../middlewares"); */
//para manejo de imagenes 
//const upload = require("../helpers/multer");
//para almacenar en cloudinary
//const cloudinary = require("../helpers/cloudinary");

const router = express.Router();


//rutas
//trae todas las recetas 
router.get('/', controllers.getAllRecetas);


//crea
router.post('/', controllers.createReceta);


//edita
router.post('/:_id', controllers.editaReceta);


//elimina
router.delete('/:_id', controllers.eleminaReceta);

module.exports = router;