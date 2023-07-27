const { Schema } = require('mongoose');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const {sendConfirmationEmail} = require('../../helpers/mails');


const Userschema = new Schema({
    name: {type: String, require: true,},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    role: { type: String, default: 'cliente', },/* el otro rol es -->admin */
    favorites:{ type:Array, default:[] },
    verified:{ type:Boolean, default:false },
    bloqueado:{ type:Boolean, default:false }
});

//aquí mismo escribo los metodos del CRUD
//crea user en la base de datos
Userschema.statics.insert = async function(data){
    //console.log("dataFSchemaUser: ", data);

    try {
        //busco si ya exist ese email
        const buscaMail = await this.findOne({email: data.email});
        if(buscaMail){ res.status(409).send("YA existe usuario con ese email")}
        else{
            //SINO existe
            //cifro pass
            passwordEncript = CryptoJS.AES.encrypt( data.password, process.env.PASS_SEC ).toString();

            //creo user
            const newUser = await this.create({name: data.name, email: data.email, password: passwordEncript});
            await newUser.save();
            //si el user es correcto CREO el JWT, para mayor seguridad de mi aplicacion, q se asocia con el email del user
            const token = jwt.sign({ email: data.email }, process.env.JWT_SEC);

            //mando mail de confirm
            sendConfirmationEmail(newUser,token);

            return{
                newUser,
                token
            };
        }
    } catch (error) {
        console.log(error);
    }
};

//lista users
Userschema.statics.list = async function(){

    return await this.find();

}

//trae users desd la DB
Userschema.statics.buscaPorMail = async function(email){    
    
    const resp = await this.findOne({email: email})
    return resp;

};

//elimna
Userschema.statics.delete = async function (_id){
    try { 
        const resp = await this.findByIdAndDelete(_id);
        return resp;
    } catch (error) {
        console.log(error);
    } 
};


module.exports = Userschema;