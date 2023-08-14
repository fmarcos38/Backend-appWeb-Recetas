const {Schema} = require("mongoose");

const RecetaSchema = new Schema({
    title: {type: String, require: true, unique: true},
    summary: {type: String},
    image: {type: String},
    diets: { type:Array,},
    healthScore: {type: Number},
    likes: {type: Number},
    createdInDb: {type: String},
    analyzedInstructions: { type:Array,}
});

//aquí mismo escribo los metodos del CRUD
//trae recetas de la base de datos - realizo a su vez el paginado y filtrado por dieta
RecetaSchema.statics.list = async function(desdeFront, palabraFront, dietaFront){ 

    try {
            const desde = Number(desdeFront) || 0; //desdeFront lo voy a ir calculando y enviando(por query) desde el front
            //para los registros SI viene filtro le agendo el indice
            let registrosPorPagina = 20;            
            //array para el filtrado por dieta
            let resul = [];
            
            /* SI viene palabra y DIETA---------------------------------------------------------*/
            if(palabraFront && dietaFront){
                const [recetasDB] = await Promise.all([
                    this.find(),
                    this.countDocuments()
                ]);
                //normalizo para no mandar toda la info de c/receta al front
                let normalizo = recetasDB.map(r => {
                    return{
                        id: r._id,
                        title: r.title,                
                        diets: r.diets.map((d) => {
                            return d ;
                        }),
                        healthScore: r.healthScore,
                        image: r.image,
                        likes: r.likes
                    }
                });

                //busco la palabra en el title
                let arrRecetasFP = [];
                for(let m = 0; m < normalizo.length; m ++){
                    let result = normalizo[m].title.includes(palabraFront);
                    if(result){
                        arrRecetasFP.push(normalizo[m]);
                    }
                }
                
                /* filtro por dieta */                
                for (let i = 0; i < arrRecetasFP.length; i++) {
                    for (let j = 0; j < arrRecetasFP[i].diets.length; j++) {
                        if(arrRecetasFP[i].diets[j].name === dietaFront){
                            resul.push(arrRecetasFP[i]);
                        }                
                    }            
                }
                return {
                    recetas: resul,
                    page: {
                        desde,
                        registrosPorPagina,
                        totalConsultaAct: resul.length
                    }
                };
                
            }
            /* SI SOLO viene  PALABRA-----------------------------------------------------------*/
            else if(palabraFront){
                const [recetasDB, totalRecetasDB] = await Promise.all([
                    this.find(),
                    this.countDocuments()
                ]);
                //normalizo para no mandar toda la info de c/receta al front
                let normalizo = recetasDB.map(r => {
                    return{
                        id: r._id,
                        title: r.title,                
                        diets: r.diets.map((d) => {
                            return d ;
                        }),
                        healthScore: r.healthScore,
                        image: r.image,
                        likes: r.likes
                    }
                });

                //busco la palabra en el title
                let arrRecetasFP = [];
                for(let m = 0; m < normalizo.length; m ++){
                    let result = normalizo[m].title.includes(palabra);
                    if(result){
                        arrRecetasFP.push(normalizo[m]);
                    }
                }
                return {
                    recetas: arrRecetasFP,
                    page: {
                        desde,
                        registrosPorPagina,
                        totalConsultaAct: arrRecetasFP.length
                    }
                };
                
            }
            /* SI SOLO viene DIETA -----------------------------------------------------------------*/
            else if(dietaFront){
                const [recetasDB] = await Promise.all([
                    this.find().skip(desde).limit(registrosPorPagina)
                ]);            
                //normalizo para no mandar toda la info de c/receta al front
                let normalizo = recetasDB.map(r => {
                    return{
                        id: r._id,
                        title: r.title,                
                        diets: r.diets.map((d) => {
                            return d ;
                        }),
                        healthScore: r.healthScore,
                        image: r.image,
                        likes: r.likes
                    }
                });
                /* filtro por dieta */
                for (let i = 0; i < normalizo.length; i++) {
                    for (let j = 0; j < normalizo[i].diets.length; j++) {
                        if(normalizo[i].diets[j].name === dietaFront){
                            resul.push(normalizo[i]);
                        }                
                    }            
                }
                return {
                    recetas: resul,
                    page: {
                        desde,
                        registrosPorPagina,
                        totalConsultaAct: resul.length
                    }
                };
            }
            /* si SOLO es Enviar las recetas paginadas SIN filtros ----------------------------*/
            else{
                const [recetasDB, totalRecetasDB] = await Promise.all([
                    this.find().skip(desde).limit(registrosPorPagina),
                    this.countDocuments()
                ]);
                //normalizo para no mandar toda la info de c/receta al front
                let normalizo = recetasDB.map(r => {
                    return{
                        id: r._id,
                        title: r.title,                
                        diets: r.diets.map((d) => {
                            return d ;
                        }),
                        healthScore: r.healthScore,
                        image: r.image,
                        likes: r.likes
                    }
                });
                return {
                    recetas: normalizo,
                    page: {
                        desde,
                        registrosPorPagina,
                        totalRecetasDB
                    }
                };
            }
        } catch (error) {
            console.log(error);
        }
    
};

//trae receta por id
RecetaSchema.statics.listById = async function(_id){
    try {
        const resp = await this.findById(_id);
        return resp;
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
        let arr = recetas;
        console.log("arr: ", arr)
        for(let i=0; i<arr.length; i++){
            let resp = await this.create(arr[i]);
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