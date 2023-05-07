// Configuración de router
var express = require("express");
var appRouter = express.Router();

// Importar rutas
const usuariosRouter = require('./usuarios.router');
const administradoresRouter = require('./administradores.router');
const turnosRouter = require('./turnos.router');

// Usar rutas
appRouter.use('/usuarios', usuariosRouter);
appRouter.use('/administradores', administradoresRouter);
appRouter.use('/turnos', turnosRouter);

module.exports = appRouter;