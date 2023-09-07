const receta = require('../data');
const {response} = require('../utils');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

module.exports = async (req, res) => {  
    const newReceta = await receta.createReceta(req.body); //metodo creado en data
    response(res,201, newReceta);
}