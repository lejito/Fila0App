const { DataTypes } = require("sequelize");
const sequelize = require("../db");

module.exports = sequelize.define(
    "Administradores",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "usuarios",
                key: 'id'
            },
            field: "id"
        },
        clave: {
            type: DataTypes.STRING(32),
            allowNull: false,
            field: "clave"
        }
    },
    {
        tableName: "administradores", // Nombre de la tabla en la base de datos
        timestamps: false // Para que no se agreguen los campos createdAt y updatedAt
    }
);