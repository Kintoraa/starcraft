import {DataTypes, Model} from "sequelize";
import {sequelize} from "../db/client.js";


export default class Unit extends Model {}

Unit.init({},
    {
        sequelize,
        tableName: "unit",
    }
)


