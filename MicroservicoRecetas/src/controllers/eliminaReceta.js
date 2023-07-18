const receta = require('../data');
const {response} = require('../utils');

module.exports = async(req, res) => {
    const resp = receta.eliminaReceta(req);
    response(res,201, resp);
};