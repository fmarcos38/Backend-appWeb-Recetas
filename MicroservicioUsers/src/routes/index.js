const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

//rutas
router.post('/', controllers.createUser);

//trae todos los users
router.get('/:email', controllers.listaUsers);

router.delete('/', controllers.eliminaUser);

module.exports = router;