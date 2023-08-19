const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { createProxyMiddleware }  = require('http-proxy-middleware');

const app = express();
app.use(morgan("dev"));
app.use(cors());

//rutas para c/microservicio


//recetas
app.use("/recetas", createProxyMiddleware({
    target: "http://recetas:8001",     // target: "http://localhost:8001", o este -> target: "http://recetas:8001",
    changeOrigin: true,
}));

//database
app.use("/dbrecetas", createProxyMiddleware({
    target: "http://database:8002",
    changeOrigin: true,
}));

//users
app.use("/users", createProxyMiddleware({
    target: "http://users:8003",     // target: "http://localhost:8001", o este -> target: "http://recetas:8001",
    changeOrigin: true,
}));

//auth
app.use("/auth", createProxyMiddleware({
    target: "http://auth:8004",
    changeOrigin: true,
}));

app.listen(8000, () => {
    console.log("server Gateway listen on PORT:", 8000);
});