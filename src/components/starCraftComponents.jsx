"use client"

import {useEffect, useState} from "react"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx"
import {PersonStanding, Timer} from "lucide-react";

import {useCurrentLocale, useI18n} from "../../locales/clients.js";
import Image from "next/image";
import {getAllUnityWithRace} from "@/db/controller/units.controller.js";
import {getAllRaces} from "@/db/controller/races.controller.js";
import Loading from "@/app/[locale]/dashboard/loading.js";
import {create} from "zustand";
import {useRouter} from "next/navigation";


export const useSelectTable = create((set) => ({
    isSelectTable: true,
    setSelectTable: (isLogged) => set(() => ({isSelectTable: isLogged})),
}));

export default function StarcraftRaces() {
    const [activeTab, setActiveTab] = useState("1")
    const [isLoading, setIsLoading] = useState(false);
    const [allUnits, setAllUnits] = useState(null);
    const [races, setRaces] = useState(null);
    const setSelectTable = useSelectTable((state) => state.setSelectTable)

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


    const onChangeTabs = (data) => {
        setSelectTable(data.target.checked);
    }

    if (isLoading) return <Loading/>;

    return (
        <>
            <h1 className={"font-bold text-center text-4xl"}>Les races et counteur de Starcraft 2</h1>
            <div className="flex gap-2 justify-end mr-5">
                <p>Simple</p>
                <input type="checkbox" defaultChecked className="toggle" onChange={onChangeTabs}/>
                <p>Détaillé</p>
            </div>
            <div className="container mx-auto p-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-[#1c2433]">
                        {races && races.map((race) => (
                            <TabsTrigger className={"cursor-pointer"} value={race.id}>{race.name_en}</TabsTrigger>
                        ))}
                    </TabsList>
                    {allUnits && allUnits.map((race, id) => (
                        <TabsContent className={"max-h-[1200px] overflow-scroll"} key={id} value={race.id}>
                            {race.units && race.units.map(unit => (
                                <UnitCard
                                    unit={unit}
                                    raceid={race.id}
                                />
                            ))}
                        </TabsContent>

                    ))}
                </Tabs>
            </div>
        </>
    )
}

function UnitCard({unit, raceid}) {
    const local = useCurrentLocale();
    const t = useI18n();
    const {count_gaz, count_crystal, time_production, place, melee_or_ranged_fr, melee_or_ranged_en} = unit;
    const name = local === "fr" ? unit.name_fr : unit.name_en;
    const melee = local === "fr" ? melee_or_ranged_fr : melee_or_ranged_en;
    const isSelectTable = useSelectTable((state) => state.isSelectTable);
    const router = useRouter();

    // style={{backgroundImage: `url(/image/background/background.jpeg)`}}
    return (

        <div className={"grid grid-cols-4 min-h-[600px]  p-5 mb-5 rounded-lg bg-slate-900 justify-center text-center"}>
            {isSelectTable ? (

                    <div className={"flex flex-col items-center h-52"}>
                        <h1 className={"font-bold text-2xl"}>{t("counter.title")}</h1>
                        <div className={"flex items-center flex-col "}>
                            <div className={"flex flex-col items-center gap-4 pt-5"}>
                                <h3>{name}</h3>
                                <p className={"font-bold"}>{melee}</p>
                            </div>
                            <Image onClick={() => router.push("/")} width={200} height={200}
                                   src={`/image/sc2/units/${raceid}/${unit.img_url.toLowerCase()}.svg`} alt={name}/>
                            <div className={"grid grid-cols-2 gap-4 bg-neutral-900  rounded-lg"}>
                                <p className={"flex flex-col items-center"}><Image width={50} height={50}
                                                                                   src={'/image/sc2/ressource/crystal.svg'}
                                                                                   alt={"crystal"}/> {count_crystal}</p>
                                <p className={"flex flex-col items-center"}><Image width={50} height={50}
                                                                                   src={'/image/sc2/ressource/gaz.svg'}
                                                                                   alt={"gaz"}/>{count_gaz}</p>
                                <p className={"flex flex-col items-center"}>
                                    <Timer/> {time_production}</p>
                                <p className={"flex flex-col items-center"}><PersonStanding/> {place}</p>
                            </div>
                        </div>
                    </div>
                ) :
                (
                    <div className={"flex flex-col items-center h-52"}>
                        <h1 className={"font-bold text-lg"}>{t("counter.title")}</h1>
                        <div className={"flex items-center flex-col "}>
                            <div className={"flex flex-col items-center gap-4 pt-5"}>
                                <h3>{name}</h3>
                            </div>
                            <Image width={100} height={10}
                                   src={`/image/sc2/units/${raceid}/${unit.img_url.toLowerCase()}.svg`} alt={name}/>
                        </div>
                    </div>
                )}
            <ColUnit unit={unit}></ColUnit>
        </div>
    )
}

