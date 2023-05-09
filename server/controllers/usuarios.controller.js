const pool = require('../db');
const cambiarNotacion = require('./notacion-objeto');

module.exports = {
    async validarIngreso(req, res) {
        try {
            const { tipoDocumento, numeroDocumento } = req.body;

            const consulta = `
                SELECT id, tipo_documento, numero_documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido 
                FROM usuarios 
                WHERE tipo_documento = $1 AND numero_documento = $2
            `
            const resultado = await pool.query(
                consulta,
                [
                    tipoDocumento,
                    numeroDocumento
                ]
            );

            if (resultado.rowCount == 0) {
                return res.status(200).json({ error: 'Los datos de ingreso son inválidos.' });
            }
            else {
                const usuarioEncontrado = cambiarNotacion(resultado.rows[0]);
                return res.status(200).json(usuarioEncontrado);
            }
        } catch (error) {
            return res.status(500).json({ error: 'Ha ocurrido un error al intentar validar los datos de ingreso.' });
        }
    }
}