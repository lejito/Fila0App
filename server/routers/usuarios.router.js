const express = require('express');
const usuariosController = require('../controllers/usuarios.controller');
const usuariosRouter = express.Router();

usuariosRouter.post('/validarIngreso', usuariosController.validarIngreso);

module.exports = usuariosRouter;