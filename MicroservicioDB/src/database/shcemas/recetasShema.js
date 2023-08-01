const {Schema} = require("mongoose");

const RecetaSchema = new Schema({
    title: {type: String, require: true, unique: true},
    image: {type: String},
    diets: { type:Array,},
    analyzedInstructions: { type:Array,}
});

//aquí mismo escribo los metodos del CRUD
//trae recetas de la base de datos - realizo a su vez el paginado
RecetaSchema.statics.list = async function(desdeFront){ 

    try {
        const desde = Number(desdeFront) || 0; //desdeFront lo voy a ir calculando y enviando(por query) desde el front
        const registrosPorPagina = 5;
        
        //de esta manera estoy pegandolé a la DB 2vcs por separado, podría generar retrasos
        //const recetas =  await this.find().skip(desde).limit(registrosPorPagina);
        //const totalRecetasDB = await this.countDocuments();
        
        //en cambio puedo utilizar la funcion Promise.all(), para lanzar las 2 al mismo tiempo
        //hago destructurin para almacenar el result de dichas promesas
        const [recetas, totalRecetasDB] = await Promise.all([
            this.find().skip(desde).limit(registrosPorPagina),
            this.countDocuments()
        ]);

        return {
            recetas,
            page: {
                desde,
                registrosPorPagina,
                totalRecetasDB
            }
        };
    } catch (error) {
        console.log(error);
    }
    
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

//filtraRecetas
RecetaSchema.statics.filtra = async function(filtro){
    //filtra SOLO x un tipo, NO combina.
    try {        
        const allR = await this.find();
        let resul = [];
        
        for (let i = 0; i < allR.length; i++) {
            for (let j = 0; j < allR[i].diets.length; j++) {
                if(allR[i].diets[j].name === filtro){
                    resul.push(allR[i]);
                }                
            }            
        }
        return resul;
    } catch (error) {
        
    }
}
module.exports = RecetaSchema;