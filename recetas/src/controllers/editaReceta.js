const receta = require('../data');
const {response} = require('../utils');

module.exports = async(req, res) => {
    const {dieta} = req.body;
    const resp = await receta.editaR(dieta);
    response(res,201, resp);
}