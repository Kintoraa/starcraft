import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/client.js";


export class Counters extends Model {}

Counters.init(
    {
        id_unit: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        id_counter: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
    },
    {
        sequelize,
        tableName: "counters",
    }
);
