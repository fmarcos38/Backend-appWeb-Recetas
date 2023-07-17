const receta = require('../data')

module.exports = async (req,res) => {
    const editaReceta = receta.editaReceta(req); 
    res.status(200).json(editaReceta);
}