const receta = require('../data')
const {response} = require('../utils');

module.exports = async (req,res) => {
    const { _id } = req.params; 
    const editaReceta = await receta.editaReceta(_id, req.body); 
    response(res,201, editaReceta);
}