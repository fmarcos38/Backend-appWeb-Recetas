const {Router} = require('express');
const store = require('../database'); //en este arch q importo TENGO los modelos
const { validateModel } = require('../middleware');

const router = Router();


//rutas
//creo 1 sola ruta GET para q mute entre modelos(en este proyecto SOLO está rectas)
//recibo por params el nombre del modelo
router.get("/:model", validateModel, async(req, res) => {
    const { model } = req.params;
    const resp = await store[model].list();//model --> indica el modelo al q ac referencia(recetas,)
    console.log("resp: ", resp)
    res.status(200).json(resp);
});

module.exports = router;