const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

//rutas
router.post('/', controllers.createUser);

router.get('/', controllers.listaUsers);

router.delete('/', controllers.eliminaUser);

module.exports = router;