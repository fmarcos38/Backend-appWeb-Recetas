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
RecetaSchema.statics.list = async function(desdeFront, palabraFront, dietaFront, hastaFront){ 
    console.log("desde",desdeFront);
            console.log("palabra",palabraFront);
            console.log("dieta",dietaFront);
            console.log("hasta",hastaFront);

    try {
            const desde = Number(desdeFront) || 0; //desdeFront lo voy a ir calculando y enviando(por query) desde el front
            //para los registros SI viene filtro le agendo el indice
            let registrosPorPagina = 20;            
            //array para el filtrado por dieta
            
            
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
                let resul = [] = filtroDieta(arrRecetasFP);                
                
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
            if(palabraFront){
                const [recetasDB ] = await Promise.all([
                    this.find(),
                    this.countDocuments()
                ]);
                //normalizo para no mandar toda la info de c/receta al front
                const normaliz = normalizo(recetasDB);

                //busco la palabra en el title
                let arrRecetasFP = buscaPalabra(normaliz);

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
            if(dietaFront){
                const recetasDB = await this.find();            
                //normalizo para no mandar toda la info de c/receta al front
                const normaliz = normalizo(recetasDB);
                /* filtro por dieta */
                const recetasFiltradas = filtroDieta(normaliz);
                /* fracciono el array result de a 20*/
                const result = recetasFiltradas.slice(desdeFront, hastaFront);//corregir con for tal vez 
                
                return {
                    recetas: result,
                    page: {
                        desde,
                        registrosPorPagina,
                        totalConsultaAct: result.length
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