"use server"

import Ressource from "@/models/Ressource.model.js";
import {verifySession} from "@/app/lib/session.js";
import {redirect} from "next/navigation.js";

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
    const session = await verifySession();
    if (!session.isAuth) return redirect("/login");
    try {
        await Ressource.create(data);
        return true
    } catch (error) {
        console.error("Aucune ressource trouvé ", error);
        throw error;

    }
}

export async function updateRessource(data) {

}

export async function deleteRessource(id) {
    const session = await verifySession();
    if (!session.isAuth) return redirect("/login");

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