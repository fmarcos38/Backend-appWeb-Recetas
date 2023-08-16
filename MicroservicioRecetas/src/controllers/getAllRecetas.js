const recetas = require('../data');

module.exports = async (req, res) => {
    const { desde, palabra, dieta, hasta } = req.query;
    const resp = await recetas.getAllRecetas(desde, palabra,dieta, hasta);
    res.status(200).json(resp);
};