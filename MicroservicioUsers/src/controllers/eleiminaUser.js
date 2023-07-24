const user = require('../data');

module.exports = async (req, res) => {
    const resp = await user.eliminaUser(req.body);
    res.status(200).json(resp);
}