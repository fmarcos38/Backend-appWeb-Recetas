const {Schema} = require("mongoose");

const RecetaSchema = new Schema({
    _id: String,
    title: {type: String, require: true, unique: true},
    image: {type: String},
    diets: { type:Array,},
    analyzedInstructions: { type:Array,}
});

//aquí mismo escribo los metodos de CRUD
RecetaSchema.statics.list = async function(){
    return await this.find();
};

module.exports = RecetaSchema;