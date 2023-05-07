"use strict"
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: "postgres",
    logging: false,
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;