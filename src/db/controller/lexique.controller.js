"use server"
import Lexique from "@/models/Lexique.model.js";


export async function getAllLexique(idPage) {
    let offset;
    console.log("IDDDD DPAGE", idPage)

    switch (Number(idPage)) {
        case 1:
            offset = 5;
            break;
        default:
            offset = 0;
            break;
    }
    try {
        const data = await Lexique.findAll({offset: offset, limit: 5});
        return JSON.parse(JSON.stringify(data));
    } catch (err) {
        console.log(err);
        throw err;
    }
}

