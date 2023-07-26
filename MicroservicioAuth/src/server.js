const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');//para integrar .env


const server = express();

server.use(express.json());
server.use(morgan("dev"));
dotenv.config();


server.use('/auth', require('./routes'));
server.use("*", (req, res) => {
    res.status(404).send("endpoint no found");
});


module.exports = server;
