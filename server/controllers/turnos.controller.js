const pool = require('../db');
const cambiarNotacion = require('./notacion-objeto');

module.exports = {
    async registrar(req, res) {
        const { usuario, categoria } = req.body;
        const consulta = `
            INSERT 
            INTO turnos(usuario, categoria) 
            VALUES ($1, $2)
            RETURNING id, codigo, estado, fecha
        `
        pool.query(consulta, [usuario, categoria])
            .then(resultado => {
                if (resultado.rowCount == 0) {
                    return res.status(200).json({ warning: 'No se encontró el turno registrado.' });
                } else {
                    const nuevoTurno = cambiarNotacion(resultado.rows[0]);
                    return res.status(200).json(nuevoTurno);
                }
            })
            .catch(error => {
                return res.status(500).json({ error: 'Ha ocurrido un error al intentar registrar el turno.' });
            })
    },

    async buscarPendientes(req, res) {
        const consulta = `
            SELECT turnos.id, turnos.codigo, turnos.fecha, usuarios.tipo_documento, usuarios.numero_documento, usuarios.primer_nombre, usuarios.segundo_nombre, usuarios.primer_apellido, usuarios.segundo_apellido 
            FROM turnos
            INNER JOIN usuarios ON usuarios.id = turnos.usuario
            WHERE turnos.estado = 'Pendiente'
            ORDER BY turnos.id ASC
            LIMIT 30
        `
        pool.query(consulta)
            .then(resultado => {
                if (resultado.rowCount == 0) {
                    return res.status(200).json({ warning: 'No se encontraron turnos pendientes.' });
                } else {
                    const turnosPendientes = cambiarNotacion(resultado.rows);
                    return res.status(200).json(turnosPendientes);
                }
            })
            .catch(error => {
                return res.status(500).json({ error: 'Ha ocurrido un error al intentar buscar los últimos turnos pendientes.' });
            })
    },

    async buscarAsignados(req, res) {
        const consulta = `
            SELECT turnos.id, turnos.codigo, turnos.modulo, turnos.fecha_asignado, usuarios.tipo_documento, usuarios.numero_documento, usuarios.primer_nombre, usuarios.segundo_nombre, usuarios.primer_apellido, usuarios.segundo_apellido 
            FROM turnos
            INNER JOIN usuarios ON usuarios.id = turnos.usuario
            WHERE turnos.estado = 'Asignado'
            ORDER BY turnos.fecha_asignado DESC
            LIMIT 8
        `
        pool.query(consulta)
            .then(resultado => {
                if (resultado.rowCount == 0) {
                    return res.status(200).json({ warning: 'No se encontraron turnos asignados.' });
                } else {
                    const turnosAsignados = cambiarNotacion(resultado.rows);
                    return res.status(200).json(turnosAsignados);
                }
            })
            .catch(error => {
                return res.status(500).json({ error: 'Ha ocurrido un error al intentar buscar los últimos turnos asignados.' });
            })
    },

    async buscarCompletados(req, res) {
        const consulta = `
            SELECT turnos.id, turnos.codigo, turnos.modulo, turnos.fecha_cambio, usuarios.tipo_documento, usuarios.numero_documento, usuarios.primer_nombre, usuarios.segundo_nombre, usuarios.primer_apellido, usuarios.segundo_apellido 
            FROM turnos
            INNER JOIN usuarios ON usuarios.id = turnos.usuario
            WHERE turnos.estado = 'Completado'
            ORDER BY turnos.fecha_cambio DESC
            LIMIT 32
        `
        pool.query(consulta)
            .then(resultado => {
                if (resultado.rowCount == 0) {
                    return res.status(200).json({ warning: 'No se encontraron turnos completados.' });
                } else {
                    const turnosCompletados = cambiarNotacion(resultado.rows);
                    return res.status(200).json(turnosCompletados);
                }
            })
            .catch(error => {
                return res.status(500).json({ error: 'Ha ocurrido un error al intentar buscar los últimos turnos completados.' });
            })
    },

    async buscarCancelados(req, res) {
        const consulta = `
            SELECT turnos.id, turnos.codigo, turnos.modulo, turnos.fecha_cambio, usuarios.tipo_documento, usuarios.numero_documento, usuarios.primer_nombre, usuarios.segundo_nombre, usuarios.primer_apellido, usuarios.segundo_apellido 
            FROM turnos
            INNER JOIN usuarios ON usuarios.id = turnos.usuario
            WHERE turnos.estado = 'Cancelado'
            ORDER BY turnos.fecha_cambio DESC
            LIMIT 32
        `
        pool.query(consulta)
            .then(resultado => {
                if (resultado.rowCount == 0) {
                    return res.status(200).json({ warning: 'No se encontraron turnos cancelados.' });
                } else {
                    const turnosCancelados = cambiarNotacion(resultado.rows);
                    return res.status(200).json(turnosCancelados);
                }
            })
            .catch(error => {
                return res.status(500).json({ error: 'Ha ocurrido un error al intentar buscar los últimos turnos cancelados.' });
            })
    },

    async asignar(req, res) {
        const { modulo, categoria } = req.body;
        const consulta = `
            UPDATE turnos 
            SET estado = 'Asignado', modulo = $1, fecha_asignado = CURRENT_TIMESTAMP
            WHERE id = (
                SELECT MIN(id)
                FROM turnos
                WHERE estado = 'Pendiente' AND (categoria = $2 OR  $2 = 'N/A')
            )
            RETURNING id
        `
        pool.query(consulta, [modulo, categoria])
            .then(resultado => {
                if (resultado.rowCount == 0) {
                    return res.status(200).json({ warning: 'No se encontró ningun turno para asignar.' });
                }
                else {
                    const idTurnoAsignado = resultado.rows[0].id;
                    const consulta = `
                        SELECT turnos.id, turnos.codigo, turnos.modulo, turnos.fecha, turnos.estado, turnos.fecha_asignado, usuarios.tipo_documento, usuarios.numero_documento, usuarios.primer_nombre, usuarios.segundo_nombre, usuarios.primer_apellido, usuarios.segundo_apellido 
                        FROM turnos
                        INNER JOIN usuarios ON usuarios.id = turnos.usuario
                        WHERE turnos.id = $1
                    `
                    pool.query(consulta, [idTurnoAsignado])
                        .then(resultado => {
                            if (resultado.rowCount == 0) {
                                return res.status(200).json({ warning: 'No se encontraron los datos del turno asignado.' });
                            }
                            else {
                                const turnoAsignado = cambiarNotacion(resultado.rows[0]);
                                return res.status(200).json(turnoAsignado);
                            }
                        })
                        .catch(error => {
                            return res.status(500).json({ error: 'Ha ocurrido un error al intentar buscar los datos del turno asignado.' });
                        })
                }
            })
            .catch(error => {
                return res.status(500).json({ error: 'Ha ocurrido un error al intentar asignar un turno.' });
            })
    },

    async actualizarEstado(req, res) {
        // Esta función solo aplica para actualizar el turno a "En curso", "Completado" o "Cancelado"
        const { id, modulo, estado } = req.body;
        const consulta = `
            UPDATE turnos 
            SET estado = $1, modulo = $2, fecha_cambio = CURRENT_TIMESTAMP
            WHERE id = $3
            RETURNING id
        `
        pool.query(consulta, [estado, modulo, id])
            .then(resultado => {
                if (resultado.rowCount == 0) {
                    return res.status(200).json({ warning: 'No se encontró el turno a actualizar.' });
                } else {
                    const turnoActualizado = cambiarNotacion(resultado.rows[0]);
                    return res.status(200).json(turnoActualizado);
                }
            })
            .catch(error => {
                return res.status(500).json({ error: 'Ha ocurrido un error al intentar actualizar el estado del turno.' });
            })
    },

    async devolverAPendientes(req, res) {
        const { id } = req.body;
        const consulta = `
            UPDATE turnos 
            SET estado = 'Pendiente', modulo = NULL, fecha_cambio = CURRENT_TIMESTAMP
            WHERE id = $1
            RETURNING id
        `
        pool.query(consulta, [id])
            .then(resultado => {
                if (resultado.rowCount == 0) {
                    return res.status(200).json({ warning: 'No se encontró el turno a devolver a pendientes.' });
                } else {
                    const turnoActualizado = cambiarNotacion(resultado.rows[0]);
                    return res.status(200).json(turnoActualizado);
                }
            })
            .catch(error => {
                return res.status(500).json({ error: 'Ha ocurrido un error al intentar devolver el turno a los turnos pendientes.' });
            })
    }
}