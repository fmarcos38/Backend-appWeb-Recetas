const recetas = require('../data');

module.exports = async (req, res) => {
    const { desde, palabra, dieta } = req.query;
    const resp = await recetas.getAllRecetas(desde, palabra,dieta);
    res.status(200).json(resp);
};