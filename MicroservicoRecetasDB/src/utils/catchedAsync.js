//este tipo de funciónes se llaman Func de Orden supremo -->porq mejoran a la func q reciben por param. 
//es una func q incorpora el manejo de errores y al producirse un error Async NO explota la app.
//fn es uno de los controladores (createCharacter, etc). 
module.exports = (fn) => {
    return function(req, res, next){
        fn(req, res).catch((err) => {
            next(err);
        });
    };
};