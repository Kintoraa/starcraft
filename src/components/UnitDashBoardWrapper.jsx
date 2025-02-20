"use client"
import React, {useEffect, useState} from 'react';
import UnitDashBoard from "@/components/unitDashBoard.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useI18n} from "../../locales/clients.js";
import {updateUnit} from "@/db/controller/units.controller.js";
import {toast} from "sonner";
import {create} from "zustand";
import {formSchemaUnit} from "@/schema/unit.schema.js";


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
        resolver: zodResolver(formSchemaUnit),
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

    if (isLoading) {
        return <>
            <p className={"text-green-500"}>{t("dashboard.modifier.loading")}</p>
            <span className="loading loading-bars loading-lg"></span>
        </>
    }

    const FORMVALUE =
        [
            {
                nameField: "name_en",
                title: "Name (EN)"
            },
            {
                nameField: "name_fr",
                title: "Name (FR)"
            },
            {
                nameField: "description_en",
                title: "Description (EN)"
            },
            {
                nameField: "description_fr",
                title: "Description (FR)"
            },
            {
                nameField: "img_url",
                title: "Nom de l'image"
            },
            {
                nameField: "count_crystal",
                title: "Count en Crystal",
            },
            {
                nameField: "count_gaz",
                title: "Cout en Gaz",
            },
            {
                nameField: "place",
                title: "Cout en Place",
            },
            {
                nameField: "time_production",
                title: "Temps de production",
            },
            {
                nameField: "hp",
                title: "Point de vie"
            }
        ]


    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <p className="py-4">{t("dashboard.modifier.description")}</p>
            {FORMVALUE.map((item, index) => (
                <div key={index}>
                    <label className="block">{item.title}</label>
                    <input {...register(item.nameField)} className="w-full p-2 rounded bg-gray-700"/>
                    {/*{errors && <p className="text-red-400">{errors.item.nameField.message}</p>}*/}
                </div>
            ))}

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