const {Schema, model} = require('mongoose');

const RecetaSchema = Schema({
    title: {type: String, require: true, unique: true},
    image: {type: String},
    diets: { type:Array,},
    analyzedInstructions: { type:Array,}
});
module.exports = model("Receta", RecetaSchema);