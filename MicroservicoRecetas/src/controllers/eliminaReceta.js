const receta = require('../data');

module.exports = async(req, res) => {
    const resp = receta.eliminaReceta(req);
    res.status(200).json(resp);
};