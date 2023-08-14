//desde este arch tomo los datos YA sean desd una API o una DB
const axios = require('axios');
const { post } = require('../../../MicroservicioDB/src/database/shcemas/userSchema');

//exporto funciones
module.exports = {
    //funcion crear user
    createUser: async (data) => {
        try {            
            const resp = await axios.post("http://localhost:8002/dbrecetas/users", data);//desd acá le pego EN desarrollo a localhost Y una ves desarrollado el microserv de DB_user a ESTE.
            return resp.data;
        } catch (error) {
            console.log(error);
        }
    },

    //trae users DB -->desde postman --> http://localhost:8000/users
    listaUsers: async () => {
        try {
            let resp = await axios.get("http://localhost:8002/dbrecetas/users");
            
            return resp.data;
        } catch (error) {
            console.log(error);
        }
    },
    
    
    buscaPorMail: async (email) => {        
        try {
            let resp = await axios.get(`http://localhost:8002/dbrecetas/users/${email}`);
            
            return resp.data;
        } catch (error) {
            console.log(error);
        }
    },

    
    //elimina
    eliminaUser: async (_id) => {
        try { 
            const elimUser = await axios.delete(`http://localhost:8002/dbrecetas/users/${_id}`);

            return elimUser;
        } catch (error) {
            console.log(error);
        }        
    },

    /* favoritos */
    //agrega fav
    agregaFav: async(email, _id) =>{
        try {            
            const resp = await axios.post(`http://localhost:8002/dbrecetas/users/agregaFav/${email}`, {_id:_id});
            return resp.data;          
        } catch (error) {
            console.log(error);
        }
    },
    eliminaFav: async(email, _id) =>{
        try {
            const resp = await axios.post(`http://localhost:8002/dbrecetas/users/elimFav/${email}`, {_id:_id});
            return resp.data;
        } catch (error) {
            console.log(error);
        }
    },

    //me gusta
    meGusta: async(email, _id) => {
        try {
            const resp = await axios.post(`http://localhost:8002/dbrecetas/users/meGusta/${email}`, {_id:_id});
            return resp.data;
        } catch (error) {
            console.log(error);
        }
    },
}