const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const server =express();
dotenv.config();

server.use(express.json());
server.use(morgan("dev"));

//--conexion mongoDB----------------------------------------------------------
/* mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("mongoDB is connected"))
.catch((err) => console.log(err)); */
//-----------------------------------------------------------------------
//importo rutas
server.use("/recetas", require('./routes'));


//sino encuentra endpoint
server.use("*", (req, res) => {
    res.status(404).send("Endpoint not found");
});


//manejo de errores

module.exports = server;