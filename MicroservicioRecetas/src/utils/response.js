//creo función para las respuestas de las peticiones, en lo q respecta al manejo de errorres

module.exports = (res, statusCode, data) => {
    res.status(statusCode).json({
        error: false,
        data //no ac falta hacer data: data(ya q le paso el obj literal)
    })
};
