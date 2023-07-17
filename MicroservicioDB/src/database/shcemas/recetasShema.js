const {Schema} = require("mongoose");

const RecetaSchema = new Schema({
    title: {type: String, require: true, unique: true},
    image: {type: String},
    diets: { type:Array,},
    analyzedInstructions: { type:Array,}
});

//aquí mismo escribo los metodos de CRUD
RecetaSchema.statics.list = async function(){
    return await this.find();
};

//crea receta
RecetaSchema.statics.insert = async function(receta){
    try{
    console.log("dataInsert: ", receta);
    const resp = await this.create({
        title: receta.title,
        image: receta.image,
        diets: receta.diets,
        analyzedInstructions: receta.analyzedInstructions
    });
    await resp.save();
    return resp;
} catch (error) {
    console.log(error);
}
}

//edita
RecetaSchema.statics.edita = async function(_id, title){
    const resp = await this.findById({_id: _id});
    resp.title = title;
    resp.save();
    return resp;
};

//elimina
RecetaSchema.statics.elimina = async function(_id){
    const elimReceta = await this.findByIdAndDelete(_id);
    return elimReceta;
};


module.exports = RecetaSchema;