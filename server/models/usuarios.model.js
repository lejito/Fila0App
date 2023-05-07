const { DataTypes } = require("sequelize");
const sequelize = require("../db");

module.exports = sequelize.define(
    "Usuarios",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: "id",
        },
        tipoDocumento: {
            type: DataTypes.ENUM('TI', 'CC', 'CE', 'PP'),
            allowNull: false,
            field: "tipo_documento"
        },
        numeroDocumento: {
            type: DataTypes.STRING(10),
            allowNull: false,
            field: "numero_documento"
        },
        primerNombre: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: "primer_nombre"
        },
        segundoNombre: {
            type: DataTypes.STRING(20),
            allowNull: true,
            field: "segundo_nombre"
        },
        primerApellido: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: "primer_apellido"
        },
        segundoApellido: {
            type: DataTypes.STRING(20),
            allowNull: true,
            field: "segundo_apellido"
        }
    },
    {
        tableName: "usuarios", // Nombre de la tabla en la base de datos
        timestamps: false // Para que no se agreguen los campos createdAt y updatedAt
    }
);