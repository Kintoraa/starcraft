import {DataTypes, Model} from "sequelize";
import {sequelize} from "../db/client.js";


export default class Race extends Model {}

Race.init({
       name_en: {
           type: DataTypes.STRING,
           allowNull: false,
       },
    description_en: {
           type: DataTypes.STRING,
        allowNull: false,
    },
    description_fr: {
           type: DataTypes.STRING,
        allowNull: false,
    },
       name_fr: {
           type: DataTypes.STRING,
           allowNull: false,
       }
    },
    {
        sequelize,
        tableName: "race",
    }
)


