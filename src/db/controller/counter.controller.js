"use server"



import {Counters} from "@/models/Counter.model.js";

export async function addCounter(unit_id, counter_id) {

    console.log({unit_id, counter_id});
    try {
    await Counters.create({
        id_unit: Number(unit_id),
        id_counter: Number(counter_id)
    })
        return true;
    }catch (err) {
   console.log(err);
   return false;
    }





}


// export async function deleteCounter(unit_id) {
//     await Counters.delete({id: unit_id})
// }