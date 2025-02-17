"use client"
import {useEffect, useState} from "react";
import Loading from "@/app/[locale]/dashboard/loading.js";
import Error from "@/components/Error.jsx";
import Image from "next/image";
import {getOneUnit} from "@/db/controller/units.controller.js";
import {useCurrentLocale} from "../../locales/clients.js";
import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";


const schema = z.object({
    name_fr: z.string().min(1, "Nom en français requis"),
    name_en: z.string().min(1, "Nom en anglais requis"),
    count_crystal: z.number().min(0, "Coût en cristal requis"),
    count_gaz: z.number().min(0, "Coût en gaz requis"),
    time_production: z.number().min(0, "Temps de production requis"),
    place: z.number().min(0, "Place requise"),
    hp: z.number().min(0, "Points de vie requis"),
    description_fr: z.string().min(1, "Description en français requise"),

});

export default function UnitAdmin({id_unit}) {
    const [isLoading, setIsLoading] = useState(true);
    const [unit, setUnit] = useState(null);
    const local = useCurrentLocale()

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name_fr: "",
            name_en: "",
            count_crystal: 0,
            count_gaz: 0,
            time_production: 0,
            place: 0,
            hp: 0,
            description_fr: "",
        },
    });


    const inputs = [
        {
            title: "Cout en crystal",
            name: "count_crystal",
        },
        {
            title: "Cout en Gaz",
            name: "count_gaz",
        },
        {
            title: "Temps de productions",
            name: "time_production",
        },
        {
            title: "Place",
            name: "place",
        },
        {
            title: "hp",
            name: "hp",
        },
    ]

    useEffect(() => {
        const getUnit = async () => {
            const unit = await getOneUnit(id_unit);
            setUnit(unit);
            setIsLoading(false);
        }
        getUnit()
    }, []);

    useEffect(() => {
        if (unit) {

            reset({
                name_fr: unit.name_fr,
                name_en: unit.name_en,
                count_crystal: unit.count_crystal,
                count_gaz: unit.count_gaz,
                time_production: unit.time_production,
                place: unit.place,
                hp: unit.hp,
                description_fr: unit.description_fr,
            });
        }
    }, [unit, reset]);


    const onSubmit = (e) => {

    }

    console.log(unit)


    if (isLoading) return <Loading/>
    if (!unit) return <Error></Error>

    return (
        <div>
            <h1 className={"font-bold text-center text-4xl"}>{local === "fr" ? unit.name_fr : unit.name_en}</h1>
            <form onSubmit={handleSubmit(onsubmit)}></form>
            <div
                className={"flex items-center justify-center bg-neutral-900 max-w-[800px] my-5 shadow-2xl m-auto rounded-lg"}>
                <div>
                    <Image width={300} height={300} src={`/image/sc2/units/${unit.race_id}/${unit.name_fr}.svg`}
                           alt={unit.name_en}></Image>
                </div>
                <div>
                    <ul>
                        {inputs.map((item, i) => (
                            <li className={"flex gap-2 flex-col"}>{item.title} :
                                <Controller
                                    name={item.name}
                                    control={control}
                                    render={({field}) => <input {...field}
                                                                className={"input input-bordered w-full max-w-xs"}
                                                                type="number"/>}
                                >
                                </Controller>
                                {/*{errors.count_crystal && <span>{errors.count_crystal.message}</span>}*/}
                            </li>
                        ))}

                        <li className={"flex gap-2 flex-col"}>{"mécanique / biologique"} :
                            <Controller
                                name="mecanique"
                                control={control}
                                defaultValue="" // Valeur par défaut si nécessaire
                                render={({field}) => (
                                    <select {...field} className={"select select-bordered w-full max-w-xs"}>
                                        <option value="mecanique">mecanique</option>
                                        <option value="biologique">biologique</option>
                                    </select>
                                )}
                            />

                            {/*{errors.count_crystal && <span>{errors.count_crystal.message}</span>}*/}
                        </li>


                        <li className={"flex gap-2 flex-col"}>Attaque :
                            <Controller
                                name="melee_or_ranged_fr"
                                control={control}
                                defaultValue="" // Valeur par défaut si nécessaire
                                render={({field}) => (
                                    <select {...field} className={"select select-bordered w-full max-w-xs"}>
                                        <option value="distance">Distance</option>
                                        <option value="range">Meléee</option>
                                    </select>
                                )}
                            />

                            {/*{errors.count_crystal && <span>{errors.count_crystal.message}</span>}*/}
                        </li>

                        <li className={"flex gap-2 flex-col"}>Cible :
                            <Controller
                                name="target_type_fr"
                                control={control}
                                defaultValue="" // Valeur par défaut si nécessaire
                                render={({field}) => (
                                    <select {...field} className={"select select-bordered w-full max-w-xs"}>
                                        <option value="air">Aérien</option>
                                        <option value="terrestre">Terrestre</option>
                                        <option value="les deux">Les deux</option>
                                    </select>
                                )}
                            />

                            {/*{errors.count_crystal && <span>{errors.count_crystal.message}</span>}*/}
                        </li>

                    </ul>
                </div>
            </div>
            <div
                className={"flex items-center justify-center bg-neutral-900 max-w-[800px] m-auto shadow-2xl mb-5  rounded-lg"}>
                <p>{unit.description_fr}</p>
            </div>
            <div
                className={"flex items-center justify-center mb-5 bg-neutral-900 max-w-[800px] m-auto shadow-2xl  rounded-lg"}>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Amélioration</th>
                            <th>Description</th>
                            <th>Coût</th>
                            <th>Temps</th>
                            <th>Type</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src=""
                                                alt="SORT"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">Tir de Précision</div>
                                        <div className="text-sm opacity-50">Inflige des dégâts massifs à une unité
                                            biologique
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                Capacité de base du Fantôme
                                <br/>
                                <span className="badge badge-ghost badge-sm">Cible unique</span>
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>Capacité</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src=""
                                                alt="SORT"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">EMP</div>
                                        <div className="text-sm opacity-50">Draine l'énergie et réduit les boucliers
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                Capacité de base du Fantôme
                                <br/>
                                <span className="badge badge-ghost badge-sm">Zone d'effet</span>
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>Capacité</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src=""
                                                alt="SORT"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">Camouflage Personnel</div>
                                        <div className="text-sm opacity-50">Rend le Fantôme invisible</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                Capacité de base du Fantôme
                                <br/>
                                <span className="badge badge-ghost badge-sm">Auto-buff</span>
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>Capacité</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src=""
                                                alt="SORT"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">Vision Psi</div>
                                        <div className="text-sm opacity-50">Détecte les unités invisibles</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                Capacité de base du Fantôme
                                <br/>
                                <span className="badge badge-ghost badge-sm">Zone d'effet</span>
                            </td>
                            <td>-</td>
                            <td>-</td>
                            <td>Capacité</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src=""
                                                alt="SORT"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">Réacteur Psi</div>
                                        <div className="text-sm opacity-50">Augmente l'énergie maximale</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                Recherchée à l'Académie des Fantômes
                                <br/>
                                <span className="badge badge-ghost badge-sm">Amélioration</span>
                            </td>
                            <td>150/150</td>
                            <td>110 secondes</td>
                            <td>Amélioration</td>
                        </tr>
                        <tr>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src=""
                                                alt="SORT"/>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">Portée du Tir de Précision</div>
                                        <div className="text-sm opacity-50">Augmente la portée du Tir de Précision</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                Recherchée à l'Académie des Fantômes
                                <br/>
                                <span className="badge badge-ghost badge-sm">Amélioration</span>
                            </td>
                            <td>100/100</td>
                            <td>79 secondes</td>
                            <td>Amélioration</td>
                        </tr>
                        </tbody>
                    </table>
                </div>


            </div>
            <div
                className={"flex flex-col items-center justify-center bg-neutral-900 max-w-[800px] m-auto shadow-2xl mb-5  rounded-lg"}>
                <h2 className={"font-bold text-xl my-2"}>Fort contre</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Unité</th>
                        <th>Pourquoi ?</th>
                        <th>Condition ?</th>
                    </tr>
                    </thead>
                    <tbody>
                    {unit.countersAsCounter.map((counter, index) => (
                        <tr key={index}>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <Image
                                                fill={true}
                                                src={`/image/sc2/units/${counter.race_id}/${counter.name_fr}.svg`}
                                                alt={`${counter.name_en}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {counter.counters.description}
                                <br/>
                                <span className="badge badge-ghost badge-sm">ZAZADZA</span>
                            </td>

                            <td>
                                {counter.counters.condition}
                                <br/>
                                <span className="badge badge-ghost badge-sm">AZDZA</span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div
                className={"flex flex-col items-center justify-center bg-neutral-900 max-w-[800px] m-auto shadow-2xl mb-5  rounded-lg"}>
                <h2 className={"font-bold text-xl my-2"}>Faible Contre</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Unité</th>
                        <th>Pourquoi ?</th>
                        <th>Condition ?</th>
                    </tr>
                    </thead>
                    <tbody>
                    {unit.countersAsUnit.map((counter, index) => (
                        <tr key={index}>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <Image
                                                fill={true}
                                                src={`/image/sc2/units/${counter.race_id}/${counter.name_fr}.svg`}
                                                alt={`${counter.name_en}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {counter.counters.description}
                                <br/>
                                <span className="badge badge-ghost badge-sm">ZAZADZA</span>
                            </td>

                            <td>
                                {counter.counters.condition}
                                <br/>
                                <span className="badge badge-ghost badge-sm">AZDZA</span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

}