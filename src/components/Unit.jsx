"use client"
import {useEffect, useState} from "react";
import Loading from "@/app/[locale]/dashboard/loading.js";
import Error from "@/components/Error.jsx";
import Image from "next/image";
import {getOneUnit} from "@/db/controller/units.controller.js";
import {useCurrentLocale} from "../../locales/clients.js";


export default function Unit({id_unit}) {
    const [isLoading, setIsLoading] = useState(true);
    const [unit, setUnit] = useState(null);
    const local = useCurrentLocale()

    useEffect(() => {
        const getUnit = async () => {
            const unit = await getOneUnit(id_unit);
            setUnit(unit);
            setIsLoading(false);
        }
        getUnit()
    }, []);

    console.log(unit)

    if (isLoading) return <Loading/>
    if (!unit) return <Error></Error>

    return (
        <div>
            <h1 className={"font-bold text-center text-4xl"}>{local === "fr" ? unit.name_fr : unit.name_en}</h1>
            <div
                className={"flex items-center justify-center bg-neutral-900 max-w-[800px] my-5 shadow-2xl m-auto rounded-lg"}>
                <div>
                    <Image width={300} height={300} src={`/image/sc2/units/${unit.race_id}/${unit.name_fr}.svg`}
                           alt={unit.name_en}></Image>
                </div>
                <div>
                    <ul>
                        <li>Cout en crystale : {unit.count_crystal}</li>
                        <li>Cout en gaz : {unit.count_gaz}</li>
                        <li>Temps de production : {unit.time_production}</li>
                        <li>Place : {unit.place}</li>
                        <li>Type: Mécanique / biologique</li>
                        <li>Attaque: {unit.melee_or_ranged_fr}</li>
                        <li>Cible: {unit.target_type_fr}</li>
                        <li>Point de vie : {unit.hp}</li>
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