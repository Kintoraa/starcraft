"use client"

import {useState} from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx"
import {Timer, PersonStanding } from "lucide-react";

import {useCurrentLocale, useI18n} from "../../locales/clients.js";

export default function StarcraftRaces({races, allUnits}) {
    const [activeTab, setActiveTab] = useState("1")
    return (
        <div className="container mx-auto p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-[#1c2433]">
                    {races && races.map((race) => (
                        <TabsTrigger className={"cursor-pointer"}  value={race.id} >{race.name_en}</TabsTrigger>
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
    )
}

function UnitCard({ unit, raceid }) {
    const local = useCurrentLocale();
    const t = useI18n();
    const {count_gaz, count_crystal, time_production, place, melee_or_ranged_fr, melee_or_ranged_en} = unit;
    const name = local === "fr" ? unit.name_fr : unit.name_en;
    const melee = local === "fr" ? melee_or_ranged_fr : melee_or_ranged_en;

    return (
        <div className={"flex justify-between p-5 mb-5 rounded-lg"}  style={{backgroundImage: `url(/image/background/background.jpeg)`}}>
            <div className={"flex flex-col items-center"}>
                <h1 className={"font-bold text-2xl"} >{t("counter.title")}</h1>
                <div className={"flex items-center flex-col "}>
                    <div className={"flex flex-col items-center gap-4 pt-5"}>
                    <h3>{name}</h3>
                    <p className={"font-bold"}>{melee}</p>
                    </div>
                <img className={"size-36"} src={`/image/sc2/units/${raceid}/${unit.img_url.toLowerCase()}.svg`} alt={name}/>
                <div className={"grid grid-cols-2 gap-4 bg-[#1c2433] rounded-lg"}>
                    <p  className={"flex flex-col items-center"}><img className={"size-10"} src={'/image/sc2/ressource/crystal.svg'} alt={"crystal"}/> {count_crystal}</p>
                    <p  className={"flex flex-col items-center"}><img className={"size-10"} src={'/image/sc2/ressource/gaz.svg'} alt={"gaz"}/>{count_gaz}</p>
                    <p className={"flex flex-col items-center"}>
                        <Timer /> {time_production}</p>
                    <p className={"flex flex-col items-center"}><PersonStanding /> {place}</p>
                </div>
                </div>
            </div>
            <div>
                <h1 className={"font-bold text-2xl"}>Terran Counter</h1>
                {unit && unit.countersAsUnit.map(counter => (
                    counter.race_id === 1 &&
                    <div className={"flex items-center flex-col "}>

                        <div className={"flex flex-col items-center gap-4 pt-5"}>
                            <h3>{local === "fr" ? counter.name_fr : counter.name_en}</h3>
                            <p className={"font-bold"}>{local === "fr" ? counter.melee_or_ranged_fr : counter.melee_or_ranged_en}</p>
                        </div>

                        <img className={"size-36"} src={`/image/sc2/units/${1}/${counter.img_url.toLowerCase()}.svg`}
                             alt={counter.name}/>
                        <div className={"grid grid-cols-2 gap-4 bg-[#1c2433] rounded-lg"}>
                            <p className={"flex flex-col items-center"}><img className={"size-10"}
                                                                             src={'/image/sc2/ressource/crystal.svg'}
                                                                             alt={"crystal"}/> {counter.count_crystal}
                            </p>
                            <p className={"flex flex-col items-center"}><img className={"size-10"}
                                                                             src={'/image/sc2/ressource/gaz.svg'}
                                                                             alt={"gaz"}/>{counter.count_gaz}</p>
                            <p className={"flex flex-col items-center"}>
                                <Timer/> {counter.time_production}</p>
                            <p className={"flex flex-col items-center"}><PersonStanding/> {counter.place}</p>
                        </div>
                    </div>

                ))}
            </div>
            <div >
                <h1 className={"font-bold text-2xl"} >Protoss counter</h1>
                {unit && unit.countersAsUnit.map(counter => (
                    counter.race_id === 2 &&
                    <div className={"flex items-center flex-col "}>
                        <div className={"flex flex-col items-center gap-4 pt-5"}>
                            <h3>{local === "fr" ? counter.name_fr : counter.name_en}</h3>
                            <p className={"font-bold"}>{local === "fr" ? counter.melee_or_ranged_fr : counter.melee_or_ranged_en}</p>
                        </div>
                        <img className={"size-36"} src={`/image/sc2/units/${2}/${counter.img_url.toLowerCase()}.svg`}
                             alt={counter.name}/>
                        <div className={"grid grid-cols-2 gap-4 bg-[#1c2433] rounded-lg"}>
                            <p className={"flex flex-col items-center"}><img className={"size-10"}
                                                                             src={'/image/sc2/ressource/crystal.svg'}
                                                                             alt={"crystal"}/> {counter.count_crystal}
                            </p>
                            <p className={"flex flex-col items-center"}><img className={"size-10"}
                                                                             src={'/image/sc2/ressource/gaz.svg'}
                                                                             alt={"gaz"}/>{counter.count_gaz}</p>
                            <p className={"flex flex-col items-center"}>
                                <Timer/> {counter.time_production}</p>
                            <p className={"flex flex-col items-center"}><PersonStanding/> {counter.place}</p>
                        </div>
                    </div>

                ))}
            </div>
            <div>
                <h1 className={"font-bold text-2xl"} >Zerg counter</h1>
                {unit && unit.countersAsUnit.map(counter => (
                    counter.race_id === 3 &&
                    <div className={"flex items-center flex-col "}>
                        <div className={"flex flex-col items-center gap-4 pt-5"}>
                            <h3>{local === "fr" ? counter.name_fr : counter.name_en}</h3>
                            <p className={"font-bold"}></p>
                        </div>
                        <img className={"size-52"} src={`/image/sc2/units/${3}/${counter.name_fr.toLowerCase()}.svg`}
                             alt={counter.name}/>
                        <div className={"grid grid-cols-2 gap-4"}>
                            <p className={"flex flex-col items-center"}><img className={"size-10"}
                                                                             src={'/image/sc2/ressource/crystal.svg'}
                                                                             alt={"crystal"}/> {counter.count_crystal}
                            </p>
                            <p className={"flex flex-col items-center"}><img className={"size-10"}
                                                                             src={'/image/sc2/ressource/gaz.svg'}
                                                                             alt={"gaz"}/>{counter.count_gaz}</p>
                            <p className={"flex flex-col items-center"}>
                                <Timer/> {counter.time_production}</p>
                            <p className={"flex flex-col items-center"}><PersonStanding/> {counter.place}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

