const recetasDB = require('../data');

module.exports = async(req, res) => {
    const recetas = await recetasDB.getRecetasDB();
    res.status(200).json(recetas);
};