//desde este arch tomo los datos YA sean desd una API o una DB
const axios = require('axios');

//exporto funciones
module.exports = {
    //funcion crear user
    createUser: async (data) => {
        try {
            //console.log("dataFrontMicroUser: ", data);
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
    eliminaReceta: async(req) => {
        try {
            const { _id } = req.params; //console.log("_id: ", _id);
            const elimUser = await axios.delete(`http://localhost:8002/dbrecetas/users${_id}`);

            return elimUser;
        } catch (error) {
            console.log(error);
        }        
    }
}