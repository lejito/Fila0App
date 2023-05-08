const pool = require('../db');
const cambiarNotacion = require('./notacion-objeto');

module.exports = {
    async validarLogin(req, res) {
        try {
            const { usuario, clave } = req.body;

            const consulta = `
                SELECT id
                FROM modulos 
                WHERE usuario = $1 AND clave = $2
            `
            const resultado = await pool.query(
                consulta,
                [
                    usuario,
                    clave
                ]
            );

            if (resultado.rowCount == 0) {
                return res.status(401).json({ error: 'Los datos de inicio de sesión son inválidos.' });
            }
            else {
                const moduloEncontrado = cambiarNotacion(resultado.rows[0]);
                return res.status(200).json(moduloEncontrado);
            }
        } catch (error) {
            return res.status(500).json({ error: 'Ha ocurrido un error al intentar validar los datos de inicio de sesión.' });
        }
    }
}