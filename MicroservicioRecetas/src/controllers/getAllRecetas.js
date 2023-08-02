const recetas = require('../data');

module.exports = async (req, res) => {
    console.log("desde", req.query);
    const resp = await recetas.getAllRecetas(req.query.desde);
    res.status(200).json(resp);
};