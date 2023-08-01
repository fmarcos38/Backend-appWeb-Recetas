const recetas = require('../data');

module.exports = async (req, res) => {
    console.log("dadhjksdhfadfafgta: ", req.body)
    const resp = await recetas.filtraRecetas(req.body);
    res.status(200).json(resp);
};