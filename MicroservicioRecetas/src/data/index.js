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
            const respAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=fd77382035884170b784a242bd0b14d2&number=20&addRecipeInformation=true`);
        
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
    getAllRecetas: async(desde) => {
        let allR = [];
        //obtengo todas las recetas de la DB
        const respDB =  await axios.get(`http://localhost:8002/dbrecetas/recetas?desde=${desde}`);//desp lo cambiaré por el microservicio Q le pega a la DB ya SEA localhost(desarrollo) o dbrecetas(producción)

        //obt todas las recetas de la API
        //const respAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=fd77382035884170b784a242bd0b14d2&number=10&addRecipeInformation=true`);

        /* let normalizo = respAPI.data.results.map(r => {
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

        /* allR = respDB.data;
        if(normalizo[0]){ return allR = allR.concat(normalizo); }        
        else{ return allR; } */

        allR = respDB.data;
        return allR;
    },

    //creación de receta
    createReceta: async(data) => {//de acá le voy a pegar al microservicio de DB -> ejm: axios.get("http://dbstarwars:8004/characters");
        try {            
            const resp = await axios.post("http://localhost:8002/dbrecetas/recetas", data);//desd acá le pego EN desarrollo a localhost Y una ves desarrollado el microserv de DB_user a ESTE.
            return resp.data;
        } catch (error) {
            console.log(error);
        }       
    },

    //crea recetas tomadas desde la api, en la DB 
    createRecetasDesdeApi: async() => {
        try {
            const recetasApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=fd77382035884170b784a242bd0b14d2&number=60&addRecipeInformation=true`);
        
            const normalizo = recetasApi.data.results.map(r => {
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
            const resp = await axios.post("http://localhost:8002/dbrecetas/recetas/creaDesdeApi", normalizo);
            return resp.data;
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
    },

    //filtra recetas
    filtraRecetas: async(desde, dieta) => {
        try {
            console.log("dieta", dieta)
            const resp = await axios.post(`http://localhost:8002/dbrecetas/recetas/filtro?desde=${desde}`, dieta);            
            return resp.data;
        } catch (error) {
            console.log(error);
        }
    },
}  