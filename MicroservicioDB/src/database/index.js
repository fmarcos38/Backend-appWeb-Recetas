const mongoose = require("mongoose");
const { MONGO_URI } = require("../config/dotenv");

const conn = mongoose.createConnection(MONGO_URI); //conexión con la DB

//acá creo y exporto al mismo tiempo los modelos
module.exports = {
    recetas: conn.model("recetas", require('./shcemas/recetasShema'))
}