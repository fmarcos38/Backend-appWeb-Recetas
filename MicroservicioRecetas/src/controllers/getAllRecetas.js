const recetas = require('../data');

module.exports = async (req, res) => {
    const { desde, dieta } = req.query;
    const resp = await recetas.getAllRecetas(desde, dieta);
    res.status(200).json(resp);
};