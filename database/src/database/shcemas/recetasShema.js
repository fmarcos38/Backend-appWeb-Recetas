const {Schema} = require("mongoose");


const RecetaSchema = new Schema({
    title: {type: String, require: true, unique: true},
    summary: {type: String},
    image: {type: String},
    cloudinary_id: { type: String },
    diets: { type:Array,},
    healthScore: {type: Number},
    likes: {type: Number},
    createdInDb: {type: String},
    analyzedInstructions: { type:Array,}
});

//aquí mismo escribo los metodos del CRUD
//trae recetas de la base de datos - realizo a su vez el paginado y filtrado por dieta
RecetaSchema.statics.list = async function(desdeFront, palabraFront, dietaFront, hastaFront){ 

    try {
            const desde = Number(desdeFront) || 0; //desdeFront lo voy a ir calculando y enviando(por query) desde el front
            const hasta = Number(hastaFront) || 20;
            const registrosPorPagina = 20;            
            
            
            //funcion norlizo
            const normalizo = (recetasDB) => {
                let normalizo = recetasDB.map(r => {
                    return{
                        _id: r._id,
                        title: r.title,                
                        diets: r.diets.map((d) => {
                            return d ;
                        }),
                        healthScore: r.healthScore,
                        image: r.image,
                        likes: r.likes
                    }
                });
                return normalizo;
            };
            //funcion busco la palabra en el title
            const buscaPalabra = (normaliz) => {
                let arrRecetasFP = [];
                for(let m = 0; m < normaliz.length; m ++){
                    let result = normaliz[m].title.includes(palabraFront);
                    if(result){
                        arrRecetasFP.push(normaliz[m]);
                    }
                }
                return arrRecetasFP
            };
            //funcion filtro por dieta
            const filtroDieta = (arrRecetasFP) => {
                let r = [];
                for (let i = 0; i < arrRecetasFP.length; i++) {
                    for (let j = 0; j < arrRecetasFP[i].diets.length; j++) {
                        if(arrRecetasFP[i].diets[j].name === dietaFront){
                            r.push(arrRecetasFP[i]);
                        }                
                    }            
                }
                return r;
            };

            /* SI viene palabra y DIETA---------------------------------------------------------*/
            if(palabraFront && dietaFront){
                const recetasDB = await this.find();//le pego a la DB , me traigo todas
                //normalizo para no mandar toda la info de c/receta al front
                const normaliz = normalizo(recetasDB);

                //busco recetas con la palabra en el title
                let arrRecetasFP = buscaPalabra(normaliz);                
                
                /* filtro por dieta el array antes construido*/
                let porDieta = [] = filtroDieta(arrRecetasFP);                
                //corta de a 20 rectas
                const result = porDieta.slice(desde, hasta);

                return {
                    recetas: result,
                    page: {
                        desde,
                        registrosPorPagina,
                        hasta,
                        totalConsultaAct: porDieta.length
                    }
                };
                
            }
            /* SI SOLO viene  PALABRA-----------------------------------------------------------*/
            if(palabraFront){
                const recetasDB = await this.find();  
                //normalizo para no mandar toda la info de c/receta al front
                const normaliz = normalizo(recetasDB);

                //busco la palabra en el title
                let arrRecetasFP = buscaPalabra(normaliz);
                //corta de a 20 rectas
                const result = arrRecetasFP.slice(desde, hasta);

                return {
                    recetas: result,
                    page: {
                        desde,
                        registrosPorPagina,
                        hasta,
                        totalConsultaAct: arrRecetasFP.length
                    }
                };
                
            }
            /* SI SOLO viene DIETA -----------------------------------------------------------------*/
            if(dietaFront){
                const recetasDB = await this.find();            
                //normalizo para no mandar toda la info de c/receta al front
                const normaliz = normalizo(recetasDB);
                /* filtro por dieta */
                const recetasFiltradas = filtroDieta(normaliz);
                //corta de a 20 rectas
                const result = recetasFiltradas.slice(desde, hasta);
                
                return {
                    recetas: result,
                    page: {
                        desde,
                        registrosPorPagina,
                        hasta,
                        totalConsultaAct: recetasFiltradas.length
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
                const normaliz = normalizo(recetasDB);

                return {
                    recetas: normaliz,
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

//trae receta por _id
RecetaSchema.statics.listById = async function(_id){
    try {
        const resp = await this.findById(_id);
        return resp;
    } catch (error) {
        console.log(error);
    }
};

//crea recetas desde la api(me llega un array)
RecetaSchema.statics.insertRecetasApi = async function(recetas){
    try {        
        let arr = recetas;
        //console.log("arr: ", arr)
        for(let i=0; i<arr.length; i++){
            let resp = await this.create(arr[i]);
            await resp.save();
        }
        return {message: "Creadas con exito"};
    } catch (error) {
        
    }
};

//crea receta 
RecetaSchema.statics.createR = async function(receta){
    try{
        const resp = await this.create({
            title: receta.title,
            image: receta.image,
            cloudinary_id: receta.cloudinary_id,
            diets: receta.diets,
            analyzedInstructions: receta.analyzedInstructions
        });
        await resp.save();
        return resp;
    } catch (error) {
        console.log(error);
    }
};
//edita dieta
RecetaSchema.statics.editaR = async function(newReceta){
    try{ console.log("newR:", newReceta)
        //busco la receta
        const receta = await this.findById(newReceta._id); 

        const newR = {
            title: newReceta.title || receta.title,
            image: newReceta.image || receta.image,
            cloudinary_id: newReceta.cloudinary_id || receta.cloudinary_id,
            diets: newReceta.diets || receta.diets,
            analyzedInstructions: newReceta.analyzedInstructions || receta.analyzedInstructions
        };

        await this.findByIdAndUpdate({_id: newReceta._id}, newR);
        return newR;
    } catch (error) {
        console.log(error);
    }
};
//elimina
RecetaSchema.statics.delete = async function(_id){
    try {
        const elimReceta = await this.findByIdAndDelete({_id:_id});
        return elimReceta;
    } catch (error) {
        console.log(error);
    }    
};



module.exports = RecetaSchema;