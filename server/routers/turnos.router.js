const express = require('express');
const turnosController = require('../controllers/turnos.controller');
const turnosRouter = express.Router();

turnosRouter.post('/registrar', turnosController.registrar);
turnosRouter.get('/buscarPendientes', turnosController.buscarPendientes);
turnosRouter.get('/buscarAsignados', turnosController.buscarAsignados);
turnosRouter.put('/asignar', turnosController.asignar);
turnosRouter.put('/actualizarEstado', turnosController.actualizarEstado);
turnosRouter.put('/devolverAPendientes', turnosController.devolverAPendientes);


module.exports = turnosRouter;