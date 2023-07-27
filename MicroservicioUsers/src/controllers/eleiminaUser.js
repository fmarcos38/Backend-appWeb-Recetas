const user = require('../data');

module.exports = async (req, res) => {
    const resp = await user.eliminaUser(req.params._id);
    console.log("resp:", resp);
    res.status(200).json(resp.data);
}