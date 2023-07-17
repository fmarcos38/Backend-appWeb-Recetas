const {response} = require('../utils');

module.exports = async (req, res) => {

    const newReceta = {message: 'pp'}/* await receta.createReceta(req.data); */
    response(res,201, newReceta);
}