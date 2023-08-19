//importo las funciones creadas en data
const user = require('../data');

module.exports = async(req, res) => {
    const newUser = await user.createUser(req.body);
    res.status(200).json(newUser);
};