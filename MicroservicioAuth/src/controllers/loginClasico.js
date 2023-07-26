const metodo = require('../data');

module.exports = async(req, res) => {
    const resp = await metodo.login(req.body);
    res.status(200).json(resp);
};