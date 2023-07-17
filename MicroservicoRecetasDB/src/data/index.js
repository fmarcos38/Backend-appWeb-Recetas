//desde este arch tomo los datos Ya sean de una API o DB
const axios = require('axios');
const recetasDB = require('../models/receta.js');


module.exports = {  
    gatRecetasDB: async () => {
        //obtengo todas las recetas de la DB
        const respDB =  await recetasDB.find();//desp lo cambiaré por el microservicio Q le pega a la DB
        
        return respDB;
    },

    getRecetasAPI: async() => {
        //obt todas las recetas de la API
        const respAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=fd77382035884170b784a242bd0b14d2&number=10&addRecipeInformation=true`);
        
        const normalizo = respAPI.data.results.map(r => {
            return{
                id: r.id,
                title: r.title,
                summary: r.summary.replace(/<[^>]+>/g, ""),
                diets: r.diets.map((d) => {
                            return { name: d };
                        }),
                healthScore: r.healthScore,
                image: r.image,
                createdInDb: false,
                stepByStep: r.analyzedInstructions[0]?.steps.map((paso) => {
                                return `${paso.number}- ${paso.step}`;
                            })
            }
        }); 

        return normalizo;
    },

    getAllRecetas: async() => {
        let allR = [];

        //obtengo todas las recetas de la DB
        const respDB =  await recetasDB.find();//desp lo cambiaré por el microservicio Q le pega a la DB

        //obt todas las recetas de la API
        const respAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=fd77382035884170b784a242bd0b14d2&number=10&addRecipeInformation=true`);
        
        const normalizo = respAPI.data.results.map(r => {
            return{
                id: r.id,
                title: r.title,
                summary: r.summary.replace(/<[^>]+>/g, ""),
                diets: r.diets.map((d) => {
                            return { name: d };
                        }),
                healthScore: r.healthScore,
                image: r.image,
                createdInDb: false,
                stepByStep: r.analyzedInstructions[0]?.steps.map((paso) => {
                                return `${paso.number}- ${paso.step}`;
                            })
            }
        });        

        allR = respDB;
        allR = [...allR, normalizo];

        return allR;
    },


    //creación de receta
    createReceta: async( ) => {//de acá le voy a pegar al microservicio de DB -> ejm: axios.get("http://dbstarwars:8004/characters");
        
        
        throw Error("logica sin construir");
    },

    //editar
    editaReceta: async(req) => {
        try {
            const { _id } = req.params; 
            const { title } = req.body;
        
            const buscaReceta = await recetasDB.findById({_id: _id});            
    
            if(title){
                buscaReceta.title = title
                buscaReceta.save();
                return buscaReceta;
            }
            
        } catch (error) {
            console.log(error);
        }
        

    },

    //eliminar
    eliminaReceta: async(req) => {
        try {
            const { _id } = req.params; console.log("_id: ", _id);
            const buscaReceta = await recetasDB.findByIdAndDelete(_id)

            return buscaReceta;
        } catch (error) {
            console.log(error);
        }        
    }
}  