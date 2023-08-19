const metodo = require('../data');

module.exports = async(req, res) => {
    const resp = await metodo.validaCuenta(req.params.token);
    res.status(200).json(resp);
};