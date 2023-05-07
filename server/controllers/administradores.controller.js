const Administradores = require('../models/administradores.model');
const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = {
    async validarLogin(req, res) {
        try {
            const { tipoDocumento, numeroDocumento, clave } = req.body;

            const administradorEncontrado = await Administradores.findOne({
                where: {
                    tipoDocumento: tipoDocumento,
                    numeroDocumento: numeroDocumento,
                    clave: clave
                },
                attributes: [
                    "id",
                    "tipoDocumento",
                    "numeroDocumento"
                ]
            });

            if (!administradorEncontrado) {
                return res.status(401).json({ error: 'Los datos de inicio de sesión son inválidos.' });
            }
            else {
                const token = jwt.sign(administradorEncontrado.toJSON(), process.env.TOKEN_SECRET_KEY);
                return res.status(200).json({token});
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Error al intentar validar los datos de inicio de sesión.' });
        }
    }
}