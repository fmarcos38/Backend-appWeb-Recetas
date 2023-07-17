const express = require('express');
const controllers = require("../controllers");
const Receta = require('../models/receta');
/* const middlewares = require("../middlewares"); */
//para manejo de imagenes 
const upload = require("../helpers/multer");
//para almacenar en cloudinary
const cloudinary = require("../helpers/cloudinary");



const router = express.Router();

//rutas
//trae todas las recetas 
router.get('/allRecetas', controllers.getAllRecetas);

//trae solo API
router.get('/recetasApi', controllers.getRecetasApi);

//trae solo DB
router.get('/recetasDB', controllers.getRecetasDB);
//trae por una


//crea
router.post('/', upload.single("imagen"), async(req, res) => {

    //console.log("req.body:", req.body)
    //console.log("req.file.path:", req.file.path)
    try {
        //Upload image to cloudinary
        //const result = await cloudinary.uploader.upload(req.file.path);

        let newReceta = Receta({
            title: req.body.title,
            image: req.body.image,
            //image: result.secure_url,
            //cloudinary_id: result.public_id,
            diets: req.body.diets,
            analyzedInstructions: req.body.analyzedInstructions
        });

        await newReceta.save();
        res.status(200).send("Prod agregado con exito");
    } catch (error) {
        console.log(error);
    }
    
});


//edita
router.post('/edita/:_id', controllers.editaReceta);


//elimina
router.delete('/elimReceta/:_id', controllers.eleminaReceta);

module.exports = router;