const pool = require('../db');
const cambiarNotacion = require('./notacion-objeto');

module.exports = {
    async registrar(req, res) {
        try {
            const { usuario, categoria } = req.body;

            const consulta = `
                INSERT 
                INTO turnos(usuario, categoria) 
                VALUES ($1, $2)
                RETURNING id, codigo, estado, fecha
            `
            const resultado = await pool.query(
                consulta,
                [
                    usuario,
                    categoria
                ]
            );

            const nuevoTurno = cambiarNotacion(resultado.rows[0]);

            return res.status(200).json(nuevoTurno);
        } catch (error) {
            return res.status(500).json({ error: 'Ha ocurrido un error al intentar registrar el turno.' });
        }
    },

    async buscarPendientes(req, res) {
        try {
            const consulta = `
                SELECT turnos.id, turnos.codigo, usuarios.tipo_documento, usuarios.numero_documento, usuarios.primer_nombre, usuarios.segundo_nombre, usuarios.primer_apellido, usuarios.segundo_apellido 
                FROM turnos
                INNER JOIN usuarios ON usuarios.id = turnos.usuario
                WHERE turnos.estado = 'Pendiente'
                ORDER BY turnos.id ASC
                LIMIT 30
            `
            const resultado = await pool.query(
                consulta
            );

            const turnosPendientes = cambiarNotacion(resultado.rows);

            return res.status(200).json(turnosPendientes);
        } catch (error) {
            return res.status(500).json({ error: 'Ha ocurrido un error al intentar buscar los últimos turnos pendientes.' });
        }
    },

    async buscarAsignados(req, res) {
        try {
            const consulta = `
                SELECT turnos.id, turnos.codigo, turnos.modulo, turnos.fecha_asignado, usuarios.tipo_documento, usuarios.numero_documento, usuarios.primer_nombre, usuarios.segundo_nombre, usuarios.primer_apellido, usuarios.segundo_apellido 
                FROM turnos
                INNER JOIN usuarios ON usuarios.id = turnos.usuario
                WHERE turnos.estado = 'Asignado'
                ORDER BY turnos.fecha_asignado DESC
                LIMIT 10
            `
            const resultado = await pool.query(
                consulta
            );

            const turnosAsignados = cambiarNotacion(resultado.rows);

            return res.status(200).json(turnosAsignados);
        } catch (error) {
            return res.status(500).json({ error: 'Ha ocurrido un error al intentar buscar los últimos turnos asignados.' });
        }
    },

    async asignar(req, res) {
        try {
            const { modulo, categoria } = req.body;

            let consulta = `
                UPDATE turnos 
                SET estado = 'Asignado', modulo = $1, fecha_asignado = CURRENT_TIMESTAMP
                WHERE id = (
                    SELECT MIN(id)
                    FROM turnos
                    WHERE estado = 'Pendiente' AND categoria = $2
                )
                RETURNING id
            `
            let resultado = await pool.query(
                consulta,
                [
                    modulo,
                    categoria
                ]
            );

            if (categoria == "N/A") {
                consulta = `
                    UPDATE turnos 
                    SET estado = 'Asignado', modulo = $1, fecha_asignado = CURRENT_TIMESTAMP
                    WHERE id = (
                        SELECT MIN(id)
                        FROM turnos
                        WHERE estado = 'Pendiente'
                    )
                    RETURNING id
                `

                resultado = await pool.query(
                    consulta,
                    [
                        modulo
                    ]
                );
            }

            if (resultado.rowCount == 0) {
                return res.status(200).json({ error: 'No se encontró ningun turno para asignar.' });
            }

            try {
                const idTurnoAsignado = resultado.rows[0].id;

                const consulta2 = `
                    SELECT turnos.id, turnos.codigo, turnos.modulo, turnos.fecha_asignado, usuarios.tipo_documento, usuarios.numero_documento, usuarios.primer_nombre, usuarios.segundo_nombre, usuarios.primer_apellido, usuarios.segundo_apellido 
                    FROM turnos
                    INNER JOIN usuarios ON usuarios.id = turnos.usuario
                    WHERE turnos.id = $1
                `
                const resultado2 = await pool.query(
                    consulta2,
                    [
                        idTurnoAsignado
                    ]
                );

                const turnoAsignado = cambiarNotacion(resultado2.rows[0]);

                return res.status(200).json(turnoAsignado);
            } catch (error) {
                return res.status(500).json({ error: 'Ha ocurrido un error al intentar buscar los datos del turno asignado.' });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Ha ocurrido un error al intentar asignar un turno.' });
        }
    },

    async actualizarEstado(req, res) {
        // Esta función solo aplica para actualizar el turno a "En curso", "Completado" o "Cancelado"

        try {
            const { id, modulo, estado } = req.body;
            const consulta = `
                UPDATE turnos 
                SET estado = $1, modulo = $2
                WHERE id = $3
                RETURNING id
            `
            const resultado = await pool.query(
                consulta,
                [
                    estado,
                    modulo,
                    id
                ]
            );

            const turnoActualizado = cambiarNotacion(resultado.rows);

            return res.status(200).json(turnoActualizado);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Ha ocurrido un error al intentar actualizar el estado del turno.' });
        }
    },

    async devolverAPendientes(req, res) {
        try {
            const { id } = req.body;

            const consulta = `
                UPDATE turnos 
                SET estado = 'Pendiente', modulo = NULL
                WHERE id = $1
                RETURNING id
            `
            const resultado = await pool.query(
                consulta,
                [
                    id
                ]
            );

            const turnoActualizado = cambiarNotacion(resultado.rows);

            return res.status(200).json(turnoActualizado);
        } catch (error) {
            return res.status(500).json({ error: 'Ha ocurrido un error al intentar devolver el turno a los turnos pendientes.' });
        }
    }
}