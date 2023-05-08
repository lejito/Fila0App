"use strict"
const app = require("./app"); // Cargar el modulo con la configuración de la API
require('dotenv').config();
const port = process.env.PORT || 3000;

// Cargar configuración de la conexión a la base de datos
const pool = require('./db');

// Verificar la conexión a la base de datos antes de iniciar
pool.connect().then(() => {
    console.log('Conexión exitosa a PostgreSQL.');
    app.listen(port, () => {
        console.log(`Servidor ejecutándose correctamente en http://locahost:${port}`);
    });
}).catch((error) => {
    console.log('----------------------------------------------------------------------');
    console.error('Error al conectarse a PostgreSQL:\n', error);
    console.log('----------------------------------------------------------------------');
    process.exit(1);
});