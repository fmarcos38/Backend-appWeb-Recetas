const users = require('../data');

module.exports = async(req, res) => {
    const resp = await users.buscaPorMail(req.params.email);
    res.status(200).json(resp);
};