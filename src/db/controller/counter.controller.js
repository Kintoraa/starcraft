"use server"


import {Counters} from "@/models/Counter.model.js";
import {isAuthorized} from "@/app/lib/isAuth.js";

export async function addCounter(unit_id, counter_id) {
    await isAuthorized()

    try {
        await Counters.create({
            id_unit: Number(unit_id),
            id_counter: Number(counter_id)
        })
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }

}


export async function removeCounter(id_unit, id_counter) {
    await isAuthorized()
    try {
        await Counters.destroy({
            where: {
                id_unit: Number(id_unit),
                id_counter: Number(id_counter)
            }
        });
        return true;

    } catch (err) {
        console.error("Erreur lors de la suppression du counter:", err);
        return false;
    }
}

// export async function deleteCounter(unit_id) {
//     await Counters.delete({id: unit_id})
// }