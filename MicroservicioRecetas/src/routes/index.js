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
//trae de la API
//router.get("/api", controllers.getRecetasAPi);
//crea desde API
//router.get('/creaDesdeApi', controllers.createRecetasApi);


//crea
router.post('/', controllers.createReceta);


//filtra
router.post('/filtro', controllers.filtraRecetas);

//edita
router.post('/:_id', controllers.editaReceta);

//elimina
router.delete('/:_id', controllers.eleminaReceta);






module.exports = router;