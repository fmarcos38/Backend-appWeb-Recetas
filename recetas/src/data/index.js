//desde este arch tomo los datos Ya sean de una API o DB
const axios = require('axios');


module.exports = { 

    //trae recetas de la API y de la DB
    getAllRecetas: async(desde, palabra, dieta, hasta) => {
        try {
            let respDB = [];
            let allR = [];

            if(dieta && palabra){
                respDB =  await axios.get(`http://localhost:8002/dbrecetas/recetas?desde=${desde}&palabra=${palabra}&dieta=${dieta}&hasta=${hasta}`);
            }else if(palabra !== undefined){
                respDB =  await axios.get(`http://localhost:8002/dbrecetas/recetas?desde=${desde}&palabra=${palabra}&hasta=${hasta}`);
            }else if(dieta !== undefined){
                respDB =  await axios.get(`http://localhost:8002/dbrecetas/recetas?desde=${desde}&dieta=${dieta}&hasta=${hasta}`);
            }else{
                //obtengo todas las recetas de la DB sin filtro, SOLO PAGINADAS
                respDB =  await axios.get(`http://localhost:8002/dbrecetas/recetas?desde=${desde}`);//desp lo cambiaré por el microservicio Q le pega a la DB ya SEA localhost(desarrollo) o dbrecetas(producción)
            }

            allR = respDB.data; 
            return allR;
        } catch (error) {
            console.log(error)
        }        
    },
    
    //trae po ID
    getRecetaById: async(_id) => {
        try {
            const resp = await axios.get(`http://localhost:8002/dbrecetas/recetas/busca/${_id}`);
            return resp.data;
        } catch (error) {
            console.log(error);
        }
    },

    //creación de receta
    createReceta: async(data) => {//de acá le voy a pegar al microservicio de DB -> ejm: axios.get("http://dbstarwars:8004/characters");
        try {
            const resp = await axios.post("http://localhost:8002/dbrecetas/recetas/createR", data);//desd acá le pego EN desarrollo a localhost Y una ves desarrollado el microserv de DB_user a ESTE.
            return resp.data;
        } catch (error) {
            console.log(error);
        }       
    },

    //crea recetas tomadas desde la api, en la DB (de a 60)
    createRecetasDesdeApi: async() => {
        try {
            const recetasApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=fd77382035884170b784a242bd0b14d2&number=100&addRecipeInformation=true`);
        
            const normalizo = recetasApi.data.results.map(r => {
                return{
                    title: r.title,
                    diets: r.diets.map((d) => {
                        return { name: d };
                    }),
                    healthScore: r.healthScore || 0,
                    likes: 0,
                    image: r.image,
                    nutrition: r.nutrition.nutrients.map(n => {
                        return{
                            name: n.name,
                            amount: n.amount,
                            unit: n.unit,
                            porcentageDiarioReq: n.percentOfDailyNeeds
                        }
                    }),
                    analyzedInstructions: r.analyzedInstructions[0]?.steps.map((paso) => {
                        return {
                            number: paso.number,
                            step: paso.step,
                            ingredients: paso.ingredients.map(i => {
                                return {
                                    name: i.name,
                                }
                            })
                        };
                    }),
                }
            }); 
            
            const resp = await axios.post("http://localhost:8002/dbrecetas/recetas/creaDesdeApi", normalizo);
            //console.log("resp.data: ", resp)
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
            const elimReceta = await axios.delete(`http://localhost:8002/dbrecetas/recetas/elimR/${_id}`);

            return elimReceta;
        } catch (error) {
            console.log(error);
        }        
    },

}  