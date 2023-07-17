const {Router} = require('express');
const modelos = require('../database'); //en este arch q importo TENGO los modelos
const { validateModel } = require('../middleware');

const router = Router();


//rutas
//creo 1 sola ruta GET para q mute entre modelos(en este proyecto SOLO está rectas)
//recibo por params el nombre del modelo
router.get("/:model", validateModel, async(req, res) => {
    const { model } = req.params;
    const resp = await modelos[model].list();//model --> indica el modelo al q ac referencia(recetas,)
    
    res.status(200).json(resp);
});


//crea
router.post("/:model", validateModel, async(req, res) => {
    const { model } = req.params;
    const resp = await modelos[model].insert(req.body);
    res.status(200).json(resp);
});


//edita
router.post("/:model/:_id",validateModel, async(req, res) => {
    const { model, _id } = req.params;
    const { title } = req.body;
    const resp = await modelos[model].edita(_id, title);
    res.status(200).json(resp);
});

//elimina
router.delete("/:model/:_id",validateModel, async(req, res) => {
    const { model, _id } = req.params;
    const resp = await modelos[model].elimina(_id);
    res.status(200).json(resp);
});
module.exports = router;