const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

//rutas
router.post('/', controllers.createUser);

//trae todos los users
router.get("/", controllers.listaUsers);

// busca por email 
router.get('/:email', controllers.buscaPorMail);

//elim user
router.delete('/:_id', controllers.eliminaUser);

module.exports = router;