const receta = require("../data");

module.exports = async(req, res) => {
    const { _id } = req.params;
    const resp = await receta.getRecetaById(_id);
    res.status(200).json(resp);
};