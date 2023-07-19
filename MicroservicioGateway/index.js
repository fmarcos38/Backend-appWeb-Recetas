const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware }  = require('http-proxy-middleware');

const app = express();
app.use(morgan("dev"));


//rutas para c/microservicio

//recetas
app.use("/recetas", createProxyMiddleware({
    target: "http://recetas:8001",     /* target: "http://localhost:8001", */
    changeOrigin: true,
}));

//database
app.use("/dbrecetas", createProxyMiddleware({
    target: "http://dbrecetas:8002",
    changeOrigin: true,
}));


app.listen(8000, () => {
    console.log("server Gateway listen on PORT:", 8000);
});