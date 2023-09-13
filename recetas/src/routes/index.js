const express = require('express');
const controllers = require("../controllers");
const axios = require('axios');
//manejo de imagenes con cloudinary y multer
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');


const router = express.Router();
// Configurar Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Configurar multer y el almacenamiento en Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    },
});
const parser = multer({ storage: storage });



//rutas---------------------------------------------------------------------

//trae todas las recetas 
router.get('/', controllers.getAllRecetas);

//trae por ID
router.get('/:_id', controllers.getRecetaById);

//crea
router.post('/createR', parser.single("image"), async(req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const formData = {
            title: req.body.title,
            image: result.secure_url,
            cloudinary_id: result.public_id,
            diets: req.body.diets,
            analyzedInstructions: req.body.analyzedInstructions
        };
        const resp = await axios.post("http://localhost:8002/dbrecetas/recetas/createR", formData, );//desd acá le pego EN desarrollo a localhost Y una ves desarrollado el microserv de DB_user a ESTE.
        res.status(200).json(resp.data);
    } catch (error) {
        console.log(error);
    }
});
//edita receta
router.put('/modifR', parser.single("image"), async(req, res) => {
    try {
        const { _id, title, image, diets, analyzedInstructions} = req.body;
        let newReceta = {};
        let result;
        
        newReceta._id = _id;
        if(title){
            newReceta.title = title;
        }
        // Upload image to cloudinary        
        //si viene img nueva
        if(req.file){
            //delete cloud img vieja
            await cloudinary.uploader.destroy(prod.cloudinary_id);
            result = await cloudinary.uploader.upload(req.file.path);

            newReceta.image = result.secure_url;
            newReceta.cloudinary_id = result.public_id;
        }
        if(diets){
            newReceta = diets;
        }
        if(analyzedInstructions){
            newReceta.analyzedInstructions = analyzedInstructions;
        }

        const resp = await axios.put("http://localhost:8002/dbrecetas/recetas/modifR", newReceta);
        res.status(200).json(resp.data);
    } catch (error) {
        console.log(error);
    }
});

//elimina
router.delete('/elimR/:_id', controllers.eleminaReceta);




module.exports = router;