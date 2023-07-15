const {Router}= require('express');
const controllers = require("../controllers");

const router = Router();

//rutas
router.get('/', controllers.getRecetasApi);



module.exports = router;