const recetas = require('../data');

module.exports = async(req, res) => {
    const resp = await recetas.gatRecetasDB();
    res.status(200).json(resp);
};