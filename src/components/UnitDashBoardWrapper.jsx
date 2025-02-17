"use client"
import React, {useEffect, useState} from 'react';
import UnitDashBoard from "@/components/unitDashBoard.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useI18n} from "../../locales/clients.js";
import {updateUnit} from "@/db/controller/units.controller.js";
import {toast} from "sonner";
import {z} from "zod";
import {create} from "zustand";

const formSchema = z.object({
    name_en: z.optional(z.string().max(25)),
    name_fr: z.optional(z.string().max(25)),
    description_en: z.optional(z.string().max(80)),
    description_fr: z.optional(z.string().max(80)),
    img_url: z.optional(z.string().max(25)),
    count_crystal: z.optional(z.coerce.number().min(0, "Dans starcraft les valeur sont positif").max(1000)),
    count_gaz: z.optional(z.coerce.number().min(0, "Dans starcraft les valeur sont positif").max(1000)),
    place: z.optional(z.coerce.number().min(0, "dans starcraft les valeur sont postif").max(1000)),
    time_production: z.optional(z.coerce.number().min(0, "dans starcraft les valeur sont positif").max(1000)),
    melee_or_ranged_fr: z.enum(["mêlée", "à distance"]),
    melee_or_ranged_en: z.enum(["melee", "ranged"]),
    target_type_en: z.enum(["both", "ground", "air"]),
    target_type_fr: z.enum(["aérien", "les deux", "terrestre"]),
    hp: z.optional(z.coerce.number().min(0, "HP must be at least 1").max(10000)),
});

export const useSelectedUnit = create((set) => ({
    selectedUnit: null,
    setUnit: (unit) => set(() => ({selectedUnit: unit})),
}));

const UnitDashBoardAdmin = () => {
    return (
        <UnitDashBoard isAdmin={true}>
        </UnitDashBoard>
    );
};


export function UnitForm() {
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
    const selectUnit = useSelectedUnit((state) => state.selectedUnit);


    useEffect(() => {
        if (selectUnit) {
            reset(selectUnit);
        }
    }, [selectUnit, reset]);

    const handleFormSubmit = async (data) => {
        setIsLoading(true);
        const id = selectUnit.id;
        const res = await updateUnit(data, id);
        if (!res) {
            setIsError(true);
            setIsLoading(false);
            return toast.error("Erreur lors de la modification")
        }
        setIsLoading(false);
        document.getElementById("modal_modifier").close()
        return toast.success("Modification effectué");


    };
    if (!selectUnit) {
        return <p className="text-center text-gray-400">Chargement...</p>;
    }

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
                    <option value="à distance">â distance</option>
                </select>
                {errors.melee_or_ranged_fr &&
                    <p className="text-red-400">{errors.melee_or_ranged_fr.message}</p>}
            </div>

            <div>
                <label className="block">Target Type (EN)</label>
                <select {...register("target_type_en")} className={"w-full p-2 rounded bg-gray-700"}>
                    <option value="both">both</option>
                    <option value="air">air</option>
                    <option value="ground">ground</option>
                </select>
                {errors.target_type_en &&
                    <p className="text-red-400">{errors.target_type_en.message}</p>}
            </div>

            <div>
                <label className="block">Target Type (FR)</label>
                <select {...register("target_type_fr")} className={"w-full p-2 rounded bg-gray-700"}>
                    <option value="les deux">Terrestre et aérien</option>
                    <option value="aérien">aérien</option>
                    <option value="terrestre">terrestre</option>
                </select>
                {errors.target_type_fr &&
                    <p className="text-red-400">{errors.target_type_fr.message}</p>}
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


export default UnitDashBoardAdmin;