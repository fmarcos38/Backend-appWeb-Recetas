const recetas = require('../data');
const {response} = require('../utils');

module.exports = async (req, res) => {
    const newRecetas = await recetas.createRecetasDesdeApi();
    response(res,201, newRecetas);
};