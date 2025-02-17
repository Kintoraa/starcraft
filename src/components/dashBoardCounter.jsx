"use client"

import {Suspense, useEffect, useState} from "react"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx"
import {CircleX, PersonStanding, Timer} from "lucide-react";
import Image from 'next/image'

import {useCurrentLocale, useI18n} from "../../locales/clients.js";
import {useForm} from "react-hook-form";
import {addCounter, removeCounter} from "@/db/controller/counter.controller.js";
import {getAllUnityWithRace} from "@/db/controller/units.controller.js";
import {getAllRaces} from "@/db/controller/races.controller.js";
import {toast} from "sonner";
import {cn} from "@/lib/utils.js";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import Loading from "@/app/[locale]/dashboard/loading.js";
import {useRouter} from "next/navigation";

export default function DashBoardCounter() {
    const [activeTab, setActiveTab] = useState("1")
    const [isResAddCounter, setIsResAddCounter] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);
    const [allUnits, setAllUnits] = useState(null)
    const [races, setRaces] = useState(null)
    const local = useCurrentLocale();
    const {
        register, handleSubmit, watch, formState: {errors},
    } = useForm()
    const t = useI18n();

    useEffect(() => {
        const getAllUnits = async () => {
            const allUnits = await getAllUnityWithRace();
            const races = await getAllRaces();
            setAllUnits(allUnits);
            setRaces(races);
            setIsLoaded(false)
        }
        getAllUnits()
    }, [isResAddCounter])


    const onSubmit = async (data) => {
        const unit = data.unit
        delete data.unit
        for (const [key, value] of Object.entries(data)) {
            if (!value) continue
            const res = await addCounter(unit, value)
            setIsLoading(false)
            if (res) {
                document.querySelector("dialog[open]")?.close();
                toast.success("Vous avez ajouté un nouveau co")
            }
            setIsResAddCounter(res => !res)

        }
    }

    if (isLoaded) return <Loading/>

    return (
        <div className="container mx-auto p-4">
            <select className="select select-bordered w-full max-w-xs absolute right-0 -translate-x-1/2 mt-5">
                <option>Détaillé</option>
                <option>Simplifié</option>
            </select>
            <Suspense fallback={<Loading/>}>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full ">
                    <TabsList className="grid w-full grid-cols-3 bg-[#1c2433] mb-12">
                        {races &&
                            races.map((race) => (
                                <TabsTrigger key={race.id} className="cursor-pointer" value={race.id}>
                                    {race.name_en}
                                </TabsTrigger>
                            ))}
                    </TabsList>
                    {allUnits &&
                        allUnits.map((race, id) => (
                            <TabsContent
                                className="max-h-[1200px] overflow-scroll relative "
                                key={id}
                                value={race.id}
                            >
                                <button
                                    className="btn bg-green-800 m-5 fixed"
                                    onClick={() => document.getElementById("modal_zerg").showModal()}
                                >
                                    {t("dashboard.counter.add")}
                                </button>

                                <dialog id="modal_zerg" className="modal">
                                    <div
                                        className={cn("relative modal-box ", {"flex justify-center": isLoading})}>
                                        {isLoading ? (
                                            <span className={"size-12 loading loading-spinner text-warning"}></span>
                                        ) : (
                                            <>
                                                <p className="py-4">{t("dashboard.title")} {race.name_en}</p>
                                                <div className="modal-action">
                                                    <form
                                                        method="dialog"
                                                        onSubmit={handleSubmit(onSubmit)}
                                                        className="flex flex-col gap-4"
                                                    >
                                                        <select
                                                            {...register("unit", {required: true})}
                                                            className="select select-bordered w-32  max-w-xs absolute left-5"
                                                        >
                                                            {race.units &&
                                                                race.units.map((unit) => (
                                                                    <option key={unit.id} value={unit.id}>
                                                                        {local === "fr" ? unit.name_fr : unit.name_en}
                                                                    </option>
                                                                ))}
                                                        </select>

                                                        {allUnits &&
                                                            allUnits.map((unitRace, index) => (
                                                                <select
                                                                    key={index}
                                                                    {...register(`counters_${unitRace.name_en}`)}
                                                                    className="select select-bordered w-full max-w-xs"
                                                                    defaultValue=""
                                                                >
                                                                    <option value="" disabled>
                                                                        {unitRace.name_en}
                                                                    </option>
                                                                    <option value="">Ne rien ajouter</option>
                                                                    {unitRace.units &&
                                                                        unitRace.units.map((unit) => (
                                                                            <option key={unit.id} value={unit.id}>
                                                                                {local === "fr" ? unit.name_fr : unit.name_en}
                                                                            </option>
                                                                        ))}
                                                                </select>
                                                            ))}

                                                        <button className="btn bg-green-800" type="submit">
                                                            {t("dashboard.confirm")}
                                                        </button>
                                                        <button
                                                            className="btn"
                                                            type="button"
                                                            onClick={() => document.getElementById("modal_zerg").close()}
                                                        >
                                                            {t("navBar.modal.cancel")}
                                                        </button>
                                                    </form>
                                                </div>
                                                {isResAddCounter === false && (
                                                    <p className="font-bold text-center text-red-500">
                                                        {t("dashboard.counter.exist")}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </dialog>
                                {race.units &&
                                    race.units.map((unit) => (
                                        <CardDashBoardUnit
                                            setReload={setIsResAddCounter}
                                            key={unit.id}
                                            unit={unit}
                                            raceid={race.id}
                                            allunits={allUnits}
                                        />
                                    ))}
                            </TabsContent>
                        ))}
                </Tabs>
            </Suspense>
        </div>
    );


}

function CardDashBoardUnit({unit, raceid, allunits, setReload}) {
    const local = useCurrentLocale();
    const t = useI18n();
    const {count_gaz, count_crystal, time_production, place, melee_or_ranged_fr, melee_or_ranged_en, hp} = unit;
    const name = local === "fr" ? unit.name_fr : unit.name_en;
    const router = useRouter();
    const melee = local === "fr" ? melee_or_ranged_fr : melee_or_ranged_en;
    // style={{backgroundImage: `url(/image/background/background.jpeg)`}}


    return (
        <div className={"grid grid-cols-4 p-5 min-h-[600px] mb-5 rounded-lg bg-slate-900 justify-center text-center"}
        >
            <div className={"flex flex-col  items-center h-52 "}>
                <h1 className={"font-bold text-2xl"}>{t("counter.title")}</h1>
                <div className={"flex items-center flex-col "}>
                    <div className={"flex flex-col items-center gap-4 pt-5"}>
                        <h3>{name}</h3>
                        <p className={"font-bold"}>{melee}</p>
                    </div>
                    <p className={"text-green-500"}>{t("dashboard.counter.hp")} : {hp}</p>
                    <Image onClick={() => router.push(`/dashboard/unit/${unit.id}`)} width={200} height={200}
                           src={`/image/sc2/units/${raceid}/${unit.img_url.toLowerCase()}.svg`}
                           className={"cursor-pointer"}
                           alt={unit.name_fr}/>
                    <p>{local === "fr" ? unit.target_type_fr : unit.target_type_en}</p>
                    <div className={"grid grid-cols-2 gap-4 bg-neutral-900 shadow-2xl rounded-lg p-2"}>
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
            <CardUnit setReload={setReload} unit={unit} id_race={1} title={"Terran Counter"} local={local}></CardUnit>
            <CardUnit setReload={setReload} unit={unit} id_race={2} title={"protoss Counter"} local={local}></CardUnit>
            <CardUnit setReload={setReload} unit={unit} id_race={3} title={"Zerg Counter"} local={local}></CardUnit>
        </div>
    )
}

function CardUnit({unit, id_race, title, local, setReload}) {
    const t = useI18n();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (id_unit, id_counter) => {
        setIsLoading(true);
        const res = await removeCounter(id_unit, id_counter);
        if (!res) return toast.error("Erreur lors de la suppresion");
        setIsLoading(false);
        setReload(res => !res)
        toast.success("Vous avez bien supprimé");
    }


    return (
        <div>
            <h1 className={"font-bold text-2xl"}>{title}</h1>
            {unit && unit.countersAsUnit.map(counter => (
                counter.race_id === id_race &&
                <div className={"flex items-center flex-col "}>

                    <div className={"flex flex-col items-center gap-4 pt-5"}>
                        <h3>{local === "fr" ? counter.name_fr : counter.name_en}</h3>
                        <p className={"font-bold"}>{local === "fr" ? counter.melee_or_ranged_fr : counter.melee_or_ranged_en}</p>
                    </div>
                    <p className={"text-green-500"}>{t("dashboard.counter.hp")} : {counter.hp}</p>
                    <div className={"relative"}>
                        <Image width={200} height={200}
                               className={"cursor-pointer"}
                               onClick={() => router.push(`/dashboard/unit/${counter.id}`)}
                               src={`/image/sc2/units/${id_race}/${counter.img_url.toLowerCase()}.svg`}
                               alt={counter.name_en}/>
                        {isLoading &&
                            <AlertDialog open={isLoading}>
                                <AlertDialogContent>
                                    <button disabled className={"btn  bg-red-500 text-white"}>En cours de
                                        suppression <span
                                            className="loading loading-spinner text-error"></span>
                                    </button>
                                </AlertDialogContent>
                            </AlertDialog>
                        }
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <CircleX
                                    className={"text-red-500 cursor-pointer absolute top-0 right-0"}
                                /></AlertDialogTrigger>
                            <AlertDialogContent className={"bg-black"}>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Voulez vous vraiment supprimé cette unité ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogAction className={"bg-red-500 cursor-pointer"}
                                                       onClick={() => handleSubmit(unit.id, counter.id)}>
                                        Supprimer
                                    </AlertDialogAction>
                                    <AlertDialogCancel
                                        className={"cursor-pointer"}>{t("navBar.modal.cancel")}</AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </div>
                    <p>{local === "fr" ? counter.target_type_fr : counter.target_type_en}</p>
                    <div className={"grid grid-cols-2 gap-4 bg-neutral-900  p-2 rounded-lg"}>
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