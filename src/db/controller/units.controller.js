"use server";



import {CounterUnit} from "@/models/Counter.model.js";
import {Race, Unit} from "@/models/associations.js";

export async function getAllUnits() {
    try {

        const units = await Unit.findAll({
            order: [['id', 'ASC']]
        });
        return JSON.parse(JSON.stringify(units));
    } catch (error) {
        console.log(error);
    }
}

export async function getAllUnityWithRace() {
    try {
        const races = await Race.findAll({
            include: [
                {
                    association: "units",
                    include: [
                        {
                            association: "countersAsUnit",
                        },
                        {
                            association: "countersAsCounter",
                        }
                    ]
                }
            ]
        });

        return JSON.parse(JSON.stringify(races));
    } catch (error) {
        console.log(error);
    }

}





export async function getCounters() {
    try {

    const units = await Unit.findAll({
        include: [
            {
                model: Unit,
                as: "countersAsUnit"
            },
            {
                model: Unit,
                as: "countersAsCounter"
            }
        ]
    });
        console.log()
    return JSON.parse(JSON.stringify(units));

    }catch(error) {
        console.log(error);
    }

}

export async function updateUnit(unit, unit_id) {
    const {count_crystal, count_gaz, description_fr, description_en, hp, img_url, melee_or_ranged_en , melee_or_ranged_fr, name_en, name_fr, place, target_type_en, target_type_fr, time_production} = unit

    try {
      await Unit.update(
        {
            count_crystal, count_gaz, description_fr, description_en, hp, img_url, melee_or_ranged_en, melee_or_ranged_fr, name_en, name_fr, place, target_type_en, target_type_fr, time_production
        }
    ,
        {
            where: {
                id: unit_id
            }

    })
        return true;
    }catch (error) {
        console.log(error);
        return false;
    }

}
