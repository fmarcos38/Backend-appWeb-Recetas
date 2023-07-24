const users = require('../data');

module.exports = async(req, res) => {
    const resp = await users.listaUsers();
    res.status(200).json(resp);
};