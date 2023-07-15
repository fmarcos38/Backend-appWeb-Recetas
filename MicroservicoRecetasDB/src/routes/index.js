const {Router}= require('express');
const controllers = require("../controllers");
/* const middlewares = require("../middlewares"); */
const router = Router();

//rutas
//trae todas
router.get('/', controllers.getRecetasDB);

//crea
router.post('/', /* middleware.dataValidation, */ controllers.createReceta);

module.exports = router;