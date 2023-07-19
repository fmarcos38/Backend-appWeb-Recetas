//desde este arch tomo los datos Ya sean de una API o DB
const axios = require('axios');


module.exports = { 
    //obtengo todas las recetas de la DB 
    gatRecetasDB: async () => {
        try {            
            const respDB =  await axios.get("http://dbrecetas:8002/dbrecetas/recetas");// "http://localhost:8002/dbrecetas/recetas/" --> desp lo cambiaré por el microservicio Q le pega a la DB --> "http://dbrecetas:8002/dbrecetas/recetas"
            return respDB.data;
        } catch (error) {
            console.log(error);
        }        
    },
//obtengo todas las recetas desde la API
    getRecetasAPI: async() => {
        try {
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
        } catch (error) {
            console.log(error);
        }
        
    }, 

    //trae recetas de la API y de la DB
    getAllRecetas: async() => {
        let allR = [];

        //obtengo todas las recetas de la DB
        const respDB =  await axios.get("http://dbrecetas:8002/dbrecetas/recetas/");//desp lo cambiaré por el microservicio Q le pega a la DB

        //obt todas las recetas de la API
        //const respAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=fd77382035884170b784a242bd0b14d2&number=10&addRecipeInformation=true`);

        /* const normalizo = respAPI.data.results.map(r => {
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
        }); */        

        allR = respDB.data;
        //allR = [...allR, normalizo];

        return allR;
    },

    //creación de receta
    createReceta: async(data) => {//de acá le voy a pegar al microservicio de DB -> ejm: axios.get("http://dbstarwars:8004/characters");
        try {            
            const newReceta = await axios.post("http://dbrecetas:8002/dbrecetas/recetas", data);
        
            return newReceta.data;
        } catch (error) {
            console.log(error);
        }        
    },

    //editar
    editaReceta: async(_id, title) => {
        try { 
            const resp = await axios.post(`http://dbrecetas:8002/dbrecetas/recetas/${_id}`, title);            
            return resp.data;
            
        } catch (error) {
            console.log(error);
        }
        

    },

    //eliminar
    eliminaReceta: async(req) => {
        try {
            const { _id } = req.params; //console.log("_id: ", _id);
            const elimReceta = await axios.delete(`http://dbrecetas:8002/dbrecetas/recetas${_id}`);

            return elimReceta;
        } catch (error) {
            console.log(error);
        }        
    }
}  