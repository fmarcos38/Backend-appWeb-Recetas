//en este arch voy a verificar la data q me llega, y para eso voy a hacer
//uso de la clase q cree en Utils->errors
const {ClientError} = require('../utils/errors');


module.exports = (req, res, next) => {
    const {title} = req.body;

    if(title) return next();
    else throw new ClientError("Error, no enviaron el title", 401); //llamo a la clase q cree en la carpeta errors
};