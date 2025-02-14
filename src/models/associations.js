import Race from "@/models/Race.model.js";
import Unit from "@/models/Unit.model.js";
import {CounterUnit} from "@/models/Counter.model.js";


Race.hasMany(Unit, {
    as: "units",
    foreignKey: "race_id"
})

Unit.belongsTo(Race, {
    as: "race",
    foreignKey: "race_id",
})


Unit.belongsToMany(Unit, {
    through: "counters",
    foreignKey: "id_unit",
    otherKey: "id_counter",
    as: "countersAsUnit"
});

Unit.belongsToMany(Unit, {
    through: "counters",
    foreignKey: "id_counter",
    otherKey: "id_unit",
    as: "countersAsCounter"
});




export {Race, Unit}