const recetas = require('../data');

module.exports = async(req, res) => {
    const resp = await recetas.getAllRecetas();
    res.status(200).json(resp);
};