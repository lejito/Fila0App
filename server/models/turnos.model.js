const { DataTypes } = require("sequelize");
const sequelize = require("../db");

module.exports = sequelize.define(
    "Turnos",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            field: "id",
        },
        usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "usuarios",
                field: "id"
            },
            field: "usuario"
        },
        administrador: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "administradores",
                field: "id"
            },
            field: "administrador"
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "fecha"
        },
        categoria: {
            type: DataTypes.STRING(3),
            allowNull: false,
            field: "categoria"
        },
        codigo: {
            type: DataTypes.STRING(6),
            allowNull: false,
            field: "codigo"
        },
        estado: {
            type: DataTypes.ENUM('Pendiente', 'Asignado', 'Completado', 'Cancelado'),
            allowNull: false,
            defaultValue: "Pendiente",
            field: "estado"
        }
    },
    {
        tableName: "turnos", // Nombre de la tabla en la base de datos
        timestamps: false // Para que no se agreguen los campos createdAt y updatedAt
    }
);