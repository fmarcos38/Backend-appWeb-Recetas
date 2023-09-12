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
        console.log("formData:", formData);
        const resp = await axios.post("http://localhost:8002/dbrecetas/recetas/createR", formData, );//desd acá le pego EN desarrollo a localhost Y una ves desarrollado el microserv de DB_user a ESTE.
        return resp.data;
    } catch (error) {
        console.log(error);
    }
});

//edita
router.post('/:_id', controllers.editaReceta);

//elimina
router.delete('/elimR/:_id', controllers.eleminaReceta);

//elim dieta DB
router.post('/elimDietDB', controllers.elimDietDB);


module.exports = router;