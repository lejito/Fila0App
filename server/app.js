"use strict";
// Cargar express y body-parser
var express = require("express");
var app = express();

// Cargar rutas
var appRouter = require("./routers/app.router");

// Configuración de middlewares
app.use(express.json()); // Convertir todo lo que llegue a un objeto json

// Configuración headers y CORS
app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // OJO: Solo para desarrollo, esto permite acceso a todos los orígenes
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

// Configurar rutas
app.use("/api", appRouter);  

module.exports = app;