//desde este arch tomo los datos Ya sean de una API o DB
const axios = require('axios');
const dataTemp = require('./data.json');

module.exports = {
    getRecetasDB: async () => {
        const resp = await dataTemp;//momentaneamnt me traigo la data desde Carpeta-->Data
        return resp;
    },

    //creación de receta
    createReceta: async(/* data */) => {//de acá le voy a pegar al microservicio de DB -> ejm: axios.get("http://dbstarwars:8004/characters");
        throw Error("logica sin construir");
    },

    //editar

    //eliminar
}