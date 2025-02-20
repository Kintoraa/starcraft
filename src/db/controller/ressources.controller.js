"use server"

import Ressource from "@/models/Ressource.model.js";
import {ressourceSchema} from "@/schema/ressource.schema.js";
import {isAuthorized} from "@/app/lib/isAuth.js";

export async function getAllRessources() {
    try {
        const ressources = await Ressource.findAll();
        return JSON.parse(JSON.stringify(ressources));
    } catch (error) {
        console.error("Aucune ressource trouvé ", error);
        throw error;
    }
}

export async function createRessource(data) {

    await isAuthorized()
    try {
        await Ressource.create(data);
        return true
    } catch (error) {
        console.error("Aucune ressource trouvé ", error);
        throw error;

    }
}

export async function updateRessource(data, id) {
    await isAuthorized();
    const zodTesting = await ressourceSchema.parseAsync(data)
    if (!zodTesting) return false;
    const {
        title,
        description,
        url,
        tag,
        section,
    } = zodTesting;

    try {
        await Ressource.update(
            {
                title,
                description,
                url,
                tag,
                section,
            },
            {
                where: {
                    id: id
                },
            })
        return true;
    } catch (error) {
        return false;
    }


}

export async function deleteRessource(id) {
    await isAuthorized()

    try {
        const res = await Ressource.destroy({
            where: {
                id: id
            }
        })
        return !!res;

    } catch (error) {
        console.error("Aucune ressource trouvé ", error);
        throw error;
    }
}