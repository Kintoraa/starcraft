"use client"
import {Suspense, useEffect, useState} from "react";
import {useCurrentLocale, useI18n} from "../../locales/clients.js";
import {useForm} from "react-hook-form";
import {getAllUnityWithRace, updateUnit} from "@/db/controller/units.controller.js";
import {getAllRaces} from "@/db/controller/races.controller.js";
import {toast} from "sonner";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";

import { zodResolver } from "@hookform/resolvers/zod";

import {z} from "zod";
import Loading from "@/app/[locale]/dashboard/loading.js";

export default function UnitDashBoard() {
    const [activeTab, setActiveTab] = useState("1");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [allUnits, setAllUnits] = useState(null);
    const [races, setRaces] = useState(null);
    const local = useCurrentLocale();
    const t = useI18n();

    useEffect(() => {
        const getAllUnits = async () => {
            setIsLoading(true);
            const allUnits = await getAllUnityWithRace();
            const races = await getAllRaces();
            setAllUnits(allUnits);
            setRaces(races);
            setIsLoading(false);
        };
        getAllUnits();
    }, []);

    if(isLoading) {
        return <Loading />;
    }

    return (
        <div className="container mx-auto p-4">

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-[#1c2433] mb-12">
                    {races &&
                        races.map((race) => (
                            <TabsTrigger key={race.id} className="cursor-pointer" value={race.id}>
                                {race.name_en}
                            </TabsTrigger>
                        ))}
                </TabsList>

                {allUnits &&
                    allUnits.map((race) => (
                        <TabsContent
                            className="max-h-[1200px] overflow-scroll relative flex flex-wrap gap-4"
                            key={race.id}
                            value={race.id}
                        >
                            {race.units &&
                                race.units.map((unit) => (
                                    <div key={unit.id}>
                                        <Unit unit={unit} id_race={race.id} setSelectedUnit={setSelectedUnit} />
                                    </div>
                                ))}
                        </TabsContent>
                    ))}
            </Tabs>

            {selectedUnit && (
                <dialog id="modal_modifier" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box text-center">
                        <h3 className="font-bold text-lg">{t("dashboard.modifier.title")} {local === "fr" ? selectedUnit.name_fr : selectedUnit.name_en}</h3>
                        <UnitForm selectedUnit={selectedUnit} />
                    </div>
                </dialog>
            )}
        </div>
    );
}


const formSchema = z.object({
    name_en: z.optional(z.string()),
    name_fr: z.optional(z.string()),
    description_en: z.optional(z.string()),
    description_fr: z.optional(z.string()),
    img_url: z.optional(z.string()),
    count_crystal: z.optional(z.coerce.number().min(0, "Dans starcraft les valeur sont positif")),
    count_gaz: z.optional(z.coerce.number().min(0, "Dans starcraft les valeur sont positif")),
    place: z.optional(z.coerce.number().min(0, "dans starcraft les valeur sont postif")),
    time_production: z.optional(z.coerce.number().min(0, "dans starcraft les valeur sont positif")),
    melee_or_ranged_fr: z.enum(["mêlée", "à distance"]),
    melee_or_ranged_en: z.enum(["melee", "ranged"]),
    target_type_en: z.optional(z.string()),
    target_type_fr: z.optional(z.string()),
    hp: z.optional(z.coerce.number().min(0, "HP must be at least 1")),
});



function UnitForm({ selectedUnit }) {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const t = useI18n();


    useEffect(() => {
        if (selectedUnit) {
            reset(selectedUnit);
        }
    }, [selectedUnit, reset]);

    const handleFormSubmit = async (data) => {
        console.log(data);
        setIsLoading(true);
        const id = selectedUnit.id;
        const res = await updateUnit(data, id);
        console.log("res", res);
        if (!res) {
            setIsError(true);
            setIsLoading(false);
            return toast.error("Erreur lors de la modification")
        }
        setIsLoading(false);
        document.getElementById("modal_modifier").close()
        return toast.success("Modification effectué");


    };

    if(isLoading) {
        return <>
            <p className={"text-green-500"}>{t("dashboard.modifier.loading")}</p>
            <span className="loading loading-bars loading-lg"></span>
        </>
    }
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <p className="py-4">{t("dashboard.modifier.description")}</p>
                    <div>
                        <label className="block">Name (EN)</label>
                        <input {...register("name_en")} className="w-full p-2 rounded bg-gray-700"/>
                        {errors.name_en && <p className="text-red-400">{errors.name_en.message}</p>}
                    </div>

                    <div>
                        <label className="block">Name (FR)</label>
                        <input {...register("name_fr")} className="w-full p-2 rounded bg-gray-700"/>
                        {errors.name_fr && <p className="text-red-400">{errors.name_fr.message}</p>}
                    </div>

                    <div>
                        <label className="block">Description (EN)</label>
                        <input {...register("description_en")} className="w-full p-2 rounded bg-gray-700"/>
                        {errors.description_en && <p className="text-red-400">{errors.description_en.message}</p>}
                    </div>

                    <div>
                        <label className="block">Description (FR)</label>
                        <input {...register("description_fr")} className="w-full p-2 rounded bg-gray-700"/>
                        {errors.description_fr && <p className="text-red-400">{errors.description_fr.message}</p>}
                    </div>

                    <div>
                        <label className="block">Image URL</label>
                        <input {...register("img_url")} className="w-full p-2 rounded bg-gray-700"/>
                        {errors.img_url && <p className="text-red-400">{errors.img_url.message}</p>}
                    </div>

                    <div>
                        <label className="block">Crystal Count</label>
                        <input {...register("count_crystal")} type="number" className="w-full p-2 rounded bg-gray-700"/>
                        {errors.count_crystal && <p className="text-red-400">{errors.count_crystal.message}</p>}
                    </div>

                    <div>
                        <label className="block">Gas Count</label>
                        <input {...register("count_gaz")} type="number" className="w-full p-2 rounded bg-gray-700"/>
                        {errors.count_gaz && <p className="text-red-400">{errors.count_gaz.message}</p>}
                    </div>

                    <div>
                        <label className="block">Place</label>
                        <input {...register("place")} type="number" className="w-full p-2 rounded bg-gray-700"/>
                        {errors.place && <p className="text-red-400">{errors.place.message}</p>}
                    </div>

                    <div>
                        <label className="block">Production Time</label>
                        <input {...register("time_production")} type="number"
                               className="w-full p-2 rounded bg-gray-700"/>
                        {errors.time_production && <p className="text-red-400">{errors.time_production.message}</p>}
                    </div>

                    <div>
                        <label className="block">Melee or Ranged (EN)</label>
                        <select {...register("melee_or_ranged_en")} className={"w-full p-2 rounded bg-gray-700"}>
                            <option value="melee">melee</option>
                            <option value="ranged">ranged</option>
                        </select>
                        {errors.melee_or_ranged_en &&
                            <p className="text-red-400">{errors.melee_or_ranged_en.message}</p>}
                    </div>

                    <div>
                        <label className="block">Melee or Ranged (FR)</label>
                        <select {...register("melee_or_ranged_fr")} className={"w-full p-2 rounded bg-gray-700"}>
                            <option value="mêlée">mêlée</option>
                            <option value="â distance">â distance</option>
                        </select>
                        {errors.melee_or_ranged_fr &&
                            <p className="text-red-400">{errors.melee_or_ranged_fr.message}</p>}
                    </div>

                    <div>
                        <label className="block">Target Type (EN)</label>
                        <input {...register("target_type_en")} className="w-full p-2 rounded bg-gray-700"/>
                        {errors.target_type_en && <p className="text-red-400">{errors.target_type_en.message}</p>}
                    </div>

                    <div>
                        <label className="block">Target Type (FR)</label>
                        <input {...register("target_type_fr")} className="w-full p-2 rounded bg-gray-700"/>
                        {errors.target_type_fr && <p className="text-red-400">{errors.target_type_fr.message}</p>}
                    </div>

                    <div>
                        <label className="block">HP</label>
                        <input {...register("hp")} type="number" className="w-full p-2 rounded bg-gray-700"/>
                        {errors.hp && <p className="text-red-400">{errors.hp.message}</p>}
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded">
                        {t("dashboard.modifier.save")}
                    </button>
                    <button
                        className="btn"
                        type="button"
                        onClick={() => document.getElementById("modal_modifier").close()}
                    >
                        {t("dashboard.modifier.cancel")}
                    </button>
        </form>
    );

}


function Unit({unit, id_race, setSelectedUnit}) {
    const t = useI18n();
    const openModal = () => {
        setSelectedUnit(unit);
        document.getElementById("modal_modifier").showModal();
    };

    return (
        <div className="flex 1">
            {unit.race_id === id_race && (
                <div className="card bg-base-100 w-52 shadow-sm">
                    <figure className="px-10 pt-10">
                        <img
                            width={200}
                            height={200}
                            src={`/image/sc2/units/${id_race}/${unit.img_url.toLowerCase()}.svg`}
                            alt={unit.name}
                        />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{unit.name_en}</h2>
                        <div className="card-actions">
                            <button className="btn btn-primary" onClick={openModal}>
                                {t("dashboard.modifier.buttonModifier")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
