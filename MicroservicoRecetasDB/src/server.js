const express = require('express');
const morgan = require('morgan');

const server =express();

server.use(express.json());
server.use(morgan("dev"));

//importo rutas
server.use("/recetasDB", require('./routes'));


//sino encuentra endpoint
server.use("*", (req, res) => {
    res.status(404).send("Endpoint not found");
});


//manejo de errores

module.exports = server;