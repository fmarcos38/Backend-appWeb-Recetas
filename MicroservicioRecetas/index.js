const server = require('./src/server');


const PORT = 8001;


server.listen(PORT, () => {
    console.log(`server recetasDB levantado en el puerto: ${PORT}`);
});