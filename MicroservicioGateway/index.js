const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware }  = require('http-proxy-middleware');

const app = express();
app.use(morgan("dev"));

const PORT = 8000;
//rutas para c/microservicio

//recetas
app.use("/recetas", createProxyMiddleware({
    target: "http://localhost:8001/recetas",
    changeOrigin: true,
}));

//database
app.use("/dbrecetas", createProxyMiddleware({
    target: "http://localhost:8002/dbrecetas",
    changeOrigin: true,
}));


app.listen(PORT, () => {
    console.log("server Gateway listen on PORT:", PORT);
});