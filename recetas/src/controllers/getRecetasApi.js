const recetas  = require('../data');

module.exports = async (req, res) => {
    const allRecetasApi = await recetas.getRecetasAPI();//acá podría pasarle el nomb de la receta a buscar
    res.status(200).json(allRecetasApi);
};