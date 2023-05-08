const express = require('express');
const modulosController = require('../controllers/modulos.controller');
const modulosRouter = express.Router();

modulosRouter.post('/validarLogin', modulosController.validarLogin);

module.exports = modulosRouter;