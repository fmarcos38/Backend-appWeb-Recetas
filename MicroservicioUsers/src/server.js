const express = require('express');
const morgan = require('morgan');

const server = express();

server.use(express.json());
server.use(morgan("dev"));

server.use('/users', require('./routes'));
server.use("*", (req, res) => {
    res.status(404).send("Endpoint not found");
});


module.exports = server;