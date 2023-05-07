const Usuarios = require('../models/usuarios.model');

module.exports = {
    async validarIngreso(req, res) {
        try {
            const { tipoDocumento, numeroDocumento } = req.body;

            const usuarioEncontrado = await Usuarios.findOne({
                where: {
                    tipoDocumento: tipoDocumento,
                    numeroDocumento: numeroDocumento
                },
                attributes: [
                    "id",
                    "tipoDocumento",
                    "numeroDocumento",
                    "primerNombre",
                    "segundoNombre",
                    "primerApellido",
                    "segundoApellido"
                ]
            });

            if (!usuarioEncontrado) {
                return res.status(401).json({ error: 'Los datos de ingreso son inválidos.' });
            }
            else {
                return res.status(200).json(usuarioEncontrado);
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Ha ocurrido un error al intentar validar los datos de ingreso.' });
        }
    }
}