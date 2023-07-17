module.exports = (req, res, next) => {
    const { model } = req.params;

    if(["recetas"].includes(model)){
        return next();
    }else{
        throw Error("El model no existe !!");
    }
}