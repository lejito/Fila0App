const express = require('express');
const administradoresController = require('../controllers/administradores.controller');
const administradoresRouter = express.Router();

administradoresRouter.post('/validarLogin', administradoresController.validarLogin);

module.exports = administradoresRouter;