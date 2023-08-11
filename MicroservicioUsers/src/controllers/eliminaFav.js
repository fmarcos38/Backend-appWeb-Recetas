const user = require('../data');

module.exports = async(req, res) => {
    const { email } = req.params;
    const  { _id } = req.body;
    const resp = await user.eliminaFav(email, _id);
    res.status(200).json(resp);
};