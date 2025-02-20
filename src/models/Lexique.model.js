import * as dataType from "sequelize";
import {Model} from "sequelize";
import {sequelize} from "@/db/client.js";

export default class Lexique extends Model {
}


Lexique.init({
        name_fr: {
            type: dataType.STRING,
            allowNul: false,
        },
        name_en: {
            type: dataType.STRING,
            allowNul: false,
        },
        description_fr: {
            type: dataType.STRING,
            allowNul: false,
        },
        description_en: {
            type: dataType.STRING,
            allowNul: false,
        }

    },
    {
        sequelize,
        tableName: "lexique",
    }
)