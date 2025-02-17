"use client"
import {Suspense, useEffect, useState} from "react";
import {useCurrentLocale, useI18n} from "../../locales/clients.js";
import {getAllUnityWithRace} from "@/db/controller/units.controller.js";
import {getAllRaces} from "@/db/controller/races.controller.js";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import Loading from "@/app/[locale]/dashboard/loading.js";
import Image from "next/image";
import {UnitForm, useSelectedUnit} from "@/components/UnitDashBoardWrapper.jsx";
import {useRouter} from "next/navigation";


export default function UnitDashBoard({isAdmin}) {
    const [activeTab, setActiveTab] = useState("1");
    const [isLoading, setIsLoading] = useState(true);
    const [allUnits, setAllUnits] = useState(null);
    const [races, setRaces] = useState(null);
    const local = useCurrentLocale();
    const t = useI18n();
    const selectUnit = useSelectedUnit((state) => state.selectedUnit);

    useEffect(() => {
        const getAllUnits = async () => {
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
                                        <Unit isAdmin={isAdmin} unit={unit} id_race={race.id}  />
                                    </div>
                                ))}
                        </TabsContent>
                    ))}
            </Tabs>

            {isAdmin && selectUnit && (
                <dialog id="modal_modifier" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box text-center">
                        <h3 className="font-bold text-lg">{t("dashboard.modifier.title")} {local === "fr" ? selectUnit.name_fr : selectUnit.name_en}</h3>
                        <UnitForm  />
                    </div>
                </dialog>
            )}
        </div>
    );
}

function Unit({ unit, id_race, isAdmin }) {
    const t = useI18n();
    const router = useRouter();
    const local = useCurrentLocale();
    const setUnit = useSelectedUnit((state) => state.setUnit);

    const openModal = () => {
        setUnit(unit);
        document.getElementById("modal_modifier").showModal();
    };

    return (
        <div className="flex 1">
            {unit.race_id === id_race && (
                <div className="card bg-base-100 w-52 shadow-sm">
                    <figure className="px-10 pt-10">
                        <Suspense fallback={<Loading />}>
                        <Image
                            onClick={() => router.push(`/units/unit/${unit.id}`)}
                            width={200}
                            height={200}
                            className={"cursor-pointer"}
                            src={`/image/sc2/units/${id_race}/${unit.img_url.toLowerCase()}.svg`}
                            alt={unit.name_en}
                        />
                        </Suspense>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{local === "fr" ? unit.name_fr : unit.name_en}</h2>
                        {isAdmin && (
                        <div className="card-actions">
                            <button className="btn btn-primary" onClick={openModal}>
                                {t("dashboard.modifier.buttonModifier")}
                            </button>
                        </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}



