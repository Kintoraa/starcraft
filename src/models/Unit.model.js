import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/client.js";

export default class Unit extends Model {}

Unit.init(
    {
        name_en: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        name_fr: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        description_en: {
            type: DataTypes.TEXT,
        },
        img_url: {
            type: DataTypes.TEXT,
        },
        description_fr: {
            type: DataTypes.TEXT,
        },
        race_id: {
            type: DataTypes.INTEGER,
        },
        melee_or_ranged_fr: {
            type: DataTypes.STRING
        },
        melee_or_ranged_en: {
            type: DataTypes.STRING,
        },
        count_crystal: {
            type: DataTypes.INTEGER,
        },
        count_gaz: {
            type: DataTypes.INTEGER,
        },
        place: {
            type: DataTypes.INTEGER,
        },
        time_production: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        tableName: "unit",
        timestamps: true,
    }
);