function ColUnit({unit}) {
    const local = useCurrentLocale();
    const isSelectTable = useSelectTable((state) => state.isSelectTable);
    const t = useI18n();

    return (
        <>
            {isSelectTable ? (
                <>
                    <ColDetail unit={unit} id_race={1} title={"Terran"}/>
                    <ColDetail unit={unit} id_race={2} title={"Protoss"}/>
                    <ColDetail unit={unit} id_race={3} title={"Zerg"}/>
                </>
            ) : (
                <>
                    <ColSimple unit={unit} id_race={1} title={"Terran"}/>
                    <ColSimple unit={unit} id_race={2} title={"Protoss"}/>
                    <ColSimple unit={unit} id_race={3} title={"Zerg"}/>
                </>
            )}
        </>
    );
}

function ColDetail({unit, id_race, title, local}) {

    const t = useI18n();
    return (
        <div>
            <h1 className={"font-bold text-lg"}>{title}</h1>
            {unit && unit.countersAsUnit.map(counter => (
                counter.race_id === id_race &&
                <div className={"flex items-center flex-col  "} key={counter.id}>
                    <div className={"flex flex-col items-center gap-2 pt-5"}>
                        <h3>{local === "fr" ? counter.name_fr : counter.name_en}</h3>
                        <p className={"font-bold"}>{local === "fr" ? counter.melee_or_ranged_fr : counter.melee_or_ranged_en}</p>
                    </div>
                    <Image width={200} height={200}
                           src={`/image/sc2/units/${id_race}/${counter.name_fr.toLowerCase()}.svg`}
                           alt={counter.name_en}/>
                    <div className={"grid grid-cols-2 bg-neutral-900 rounded-lg gap-4"}>
                        <p className={"flex flex-col items-center"}><Image width={50} height={50}
                                                                           src={'/image/sc2/ressource/crystal.svg'}
                                                                           alt={"crystal"}/> {counter.count_crystal}
                        </p>
                        <p className={"flex flex-col items-center"}><Image width={50} height={50}
                                                                           src={'/image/sc2/ressource/gaz.svg'}
                                                                           alt={"gaz"}/>{counter.count_gaz}</p>
                        <p className={"flex flex-col items-center"}>
                            <Timer/> {counter.time_production}</p>
                        <p className={"flex flex-col items-center"}><PersonStanding/> {counter.place}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

function ColSimple({unit, id_race, title, local}) {
    const t = useI18n();
    return (
        <div>
            <h1 className={"font-bold text-lg"}>{title}</h1>
            {unit && unit.countersAsUnit.map(counter => (
                counter.race_id === id_race &&
                <div className={"flex items-center flex-col  "} key={counter.id}>
                    <div className={"flex flex-col items-center gap-4 pt-5"}>
                        <h3>{local === "fr" ? counter.name_fr : counter.name_en}</h3>
                    </div>
                    <Image width={100} height={100}
                           src={`/image/sc2/units/${id_race}/${counter.name_fr.toLowerCase()}.svg`}
                           alt={counter.name_en}/>
                </div>
            ))}
        </div>
    )
}

