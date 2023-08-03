const {Router} = require('express');
const modelos = require('../database'); //en este arch q importo TENGO los modelos
const { validateModel } = require('../middleware');

const router = Router();


//rutas
//creo 1 sola ruta GET para q mute entre modelos(en este proyecto SOLO está rectas)
//recibo por params el nombre del modelo
router.get("/:model", validateModel, async(req, res) => {
    const { model } = req.params; 
    const { desde } = req.query;
    const { dieta } = req.query;
    console.log("desdeDB:", desde)
    console.log("dietaDB:", dieta)
    const resp = await modelos[model].list(desde, dieta);//model --> indica el modelo al q ac referencia(recetas,)
    
    res.status(200).json(resp);
});

//busca por mail
router.get("/:model/:email", validateModel, async(req, res) => {
    const { model, email } = req.params; 
    const resp = await modelos[model].buscaPorMail(email);//model --> indica el modelo al q ac referencia(recetas,)
    
    res.status(200).json(resp);
});


//crea
router.post("/:model", validateModel, async(req, res) => {
    const { model } = req.params;
    const resp = await modelos[model].insert(req.body);
    res.status(200).json(resp);
});
router.post("/:model/creaDesdeApi", validateModel, async(req, res) => {
    const { model } = req.params;
    const resp = await modelos[model].insertRecetasApi(req.body);
    res.status(200).json(resp);
});

//edita
/* router.post("/:model/:_id",validateModel, async(req, res) => {    
    const { model, _id } = req.params;
    const resp = await modelos[model].edit(_id, req.body.title);
    res.status(200).json(resp);
}); */

//elimina
router.delete("/:model/:_id",validateModel, async(req, res) => {
    const { model, _id } = req.params;
    const resp = await modelos[model].delete(_id);
    res.status(200).json(resp);
});

//filtraRecetas
router.post("/:model/filtro", validateModel, async(req, res) => {
    const { model } = req.params;
    const resp = await modelos[model].filtra(req.query.desde, req.body.dieta);
    res.status(200).json(resp);
});

module.exports = router;