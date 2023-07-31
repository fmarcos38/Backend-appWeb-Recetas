const {Schema} = require("mongoose");

const RecetaSchema = new Schema({
    title: {type: String, require: true, unique: true},
    image: {type: String},
    diets: { type:Array,},
    analyzedInstructions: { type:Array,}
});

//aquí mismo escribo los metodos del CRUD
//trae recetas de la base de datos
RecetaSchema.statics.list = async function(){
    let rec =  await this.find();
    return rec;
};


//crea receta , tambien en ves de crear de a una podria corroborar si lo q me llega COMO parametro es un array Y crear de una sola ves todas las del array
RecetaSchema.statics.insert = async function(receta){
    try{
        //console.log("dataInsert: ", receta);
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
};
//crea recetas desde la api(me llega un array)
RecetaSchema.statics.insertRecetasApi = async function(recetas){
    try {
        for(let i=0; i<recetas.length; i++){
            let resp = await this.create(recetas[i]);
            await resp.save();
        }
        return {message: "Creadas con exito"};
    } catch (error) {
        
    }
};


//edita
RecetaSchema.statics.edit = async function(_id, title){
    try {
        const resp = await this.findById({_id: _id});
        resp.title = title;
        resp.save();
        return resp;
    } catch (error) {
        console.log(error);
    }    
};

//elimina
RecetaSchema.statics.delete = async function(_id){
    try {
        const elimReceta = await this.findByIdAndDelete(_id);
        return elimReceta;
    } catch (error) {
        console.log(error);
    }    
};


module.exports = RecetaSchema;