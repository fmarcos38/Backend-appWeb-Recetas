require("dotenv").config();

module.exports={
    MONGO_URI:process.env.MONGO_URI,
    PASS_SEC:process.env.PASS_SEC,
    JWT_SEC:process.env.JWT_SEC,
    MAIL:process.env.MAIL,
    PASS:process.env.PASS
}