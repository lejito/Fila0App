// Configuración de router
var express = require("express");
var appRouter = express.Router();

// Importar rutas
const usuariosRouter = require('./usuarios.router');
const modulosRouter = require('./modulos.router');
const turnosRouter = require('./turnos.router');

// Usar rutas
appRouter.use('/usuarios', usuariosRouter);
appRouter.use('/modulos', modulosRouter);
appRouter.use('/turnos', turnosRouter);

module.exports = appRouter;