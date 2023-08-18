const axios = require('axios');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');


module.exports = {
    validaCuenta: async (token) => {
        try {
            let email;

            //verif token y obtengo el email del user
            const respJWT = jwt.verify(token, process.env.JWT_SEC);
            //respJWT: { email: 'fmarcos_23@hotmail.com', iat: 1668080662 }
            email = respJWT.email; 

            //actualizo propiedad verificado en la base de datos para dicho user
            //console.log("idU:", _id);
            const user = await axios.get(`http://localhost:8002/dbrecetas/users/${email}`);//buscar user por email
            if(!user){ return ({msg: "user not found"})}
            user.verified = true;
            await user.save();

            return user;
        } catch (error) {
            
        }
    },

    //login clasico
    login: async (data) => {
        
        try {
            //busco user
            let user = await axios.get(`http://localhost:8002/dbrecetas/users/${data.email}`);
            user = user.data;
            
            if(!user.name){
                return {message: "user not found"};
            }else{
                //si exist, desencripto pass q viene de la DB
                const hashedPassword = CryptoJS.AES.decrypt( user.password, process.env.PASS_SEC );
                //paso a string la pass antes desncrip
                const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
                //comparo la q viene de la DB con la del front
                //console.log("pass:", hashedPassword)
                if(OriginalPassword !== data.password){
                    return res.status(401).json({message:"Contraseña incorrecta!"});
                }
    
                //si el user es correcto CREO el JWT, para mayor seguridad de mi aplicacion, q se asocia con el email del user
                const token = jwt.sign({ email: user.email }, process.env.JWT_SEC);
                
                const newObj = {user, token}; 
                
                return newObj;
            }
        } catch (error) {
            console.log(error);
        }
    },

    //login Google
    loginGoogle: async (data) => {
        try {
            const {email, name} = data;

            //busco user por email
            const user = await axios.get(`http://localhost:8002/dbrecetas/users/${email}`);

            //si no exist el user LO creo
            if(!user){
                const data = {
                    email, 
                    password: "creado con google",
                    name, 
                };

                newUser = new Users(data);
                await newUser.save();
            }

            //si es user bloqueado
            if(user.bloqueado == true){
                res.json({msg: "user bloqueado"});
            }

            //CREO el JWT, para mayor seguridad de mi aplicacion, q se asocia con el email del user
            const token = jwt.sign({ email: user.email }, process.env.JWT_SEC);
        //console.log("userData: ", user);
        //console.log("userToken: ", token);
            return {user, token}
        } catch (error) {
            console.log(error);
        }

    }
};