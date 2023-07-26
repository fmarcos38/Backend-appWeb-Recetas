const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

//rutas
router.get('/validaCuenta/:token', controllers.validaCuenta);

router.post('/login', controllers.login);

router.post('/loginGoogle', controllers.loginGoogle);


module.exports = router;