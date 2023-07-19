const express = require('express');
const morgan = require('morgan');
const server = express();

server.use(express.json());
server.use(morgan("dev"));

server.use('/dbrecetas', require('./routes'));

server.use("*", (req, res) => {
    res.status(404).send("endpoint Not found");
});

module.exports = server;