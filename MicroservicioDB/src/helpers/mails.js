const nodemailer = require('nodemailer');

//para desp de registrarse
const sendConfirmationEmail = async(user,token)=>{
//console.log("userSendMail:", user)
//console.log("tokenSendMail:", token)//llega bien
    //Crea el transportador con la configuración requerida para Outlook/gmail/etc
    var transport = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: "proyecto_recetas40@hotmail.com",   
            pass: "140183Marcos"
        }
    });

    // actualizar el localhost al actual del front
    //Poner la variable para el deployment
    const urlConfirm=`https:/localhost:3000/home?token=${token}`;//es a donde te redirige al precionar el btn_confirmar_registro
    //cont del email
    var mailOptions = {
        from: '"Elven Coffee" <elvencoffe@hotmail.com>', // sender address (who sends)
        to: user.email, // al q se le manda
        subject: 'Hello ', // Subject line
        html:`
            <center>
            <h3>Gracias por registrarte!</h3>
            <p>Haz click en el siguiente link para confirmar tu cuenta:<a href="${urlConfirm}"> Confirm </a></p>
            <img src=https://res.cloudinary.com/dn24epw7c/image/upload/v1668088163/20221105_220258_msevf1.jpg width="250px" height="250px" />
            </center>
        `
    };

    // send mail with defined transport object    
    transport.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }

        return 'Message sent: ' + info.response;
    });
};

module.exports = {
    sendConfirmationEmail,

}