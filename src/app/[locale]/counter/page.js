import FormLogin from "@/components/form";
import {verifySession} from "@/app/lib/session.js";
import {redirect} from "next/navigation";
import StarcraftRaces from "@/components/starCraftComponents.jsx";
import {getAllRaces} from "@/db/controller/races.controller.js";
import {getAllUnits, getAllUnityWithRace, getCounters} from "@/db/controller/units.controller.js";


export default async function Page() {
    const allUnits = await getAllUnityWithRace();
    const races = await getAllRaces();
    return (
        <main className={"min-h-screen pt-80 bg-center bg-cover"}
              style={{backgroundImage: `url(/image/background/login.jpg)`}}>
            <h1 className={"font-bold text-center text-4xl"}>Les races et counteur de Starcraft 2</h1>
            <StarcraftRaces races={races} allUnits={allUnits}></StarcraftRaces>
        </main>
    )

}
