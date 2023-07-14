const axios = require('axios');

module.exports = {
    //le pego a la api
    listaRecetasApi: async () => {
        const resp = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=fd77382035884170b784a242bd0b14d2&number=10&addRecipeInformation=true`);
        //console.log("resp: ", resp.data);
        const normalizo = resp.data.results.map(r => {
            return{
                id: r.id,
                name: r.name,
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
        console.log("normalizo: ", normalizo);
        return normalizo;
    },
}