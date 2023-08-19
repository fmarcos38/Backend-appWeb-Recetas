const nodemailer = require('nodemailer');
const { MAIL, PASS } = require('../config/dotenv');
//para desp de registrarse
const sendConfirmationEmail = async(user,token)=>{
//console.log("userSendMail:", user)
//console.log("tokenSendMail:", token)//llega bien
    //Crea el transportador con la configuración requerida para Outlook/gmail/etc
    var transport = nodemailer.createTransport({
        host: "smtp.office365.com",
        secureConnection: false,
        port: 587,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: "elvencoffe@hotmail.com",   
            pass: "franco140183"
            /* user: {MAIL},   
            pass: {PASS} */
        }
    });

    // actualizar el localhost al actual del front
    //Poner la variable para el deployment
    const urlConfirm=`https:/localhost:3000/home?token=${token}`;//es a donde te redirige al precionar el btn_confirmar_registro
    //cont del email
    var mailOptions = {
        from: '"Proyecto Recetas" <elvencoffe@hotmail.com>', // sender address (who sends)
        to: user.email, // al q se le manda
        subject: 'Hello ', // Subject line
        html:`
            <center>
            <h3>Gracias por registrarte!</h3>
            <br/>
            <p>Haz click en el siguiente link para confirmar tu cuenta: <a href="${urlConfirm}"> Confirmar</a></p>
            <img src=https://i.blogs.es/87930e/comidas-ricas/1366_2000.jpg width="250px" height="250px" />
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