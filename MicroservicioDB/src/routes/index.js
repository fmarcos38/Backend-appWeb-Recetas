const {Router} = require('express');
const modelos = require('../database'); //en este arch q importo TENGO los modelos
const { validateModel } = require('../middleware');

const router = Router();


//rutas
//creo 1 sola ruta GET para q mute entre modelos
//recibo por params el nombre del modelo
router.get("/:model", validateModel, async(req, res) => {
    const { model } = req.params; 
    const { desde } = req.query;
    const { dieta } = req.query;
    const resp = await modelos[model].list(desde, dieta);//model --> indica el modelo al q ac referencia(recetas,)
    
    res.status(200).json(resp);
});


/*----------RUTAS EXCLUSIVAS RECETAS-----------------------------------------------------------*/

//ATENTO Q CUANDO ES UNA RUTA PARA UN SCHEMA EN PARTICULAR , ESPECIFICACRCELÓ
router.post("/:model/creaDesdeApi", validateModel, async(req, res) => {
    const { model } = req.params;
    
    const resp = await modelos[model].insertRecetasApi(req.body);
    res.status(200).json(resp);
});

//trae receta por id
router.get("/:model/busca/:_id", validateModel, async(req, res) => {
    const { model, _id } = req.params;
    const resp = await modelos[model].listById(_id);
    res.status(200).json(resp);
});

router.get("/:model/buscaPalabra", validateModel, async(req, res) => {
    const { model } = req.params; 
    const { desde } = req.query;
    const { palabra } = req.query;
    const { dieta } = req.query;
    const resp = await modelos[model].buscaPorPalabra(desde, palabra, dieta);
    
    res.status(200).json(resp);
});

/*---------------------FIN RUT.EXC RECETAS-------------------------------------------------------*/



/*----------RUTAS EXCLUSIVAS USERS---------------------------------------------------------------*/
//busca por mail
router.get("/:model/:email", validateModel, async(req, res) => {
    const { model, email } = req.params; 
    const resp = await modelos[model].buscaPorMail(email);//model --> indica el modelo al q ac referencia(recetas,)
    
    res.status(200).json(resp);
});

//agrega favoritos
router.post("/:model/agregaFav/:email", validateModel, async(req, res) => {
    const { model, email } = req.params; 
    const { _id } = req.body; 
    const resp = await modelos[model].agregaFav(email, _id);
    res.status(200).json(resp);
});
//elim fav
router.post("/:model/elimFav/:email", validateModel, async(req, res) => {
    const { model, email } = req.params; 
    const { _id } = req.body; 
    const resp = await modelos[model].eliminaFav(email, _id);
    res.status(200).json(resp);
});
/*---------------------FIN RUT.EXC RECETAS-------------------------------------------------------*/



/*--------------RUTAS COMUNES--------------------------------------------------------------------*/
//crea
router.post("/:model", validateModel, async(req, res) => {
    const { model } = req.params;
    const resp = await modelos[model].insert(req.body);
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



module.exports = router;