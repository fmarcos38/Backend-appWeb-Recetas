const receta = require('../data');
const {response} = require('../utils');

module.exports = async (req, res) => {    
    console.log("req.body", req.body);
    const newReceta = await receta.filtraRecetas(req.body); //metodo creado en data
    response(res,201, newReceta);
}