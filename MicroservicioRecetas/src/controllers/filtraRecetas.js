const receta = require('../data');
const {response} = require('../utils');

module.exports = async (req, res) => {    
    const newReceta = await receta.filtraRecetas(req.query, req.body); //metodo creado en data
    response(res,201, newReceta);
}